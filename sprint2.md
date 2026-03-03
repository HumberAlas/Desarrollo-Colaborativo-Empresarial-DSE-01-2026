# Sprint2.md  
**Proyecto:** ProductHub – Sistema CRUD de Productos  
**Sprint:** 2  
**Metodología:** SCRUM  

---

## 🧩 Objetivo del Sprint

Implementar la funcionalidad de edición y actualización de productos, incorporar nuevos campos (estado y descripción), organizar los productos mediante una entidad de categorías, mejorar las validaciones del sistema y optimizar la experiencia del usuario.

---

## ✅ Qué se hizo

Durante el Sprint 2 se desarrollaron las siguientes funcionalidades:

### 1️⃣ Edición y actualización de productos
- Se agregó un botón **Editar** en cada tarjeta de producto.
- Se implementó un **modal de edición**.
- Se cargan automáticamente los datos del producto en el formulario.
- Se permite actualizar la información del producto.
- Se agregó la opción de eliminar productos desde el modal.
- Se incorporó confirmación antes de eliminar usando SweetAlert2.

---

### 2️⃣ Incorporación del campo Estado
- Se añadió el campo `status` (Activo / Inactivo).
- Se muestra visualmente mediante un badge en cada tarjeta.
- Se estableció como valor por defecto `"active"` al crear nuevos productos.

---

### 3️⃣ Incorporación del campo Descripción
- Se agregó campo descripción en creación y edición.
- Se muestra la descripción dentro de la tarjeta del producto.
- Se validó su correcto almacenamiento.

---

### 4️⃣ Entidad Categorías
- Se creó un array global de categorías.
- Se implementó un menú desplegable dinámico.
- Se agregó botón para crear nuevas categorías.
- Se validó que no se puedan duplicar categorías.
- Se mejoró la organización del inventario.

---

### 5️⃣ Validaciones Mejoradas
- Se implementó validación para evitar productos con el mismo nombre.
- La validación ignora mayúsculas, minúsculas y tildes.
- Se optimizó el buscador para que tampoco distinga tildes ni mayúsculas.
- Se mejoró la validación de precio y stock usando `type="number"`.

---

### 6️⃣ Mejora en la Experiencia de Usuario
- Se incorporó la librería **SweetAlert2** para confirmaciones.
- Se mejoró el layout:
  - Sección de creación fija.
  - Sección de lectura con scroll independiente.
- Se corrigieron errores detectados en Sprint 1.

---

## 👥 Quién hizo qué

### 🟣 Jonathan Humberto – Product Owner
- Validación de requerimientos.
- Coordinación con el cliente (docente).
- Aprobación de funcionalidades.

---

### 🔵 Jeremy Fuentes – Scrum Master
- Supervisión del cumplimiento del Sprint.
- Revisión de Pull Requests.
- Verificación del flujo Git (feature → develop).
- Aplicación de correcciones solicitadas por el ingeniero.
- Eliminación de código duplicado en `main.js`.
- Validación de estructura y orden correcto de scripts.

---

### 🟢 Karla Patricia – Developer
- Implementación del modal de edición.
- Lógica de actualización y eliminación de productos.
- Integración de SweetAlert2.
- Incorporación de estado y descripción en edición.

---

### 🟡 Kenia Guadalupe – Developer
- Rediseño del layout.
- Implementación de scroll independiente.
- Agregado del botón Editar en las tarjetas.
- Ajustes visuales en modales.

---

### 🟠 Félix Mauricio – Developer
- Creación de la entidad categorías.
- Implementación del menú desplegable dinámico.
- Validación para evitar categorías duplicadas.
- Validación de nombre único en productos.
- Optimización del buscador para ignorar tildes y mayúsculas.

---

## ⚠️ Problemas Encontrados

1. El campo `status` no estaba presente en los productos iniciales.  
   → Se agregó valor por defecto `"active"`.

2. El buscador distinguía tildes y mayúsculas.  
   → Se implementó función de normalización (`normalize`).

3. Se permitía agregar productos con nombres duplicados.  
   → Se agregó validación de unicidad.

4. Existía duplicación de listener en `main.js`.  
   → Se eliminó código repetido.

5. Orden incorrecto de carga de scripts en `index.html`.  
   → Se reorganizó el orden de carga.

---

## 📊 Resultado del Sprint

✔ CRUD funcional con edición y eliminación  
✔ Validaciones mejoradas  
✔ Organización por categorías  
✔ Confirmaciones dinámicas con SweetAlert2  
✔ Correcciones aplicadas según retroalimentación del ingeniero  

---
