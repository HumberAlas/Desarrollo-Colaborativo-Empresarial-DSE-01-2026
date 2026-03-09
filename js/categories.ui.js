// js/categories.ui.js
(function () {
  function qs(id) { return document.getElementById(id); }

  // Normaliza texto (mayúsculas/tildes) para comparar
  function norm(s) {
    return String(s ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Devuelve categorías como strings (aunque vengan como objetos)
  function getCategoryNames() {
    const arr = window.categories || [];
    return arr.map(c => (typeof c === "string" ? c : c?.name)).filter(Boolean);
  }

  // Llena un <select> por id
  window.fillCategorySelect = function fillCategorySelect(selectId, selected = "") {
    const sel = qs(selectId);
    if (!sel) return;

    const cats = getCategoryNames();
    sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");

    // Selección
    if (selected && cats.includes(selected)) sel.value = selected;
    else if (cats.length) sel.value = cats[0];
  };

  function openCreateCategoryModal() {
    const el = qs("createCategoryModal");
    if (!el) return;

    // limpiar input/errores
    const input = qs("newCategoryName");
    const help = qs("newCategoryHelp");
    input && (input.value = "");
    input && input.classList.remove("is-invalid");
    help && (help.textContent = "");

    const modal = bootstrap.Modal.getOrCreateInstance(el);
    modal.show();
  }

  function handleCreateCategory(e) {
    e.preventDefault();

    const input = qs("newCategoryName");
    const help = qs("newCategoryHelp");
    if (!input) return;

    const name = String(input.value ?? "").trim();
    const nameKey = norm(name);

    // validación básica
    if (!name) {
      input.classList.add("is-invalid");
      help && (help.textContent = "Escribe un nombre de categoría.");
      return;
    }

    const cats = getCategoryNames();
    const exists = cats.some(c => norm(c) === nameKey);

    if (exists) {
      input.classList.add("is-invalid");
      help && (help.textContent = "Esa categoría ya existe.");
      window.showToast?.("La categoría ya existe ⚠️", "warning");
      return;
    }

    // guardar en entidad categorías (string o objeto)
    window.categories = window.categories || [];
    if (window.categories.length && typeof window.categories[0] === "object") {
      window.categories.push({ id: crypto.randomUUID(), name });
    } else {
      window.categories.push(name);
    }

    // refrescar selects
    window.fillCategorySelect("category", name);
    window.fillCategorySelect("editCategory");

    // cerrar modal
    const modalEl = qs("createCategoryModal");
    bootstrap.Modal.getInstance(modalEl)?.hide();

    window.showToast?.("Categoría creada ✅", "success");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // 1) llenar selects al cargar
    window.fillCategorySelect("category");
    window.fillCategorySelect("editCategory");

    // 2) botón + abre modal de categoría
    qs("addCategoryBtn")?.addEventListener("click", openCreateCategoryModal);

    // 3) submit del modal de categoría
    qs("createCategoryForm")?.addEventListener("submit", handleCreateCategory);

    // 4) IMPORTANTÍSIMO: refrescar categorías cada vez que se abre el modal de “Nuevo producto”
    qs("createProductModal")?.addEventListener("show.bs.modal", () => {
      window.fillCategorySelect("category");
    });
  });
})();