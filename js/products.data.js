(function () {
  // Genera IDs simples
  function createId() {
    return "p" + Date.now().toString(16) + "" + Math.floor(Math.random() * 9999);
  }

  // Array global de productos
  window.products = [
    {
      id: createId(),
      name: "Café Molido Premium",
      description:
        "Café 100% arábica de tostado medio, con aroma intenso y sabor equilibrado. Ideal para preparar en cafetera tradicional, prensa francesa o método filtrado.",
      category: "Bebidas",
      status: "active",
      price: 6.5,
      stock: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Audífonos Inalámbricos",
      description:
        "Audífonos Bluetooth con cancelación de ruido pasiva, batería de larga duración y diseño ergonómico. Incluyen estuche de carga portátil y micrófono integrado.",
      category: "Electrónica",
      status: "active",
      price: 19.99,
      stock: 12,
      imageUrl:
        "https://www.ebest.cl/media/catalog/product/cache/47abc4af9d81a631bd44d97ba9797770/a/u/audifonos-wirless-earfun-free-2.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Cuaderno Profesional",
      description:
        "Cuaderno de alta calidad con tapa dura y hojas rayadas. Ideal para uso académico o profesional. Papel resistente que evita el traspaso de tinta.",
      category: "Papelería",
      status: "active",
      price: 2.25,
      stock: 80,
      imageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60",
      createdAt: new Date().toISOString(),
    },
  ];

  window.createProductId = createId;
})();