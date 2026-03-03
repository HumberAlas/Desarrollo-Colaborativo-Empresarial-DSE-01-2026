(function () {
  function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === "";
  }

  function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : NaN;
  }

// Recibe un objeto crudo {name, category, price, stock, imageUrl}
// Devuelve { ok, errors, product }
  window.validateProductInput = function validateProductInput(raw) {
    const errors = {};

    const name = String(raw.name ?? "").trim();
    const category = String(raw.category ?? "").trim();
    const price = toNumber(raw.price);
    const stock = toNumber(raw.stock);
    const imageUrl = String(raw.imageUrl ?? "").trim();

    if (isEmpty(name)) errors.name = "El nombre es obligatorio.";
    else if (name.length < 3) errors.name = "El nombre debe tener al menos 3 caracteres.";

    if (isEmpty(category)) errors.category = "La categoría es obligatoria.";
    else if (category.length < 3) errors.category = "La categoría debe tener al menos 3 caracteres.";

    if (Number.isNaN(price)) errors.price = "El precio debe ser numérico.";
    else if (price <= 0) errors.price = "El precio debe ser mayor que 0.";

    if (Number.isNaN(stock)) errors.stock = "El stock debe ser numérico.";
    else if (!Number.isInteger(stock)) errors.stock = "El stock debe ser un número entero.";
    else if (stock < 0) errors.stock = "El stock no puede ser negativo.";

    if (!isEmpty(imageUrl)) {
      const looksLikeUrl = /^https?:\/\/.+/i.test(imageUrl);
      if (!looksLikeUrl) errors.imageUrl = "La imagen debe ser una URL válida (http/https).";
    }
    if (raw.description && raw.description.length > 250) {
  errors.description = "La descripción no puede superar los 250 caracteres.";
}

    const ok = Object.keys(errors).length === 0;

    if (!ok) return { ok, errors, product: null };

    const product = {
      id: window.createProductId ? window.createProductId() : ("p_" + Date.now()),
      name,
      category,
      price: Math.round(price * 100) / 100,
      stock,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
    };

    return { ok, errors, product };
  };
})();