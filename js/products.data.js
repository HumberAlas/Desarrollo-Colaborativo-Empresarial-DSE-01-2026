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
      category: "Bebidas",
      price: 6.5,
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Audífonos Inalámbricos",
      category: "Electrónica",
      price: 19.99,
      stock: 12,
      imageUrl: "https://www.ebest.cl/media/catalog/product/cache/47abc4af9d81a631bd44d97ba9797770/a/u/audifonos-wirless-earfun-free-2.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Cuaderno Profesional",
      category: "Papelería",
      price: 2.25,
      stock: 80,
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60",
      createdAt: new Date().toISOString(),
    },
  ];

  window.createProductId = createId;
})();