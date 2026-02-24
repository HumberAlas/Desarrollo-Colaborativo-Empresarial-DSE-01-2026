(function () {
  function qs(id) {
    return document.getElementById(id);
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
    ["name", "category", "price", "stock", "imageUrl"].forEach((f) => setFieldError(f, ""));
  }

  function getFormRaw() {
    return {
      name: qs("name")?.value ?? "",
      category: qs("category")?.value ?? "",
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

    if (!window.validateProductInput) {
      console.error("validateProductInput no está disponible.");
      return;
    }

    const result = window.validateProductInput(raw);

    if (!result.ok) {
      // pintar errores por campo
      setFieldError("name", result.errors.name);
      setFieldError("category", result.errors.category);
      setFieldError("price", result.errors.price);
      setFieldError("stock", result.errors.stock);
      setFieldError("imageUrl", result.errors.imageUrl);

      if (window.showToast) window.showToast("Revisa los campos marcados.", "warning");
      return;
    }

    // Insertar en array global
    window.products = window.products || [];
    window.products.unshift(result.product);

    if (window.renderProducts) window.renderProducts(window.products);

    resetForm();

    if (window.showToast) window.showToast("Producto agregado correctamente ✅", "success");
  };
})();