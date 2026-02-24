(function () {
  // Toast helper
  window.showToast = function showToast(message, type) {
    const toastEl = document.getElementById("liveToast");
    const bodyEl = document.getElementById("toastBody");
    if (!toastEl || !bodyEl) return;

    bodyEl.textContent = message;

    // Pequeña pista visual con clases Bootstrap (sin CSS extra)
    toastEl.classList.remove("text-bg-success", "text-bg-warning", "text-bg-danger", "text-bg-primary");
    if (type === "success") toastEl.classList.add("text-bg-success");
    else if (type === "warning") toastEl.classList.add("text-bg-warning");
    else if (type === "danger") toastEl.classList.add("text-bg-danger");
    else toastEl.classList.add("text-bg-primary");

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 });
    toast.show();
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Render inicial
    window.products = window.products || [];
    if (window.renderProducts) window.renderProducts(window.products);

    // Form submit
    const form = document.getElementById("productForm");
    if (form && window.addProductFromForm) {
      form.addEventListener("submit", window.addProductFromForm);
    }
  });

  const search = document.getElementById("searchInput");
if (search) {
  search.addEventListener("input", (e) => {
    const term = e.target.value;
    window.renderProducts(window.products || [], term);
  });
}
})();
