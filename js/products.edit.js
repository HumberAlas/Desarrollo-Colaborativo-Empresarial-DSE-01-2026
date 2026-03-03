// js/products.edit.js (Sprint 2)

(function () {
  let editModal;


  function qs(id) { return document.getElementById(id); }


  function setError(id, msg) {
    const input = qs(id);
    const help = qs(id + "Help");
    if (!input || !help) return;
    if (msg) {
      input.classList.add("is-invalid");
      help.textContent = msg;
    } else {
      input.classList.remove("is-invalid");
      help.textContent = "";
    }
  }


  function clearEditErrors() {
    [
      "editName",
      "editCategory",
      "editPrice",
      "editStock",
      "editImageUrl",
      "editStatus",
      "editDescription",
    ].forEach((f) => setError(f, ""));
  }


  function getProductById(id) {
    return (window.products || []).find((p) => p.id === id) || null;
  }


  function updateProductInArray(updated) {
    const idx = (window.products || []).findIndex((p) => p.id === updated.id);
    if (idx >= 0) window.products[idx] = { ...window.products[idx], ...updated };
  }


  function currentSearchTerm() {
    return qs("searchInput")?.value ?? "";
  }


  function rerender() {
    if (window.renderProducts) window.renderProducts(window.products || [], currentSearchTerm());
  }


  function openEditModal(id) {
    const p = getProductById(id);
    if (!p) return;


    // Cargar categorías en el select del modal
    if (window.fillCategorySelect) window.fillCategorySelect("editCategory", p.category);


    // Cargar datos al formulario del modal
    qs("editId").value = p.id;
    qs("editName").value = p.name ?? "";
    qs("editPrice").value = p.price ?? "";
    qs("editStock").value = p.stock ?? "";
    qs("editImageUrl").value = p.imageUrl ?? "";


    // Nuevos campos
    if (qs("editStatus")) qs("editStatus").value = p.status ?? "active";
    if (qs("editDescription")) qs("editDescription").value = p.description ?? "";


    clearEditErrors();
    editModal.show();
  }


  function handleSaveEdit(e) {
    e.preventDefault();
    clearEditErrors();


    const raw = {
      id: qs("editId").value,
      name: qs("editName").value,
      category: qs("editCategory").value,
      price: qs("editPrice").value,
      stock: qs("editStock").value,
      imageUrl: qs("editImageUrl").value,
      status: qs("editStatus")?.value ?? "active",
      description: qs("editDescription")?.value ?? "",
    };

    // Reusar el validador
    const result = window.validateProductInput({
      name: raw.name,
      category: raw.category,
      price: raw.price,
      stock: raw.stock,
      imageUrl: raw.imageUrl,
      status: raw.status,
      description: raw.description,
    });

    // result.ok seguirá dependiendo de los campos base.
    if (!result.ok) {
      setError("editName", result.errors?.name);
      setError("editCategory", result.errors?.category);
      setError("editPrice", result.errors?.price);
      setError("editStock", result.errors?.stock);
      setError("editImageUrl", result.errors?.imageUrl);
      setError("editStatus", result.errors?.status);
      setError("editDescription", result.errors?.description);


      if (window.showToast) window.showToast("Revisa los campos.", "warning");
      return;
    }


    const updated = {
      ...result.product,
      id: raw.id,                 // mantener el id original
      status: raw.status,         // asegurar los nuevos campos
      description: raw.description,
    };


    updateProductInArray(updated);
    rerender();


    editModal.hide();
    if (window.showToast) window.showToast("Producto actualizado ✅", "success");
  }


  function handleDeleteProduct() {
    const id = qs("editId").value;
    if (!id) return;


    // SweetAlert2 (si está disponible). Si no, fallback a confirm.
    const confirmDelete = () => {
      window.products = (window.products || []).filter((p) => p.id !== id);
      rerender();
      editModal.hide();
      if (window.showToast) window.showToast("Producto eliminado 🗑️", "danger");
    };


    if (window.Swal) {
      Swal.fire({
        title: "Eliminar producto",
        text: "¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((res) => {
        if (res.isConfirmed) confirmDelete();
      });
    } else {
      if (confirm("¿Seguro que deseas eliminar este producto?")) confirmDelete();
    }
  }

  function bindEditButtons() {
    const grid = qs("productGrid");
    if (!grid) return;


    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".js-edit");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      openEditModal(id);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    editModal = new bootstrap.Modal(qs("editProductModal"));


    qs("editProductForm")?.addEventListener("submit", handleSaveEdit);
    qs("deleteProductBtn")?.addEventListener("click", handleDeleteProduct);


    bindEditButtons();
  });
})();