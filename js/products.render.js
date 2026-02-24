(function () {
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function formatMoney(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "$0.00";
    return "$" + num.toFixed(2);
  }


  function productCard(p) {
    const img = p.imageUrl && p.imageUrl.trim()
      ? p.imageUrl.trim()
      : "https://images.unsplash.com/photo-1580915411954-282cb1f8a0b3?auto=format&fit=crop&w=800&q=60";


    return `
      <div class="col-12 col-md-6">
        <div class="card shadow-sm card-soft h-100">
          <div class="card-body">
            <img class="product-img mb-3" src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" />
            <div class="d-flex align-items-start justify-content-between gap-2">
              <div>
                <h6 class="mb-1">${escapeHtml(p.name)}</h6>
                <span class="badge text-bg-secondary">${escapeHtml(p.category)}</span>
              </div>
              <div class="text-end">
                <div class="fw-bold">${formatMoney(p.price)}</div>
                <div class="text-secondary small">Stock: ${escapeHtml(p.stock)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }


  window.renderProducts = function renderProducts(list, searchTerm = "") {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("countLabel");


  if (!grid || !empty || !count) return;


  const arr = Array.isArray(list) ? list : [];
  const term = String(searchTerm || "").trim().toLowerCase();


  const filtered = term
    ? arr.filter((p) =>
        String(p.name).toLowerCase().includes(term) ||
        String(p.category).toLowerCase().includes(term)
      )
    : arr;


  count.textContent = `${filtered.length} producto${filtered.length === 1 ? "" : "s"}`;


  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("d-none");
    return;
  }


  empty.classList.add("d-none");
  grid.innerHTML = filtered.map(productCard).join("");
};
})();
