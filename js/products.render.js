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

  function norm(s) {
    return String(s ?? "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function productCard(p) {
    const img =
      p.imageUrl && String(p.imageUrl).trim()
        ? p.imageUrl
        : "https://via.placeholder.com/600x350?text=Producto";

    const statusBadge =
      p.status === "inactive"
        ? `<span class="badge text-bg-secondary ms-2">Inactivo</span>`
        : `<span class="badge text-bg-success ms-2">Activo</span>`;

    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow-sm card-soft h-100">
          <div class="card-body">
            <img class="product-img mb-3" src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" />

            <div class="d-flex align-items-start justify-content-between gap-2">
              <div>
                <h6 class="mb-1">${escapeHtml(p.name)}</h6>
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="badge text-bg-secondary">${escapeHtml(p.category)}</span>
                  ${p.status ? statusBadge : ""}
                </div>
              </div>

              <div class="text-end">
                <div class="fw-bold">${formatMoney(p.price)}</div>
                <div class="text-secondary small">Stock: ${escapeHtml(p.stock)}</div>
              </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
  <button class="btn btn-sm btn-outline-secondary js-view" data-id="${escapeHtml(p.id)}">
    Ver más
  </button>
  <button class="btn btn-sm btn-outline-primary js-edit" data-id="${escapeHtml(p.id)}">
    Editar
  </button>
  <button class="btn btn-sm btn-outline-danger js-delete" data-id="${escapeHtml(p.id)}">
    Eliminar
  </button>
</div>
          </div>
        </div>
      </div>
    `;
  }

  window.renderProducts = function renderProducts(list, filters = {}) {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("countLabel");

  if (!grid || !empty || !count) return;

  const arr = Array.isArray(list) ? list : [];

  const search = norm(filters.search || "");
  const category = String(filters.category || "").trim();
  const status = String(filters.status || "").trim();

  const filtered = arr.filter((p) => {
    const matchName = !search || norm(p.name).includes(search);
    const matchCategory = !category || p.category === category;
    const matchStatus = !status || p.status === status;

    return matchName && matchCategory && matchStatus;
  });

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