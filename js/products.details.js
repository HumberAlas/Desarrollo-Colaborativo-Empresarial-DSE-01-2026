// js/products.details.js
(function () {
  let detailModal;

  function qs(id) { return document.getElementById(id); }

  function formatMoney(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "$0.00";
    return "$" + num.toFixed(2);
  }

  function getById(id) {
    return (window.products || []).find(p => String(p.id) === String(id)) || null;
  }

  function openDetail(id) {
    const p = getById(id);
    if (!p) return;

    qs("detailTitle").textContent = p.name ?? "Detalle del producto";
    qs("detailImg").src = (p.imageUrl && String(p.imageUrl).trim())
      ? p.imageUrl
      : "https://via.placeholder.com/800x600?text=Producto";

    qs("detailCategory").textContent = p.category ?? "";
    qs("detailDesc").textContent = (p.description ?? "").trim() || "Sin descripción.";

    const status = p.status ?? "active";
    const statusEl = qs("detailStatus");
    statusEl.textContent = status === "inactive" ? "Inactivo" : "Activo";
    statusEl.className = "badge " + (status === "inactive" ? "text-bg-secondary" : "text-bg-success");

    qs("detailPrice").textContent = formatMoney(p.price);
    qs("detailStock").textContent = String(p.stock ?? "");
    qs("detailId").textContent = String(p.id ?? "");
    qs("detailCreated").textContent = p.createdAt ? new Date(p.createdAt).toLocaleString() : "—";

    detailModal.show();
  }

  document.addEventListener("DOMContentLoaded", () => {
    detailModal = new bootstrap.Modal(qs("productDetailModal"));

    const grid = qs("productGrid");
    grid?.addEventListener("click", (e) => {
      const btn = e.target.closest(".js-view");
      if (!btn) return;
      openDetail(btn.getAttribute("data-id"));
    });
  });
})();