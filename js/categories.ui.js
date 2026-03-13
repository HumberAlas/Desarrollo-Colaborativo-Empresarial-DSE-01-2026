(function () {
  let createCategoryModal;
  let manageCategoriesModal;

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

  function getCategoryNames() {
    const arr = window.categories || [];
    return arr
      .map((c) => (typeof c === "string" ? c : c?.name))
      .filter(Boolean);
  }

  function startEditCategory(index) {
    const cat = getCategoryByIndex(index);
    if (!cat) return;

    if (norm(cat) === norm("Sin categoría")) {
      Swal.fire({
        icon: "warning",
        title: "Acción no permitida",
        text: 'La categoría "Sin categoría" no se puede editar.',
      });
      return;
    }

    qs("manageCategoryName").value = cat;
    qs("editingCategoryIndex").value = index;
    qs("saveCategoryBtn").textContent = "Actualizar";
    qs("manageCategoryName").focus();
  }

  function ensureDefaultCategory() {
    window.categories = window.categories || [];
    const cats = getCategoryNames();
    const hasDefault = cats.some((c) => norm(c) === norm("Sin categoría"));

    if (!hasDefault) {
      if (window.categories.length && typeof window.categories[0] === "object") {
        window.categories.push({
          id: crypto.randomUUID(),
          name: "Sin categoría",
        });
      } else {
        window.categories.push("Sin categoría");
      }
    }
  }

  window.fillCategorySelect = function fillCategorySelect(selectId, selectedValue = "") {
    ensureDefaultCategory();

    const sel = qs(selectId);
    if (!sel) return;

    const cats = getCategoryNames();

    sel.innerHTML = cats
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");

    if (selectedValue && cats.includes(selectedValue)) {
      sel.value = selectedValue;
    } else if (cats.includes("Sin categoría")) {
      sel.value = "Sin categoría";
    } else if (cats.length) {
      sel.value = cats[0];
    }
  };

  function refreshCategorySelects(selectedCreate = "", selectedEdit = "") {
    window.fillCategorySelect("category", selectedCreate);
    window.fillCategorySelect("editCategory", selectedEdit);
  }

  function rerenderProductsIfPossible() {
    const term = qs("searchInput")?.value ?? "";
    if (window.renderProducts) {
      window.renderProducts(window.products || [], term);
    }
  }

  function resetManageCategoryForm() {
  const input = qs("manageCategoryName");
  const hidden = qs("editingCategoryIndex");
  const saveBtn = qs("saveCategoryBtn");

  if (input) input.value = "";
  if (hidden) hidden.value = "";
  if (saveBtn) saveBtn.textContent = "Guardar";
}

  function resetCreateCategoryForm() {
    const input = qs("newCategoryName");
    const help = qs("newCategoryHelp");

    if (input) {
      input.value = "";
      input.classList.remove("is-invalid");
    }
    if (help) help.textContent = "";
  }

  function setCreateCategoryError(msg) {
    const input = qs("newCategoryName");
    const help = qs("newCategoryHelp");
    if (!input || !help) return;

    if (msg) {
      input.classList.add("is-invalid");
      help.textContent = msg;
    } else {
      input.classList.remove("is-invalid");
      help.textContent = "";
    }
  }

  function renderCategoriesTable() {
    ensureDefaultCategory();

    const tbody = qs("categoriesTableBody");
    if (!tbody) return;

    const cats = getCategoryNames();

    tbody.innerHTML = cats
      .map((cat, index) => {
        const isDefault = norm(cat) === norm("Sin categoría");

        return `
          <tr>
            <td>${index + 1}</td>
            <td>${cat}</td>
            <td class="text-end">
              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary js-edit-category"
                  data-index="${index}">
                  Editar
                </button>

                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger js-delete-category"
                  data-index="${index}"
                  ${isDefault ? "disabled" : ""}>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function getCategoryByIndex(index) {
    const cats = getCategoryNames();
    return cats[index] ?? null;
  }

  function categoryExists(name, ignoreIndex = -1) {
    const nameKey = norm(name);
    return getCategoryNames().some((cat, idx) => idx !== ignoreIndex && norm(cat) === nameKey);
  }

  function createCategory(name) {
    window.categories = window.categories || [];

    if (window.categories.length && typeof window.categories[0] === "object") {
      window.categories.push({
        id: crypto.randomUUID(),
        name,
      });
    } else {
      window.categories.push(name);
    }
  }

  function updateCategoryAt(index, newName) {
    if (!window.categories || index < 0 || index >= window.categories.length) return;

    const oldName =
      typeof window.categories[index] === "string"
        ? window.categories[index]
        : window.categories[index].name;

    if (typeof window.categories[index] === "string") {
      window.categories[index] = newName;
    } else {
      window.categories[index].name = newName;
    }

    // actualizar productos que tenían esa categoría
    window.products = (window.products || []).map((p) => {
      if (norm(p.category) === norm(oldName)) {
        return { ...p, category: newName };
      }
      return p;
    });
  }

  function deleteCategoryAt(index) {
    if (!window.categories || index < 0 || index >= window.categories.length) return;

    const catName =
      typeof window.categories[index] === "string"
        ? window.categories[index]
        : window.categories[index].name;

    // proteger categoría por defecto
    if (norm(catName) === norm("Sin categoría")) return;

    // eliminar categoría
    window.categories.splice(index, 1);

    // mover productos a "Sin categoría"
    window.products = (window.products || []).map((p) => {
      if (norm(p.category) === norm(catName)) {
        return { ...p, category: "Sin categoría" };
      }
      return p;
    });

    ensureDefaultCategory();
  }

  function openCreateCategoryModal() {
    resetCreateCategoryForm();
    createCategoryModal?.show();
  }

  function openManageCategoriesModal() {
    resetManageCategoryForm();
    renderCategoriesTable();
    manageCategoriesModal?.show();
  }

  function handleCreateCategory(e) {
    e.preventDefault();

    const name = String(qs("newCategoryName")?.value ?? "").trim();

    if (!name) {
      setCreateCategoryError("La categoría es obligatoria.");
      return;
    }

    if (categoryExists(name)) {
      setCreateCategoryError("Esa categoría ya existe.");
      window.showToast?.("La categoría ya existe ⚠️", "warning");
      return;
    }

    createCategory(name);
    refreshCategorySelects(name, "");
    if (window.fillCategoryFilter) window.fillCategoryFilter();
    renderCategoriesTable();
    rerenderProductsIfPossible();

    createCategoryModal?.hide();
    resetCreateCategoryForm();

    window.showToast?.("Categoría creada ✅", "success");
  }

  function handleManageCategorySubmit(e) {
    e.preventDefault();

    const input = qs("manageCategoryName");
    const hidden = qs("editingCategoryIndex");

    if (!input || !hidden) return;

    const name = String(input.value ?? "").trim();
    const editingIndex = hidden.value === "" ? null : Number(hidden.value);

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Debes escribir un nombre de categoría.",
      });
      return;
    }

    if (editingIndex === null) {
      // crear desde administrar
      if (categoryExists(name)) {
        Swal.fire({
          icon: "info",
          title: "Categoría duplicada",
          text: "Esa categoría ya existe.",
        });
        return;
      }

      createCategory(name);
      input.value = "";
      refreshCategorySelects(name, "");
      renderCategoriesTable();
      rerenderProductsIfPossible();

      window.showToast?.("Categoría creada ✅", "success");
      return;
    }

    // editar categoría
    const oldName = getCategoryByIndex(editingIndex);
    if (!oldName) return;

    if (categoryExists(name, editingIndex)) {
      Swal.fire({
        icon: "info",
        title: "Categoría duplicada",
        text: "Ya existe otra categoría con ese nombre.",
      });
      return;
    }

    updateCategoryAt(editingIndex, name);

    input.value = "";
    hidden.value = "";
    qs("saveCategoryBtn").textContent = "Guardar";

    refreshCategorySelects("", "");
    renderCategoriesTable();
    rerenderProductsIfPossible();

    window.showToast?.("Categoría actualizada ✅", "success");
  }

  function confirmDeleteCategory(index) {
    const cat = getCategoryByIndex(index);
    if (!cat) return;

    if (norm(cat) === norm("Sin categoría")) {
      Swal.fire({
        icon: "warning",
        title: "Acción no permitida",
        text: 'La categoría "Sin categoría" no se puede eliminar.',
      });
      return;
    }

    Swal.fire({
      title: "Eliminar categoría",
      text: `¿Seguro que deseas eliminar la categoría "${cat}"? Los productos pasarán a "Sin categoría".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (!result.isConfirmed) return;

      deleteCategoryAt(index);
      refreshCategorySelects("", "");
      renderCategoriesTable();
      rerenderProductsIfPossible();

      window.showToast?.("Categoría eliminada 🗑️", "danger");
    });
  }

  function bindCategoryTableActions() {
    const tbody = qs("categoriesTableBody");
    if (!tbody) return;

    tbody.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".js-edit-category");
      if (editBtn) {
        const index = Number(editBtn.getAttribute("data-index"));
        startEditCategory(index);
        return;
      }

      const deleteBtn = e.target.closest(".js-delete-category");
      if (deleteBtn) {
        const index = Number(deleteBtn.getAttribute("data-index"));
        confirmDeleteCategory(index);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDefaultCategory();

    createCategoryModal = bootstrap.Modal.getOrCreateInstance(qs("createCategoryModal"));
    manageCategoriesModal = bootstrap.Modal.getOrCreateInstance(qs("manageCategoriesModal"));

    refreshCategorySelects("", "");
    renderCategoriesTable();

    // botón + dentro del modal de producto
    qs("addCategoryBtn")?.addEventListener("click", openCreateCategoryModal);

    // submit modal crear categoría
    qs("createCategoryForm")?.addEventListener("submit", handleCreateCategory);

    // abrir modal administrar categorías
    qs("manageCategoriesModal")?.addEventListener("show.bs.modal", () => {
    resetManageCategoryForm();
    renderCategoriesTable();
    });

    qs("manageCategoriesModal")?.addEventListener("hidden.bs.modal", () => {
    resetManageCategoryForm();
    renderCategoriesTable();
    });

    // submit formulario administrar categorías
    qs("manageCategoryForm")?.addEventListener("submit", handleManageCategorySubmit);

    // tabla acciones
    bindCategoryTableActions();

    // si se abre el modal de producto, refresca categorías
    qs("createProductModal")?.addEventListener("show.bs.modal", () => {
      refreshCategorySelects("", "");
    });

    qs("editProductModal")?.addEventListener("show.bs.modal", () => {
      refreshCategorySelects("", qs("editCategory")?.value ?? "");
    });
  });
})();