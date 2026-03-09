(function () {

  function qs(id) {
    return document.getElementById(id);
  }

  function norm(s) {
    return String(s ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function setFieldError(fieldId, msg) {
    const input = qs(fieldId);
    const help = qs(fieldId + "Help");
    if (!input || !help) return;

    if (msg) {
      input.classList.add("is-invalid");
      help.textContent = msg;
    } else {
      input.classList.remove("is-invalid");
      help.textContent = "";
    }
  }

  function clearAllErrors() {
    [
      "name",
      "category",
      "price",
      "stock",
      "imageUrl",
      "status",
      "description"
    ].forEach((f) => setFieldError(f, ""));
  }

  function getFormRaw() {
    return {
      name: qs("name")?.value ?? "",
      category: qs("category")?.value ?? "",
      status: qs("status")?.value || "active",
      description: qs("description")?.value ?? "",
      price: qs("price")?.value ?? "",
      stock: qs("stock")?.value ?? "",
      imageUrl: qs("imageUrl")?.value ?? "",
    };
  }

  function resetForm() {
    qs("productForm")?.reset();
    clearAllErrors();
  }

  // Agregar producto al array global y re-renderiza
  window.addProductFromForm = function addProductFromForm(event) {
    event.preventDefault();
    clearAllErrors();

    const raw = getFormRaw();

    // ✅ Validación: nombre único (no permitir duplicados)
    const nameKey = String(raw.name ?? "").trim().toLowerCase();
    const exists = (window.products || []).some(p =>
      String(p.name ?? "").trim().toLowerCase() === nameKey
    );

    if (exists) {
      setFieldError("name", "Ya existe un producto con ese nombre.");
      if (window.showToast) window.showToast("Ese producto ya existe ⚠️", "warning");
      return;
    }

    if (!window.validateProductInput) {
      console.error("validateProductInput no está disponible.");
      return;
    }

    const result = window.validateProductInput(raw);

    if (!result.ok) {
      setFieldError("name", result.errors.name);
      setFieldError("category", result.errors.category);
      setFieldError("price", result.errors.price);
      setFieldError("stock", result.errors.stock);
      setFieldError("imageUrl", result.errors.imageUrl);
      setFieldError("status", result.errors.status);
      setFieldError("description", result.errors.description);

      if (window.showToast)
        window.showToast("Revisa los campos marcados.", "warning");
      return;
    }

    window.products = window.products || [];

    // 👇 Aseguramos que el producto tenga status y description
    const newProduct = {
      id: crypto.randomUUID(), // genera id único
      ...result.product,
      status: raw.status || "active",
      description: raw.description || "",
    };

    window.products.unshift(newProduct);

    const term = qs("searchInput")?.value ?? "";
    if (window.renderProducts)
      window.renderProducts(window.products, term);
    const createModalEl = document.getElementById("createProductModal");
    if (createModalEl) bootstrap.Modal.getInstance(createModalEl)?.hide();
    resetForm();

    if (window.showToast)
      window.showToast("Producto agregado correctamente ✅", "success");
  };

})();