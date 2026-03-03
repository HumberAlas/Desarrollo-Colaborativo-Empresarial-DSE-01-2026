(function () {
  let createCatModal, confirmModal;

  function qs(id) { return document.getElementById(id); }

  function normalize(s){ return String(s ?? "").trim(); }

  function setHelp(id, msg) {
    const input = qs(id);
    const help = qs(id + "Help");
    if (!input || !help) return;
    if (msg) { input.classList.add("is-invalid"); help.textContent = msg; }
    else { input.classList.remove("is-invalid"); help.textContent = ""; }
  }

  // Rellena un select con categorías
  window.fillCategorySelect = function fillCategorySelect(selectId, selectedValue = "") {
    const sel = qs(selectId);
    if (!sel) return;

    const cats = window.categories || [];
    sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");

    if (selectedValue && cats.includes(selectedValue)) sel.value = selectedValue;
    else sel.value = cats.includes("Sin categoría") ? "Sin categoría" : (cats[0] || "");
  };

  function refreshCategorySelects() {
    // Form principal 
    window.fillCategorySelect("category", qs("category")?.value);

    // Modal edición (select id="editCategory") si existe
    if (qs("editCategory")) window.fillCategorySelect("editCategory", qs("editCategory")?.value);
  }

  function confirmDanger({ title, body, okText = "Sí", onOk }) {
    qs("confirmTitle").textContent = title;
    qs("confirmBody").textContent = body;

    const okBtn = qs("confirmOkBtn");
    okBtn.textContent = okText;

    const newBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newBtn, okBtn);

    newBtn.addEventListener("click", () => {
      confirmModal.hide();
      onOk();
    });

    confirmModal.show();
  }

  function handleCreateCategory(e) {
    e.preventDefault();
    setHelp("newCategoryName", "");

    const name = normalize(qs("newCategoryName").value);
    if (!name) { setHelp("newCategoryName", "La categoría es obligatoria."); return; }

    const exists = (window.categories || []).some(c => c.toLowerCase() === name.toLowerCase());
    if (exists) {
  setHelp("newCategoryName", "Esa categoría ya existe.");
  if (exists) {
  Swal.fire({
    title: "Categoría duplicada",
    text: "Esa categoría ya existe.",
    icon: "info",
    confirmButtonText: "Entendido",
  });
  return;
}
  return;
}

    window.categories = window.categories || [];
    window.categories.unshift(name);

    refreshCategorySelects();
    qs("createCategoryForm").reset();
    createCatModal.hide();

    if (window.showToast) window.showToast("Categoría creada ✅", "success");
  }

  document.addEventListener("DOMContentLoaded", () => {
    createCatModal = new bootstrap.Modal(qs("createCategoryModal"));
    confirmModal = new bootstrap.Modal(qs("confirmModal"));

    // Cargar selects al iniciar
    refreshCategorySelects();

    // Botón + al lado del select
    qs("addCategoryBtn")?.addEventListener("click", () => createCatModal.show());

    // Submit de creación
    qs("createCategoryForm")?.addEventListener("submit", handleCreateCategory);

  });
})();