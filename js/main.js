(function () {
  window.showToast = function showToast(message, type) {
    const toastEl = document.getElementById("liveToast");
    const bodyEl = document.getElementById("toastBody");
    if (!toastEl || !bodyEl) return;

    bodyEl.textContent = message;

    toastEl.classList.remove("text-bg-success", "text-bg-warning", "text-bg-danger", "text-bg-primary");
    if (type === "success") toastEl.classList.add("text-bg-success");
    else if (type === "warning") toastEl.classList.add("text-bg-warning");
    else if (type === "danger") toastEl.classList.add("text-bg-danger");
    else toastEl.classList.add("text-bg-primary");

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 });
    toast.show();
  };

  function qs(id) { return document.getElementById(id); }

  // Preview mini
  function setPreview(inputId, imgId, emptyId) {
    const input = qs(inputId);
    const img = qs(imgId);
    const empty = qs(emptyId);
    if (!input || !img || !empty) return;

    function hide() {
      img.classList.add("d-none");
      img.removeAttribute("src");
      empty.classList.remove("d-none");
    }

    function show(url) {
      img.src = url;
      img.classList.remove("d-none");
      empty.classList.add("d-none");
    }

    function update() {
      const url = String(input.value || "").trim();
      if (!url) return hide();
      show(url);
    }

    img.addEventListener("error", hide);
    input.addEventListener("input", update);
    input.addEventListener("change", update);

    hide();
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Render inicial
    window.products = window.products || [];
    if (window.fillCategoryFilter) window.fillCategoryFilter();
    if (window.renderProducts) window.renderProducts(window.products);

    // Submit del formulario
    const form = qs("productForm");
    if (form && window.addProductFromForm) {
      form.addEventListener("submit", window.addProductFromForm);
    }

    // Buscador
    const search = qs("searchInput");
    if (search) {
      search.addEventListener("input", (e) => {
        const term = e.target.value;
        if (window.renderProducts) window.renderProducts(window.products || [], term);
      });
    }

    // Preview imagen (crear y editar)
    setPreview("imageUrl", "imagePreview", "imagePreviewEmpty");
    setPreview("editImageUrl", "editImagePreview", "editImagePreviewEmpty");
  });
})();

window.fillCategoryFilter = function fillCategoryFilter() {
  const sel = document.getElementById("filterCategory");
  if (!sel) return;

  const cats = (window.categories || [])
    .map(c => typeof c === "string" ? c : c?.name)
    .filter(Boolean);

  sel.innerHTML = `
    <option value="">Todas las categorías</option>
    ${cats.map(c => `<option value="${c}">${c}</option>`).join("")}
  `;
};