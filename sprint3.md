# Sprint 3

## Objetivo del Sprint
Implementar la funcionalidad de eliminación de productos y mejorar la administración de categorías dentro del sistema CRUD de productos.

Además se realizaron mejoras en la interfaz del sistema para facilitar la gestión del inventario y la organización de las categorías.

---

# Funcionalidades implementadas

Durante este sprint se implementaron las siguientes funcionalidades:

### Eliminación de productos
Se agregó la opción de eliminar productos desde la tarjeta del producto y desde el formulario de edición.

Esta funcionalidad incluye:

- Botón **Eliminar** dentro de la tarjeta del producto.
- Confirmación antes de eliminar utilizando **SweetAlert2**.
- Eliminación del producto del **array global de productos**.
- Actualización automática del inventario mediante **re-renderización de la lista de productos**.

Esto permite administrar el inventario de forma más dinámica y mantener la lista actualizada en tiempo real.

---

### Confirmación antes de eliminar
Se implementó una ventana de confirmación antes de eliminar productos o categorías.

Esta confirmación evita eliminaciones accidentales y mejora la experiencia del usuario.

La confirmación muestra:

- Advertencia de la acción
- Botón de cancelar
- Botón de confirmar eliminación

---

### Administración de categorías
Se mejoró el módulo de administración de categorías agregando:

- Visualización de categorías en una **tabla**
- Botón **Editar categoría**
- Botón **Eliminar categoría**
- Confirmación antes de eliminar una categoría
- Protección de la categoría **"Sin categoría"** para evitar que sea eliminada o modificada

Cuando se elimina una categoría:

- Los productos que pertenecían a esa categoría pasan automáticamente a **"Sin categoría"**.

---

### Mejoras en la interfaz
También se realizaron mejoras visuales y estructurales en la aplicación:

- Separación de secciones **Inventario** y **Administrar** en la barra de navegación.
- Creación de un panel de **administración de categorías**.
- Implementación de **modales** para las acciones de creación, edición y eliminación.
- Mejora en la visualización del inventario con tarjetas de productos más organizadas.
- Implementación de scroll independiente en el contenedor del inventario.

---

# Distribución de trabajo

### Product Owner
**Jonathan Humberto**

- Definición de requerimientos del sprint.
- Revisión de funcionalidades implementadas.
- Validación de que las funcionalidades cumplan con los requerimientos del sistema.

---

### Scrum Master
**Jeremy Fuentes**

- Supervisión del flujo de trabajo SCRUM.
- Revisión del código y validación de buenas prácticas.
- Corrección de detalles solicitados por el docente.
- Validación de funcionamiento del sistema antes del merge final.

---

### Developers

**Karla Patricia**
- Implementación del botón de eliminación de productos.
- Integración de confirmaciones para eliminar productos.
- Actualización del array de productos al eliminar.

**Kenia Guadalupe**
- Re-renderización dinámica del inventario después de eliminar productos.
- Integración de los cambios en la vista del inventario.

**Felix Mauricio**
- Implementación del sistema de administración de categorías.
- Validaciones para evitar categorías duplicadas.
- Protección de la categoría "Sin categoría".

---

# Problemas encontrados

Durante el desarrollo del sprint se identificaron algunos problemas:

- Se detectó duplicación de funciones dentro del archivo de gestión de categorías, lo cual impedía que algunas validaciones se ejecutaran correctamente.
- Se ajustaron validaciones para evitar que la categoría **"Sin categoría"** pudiera ser eliminada o modificada.
- Se realizaron ajustes en la interfaz para mejorar la visualización del inventario y evitar desbordamientos en la lista de productos.

Todos los problemas fueron corregidos antes de realizar el merge a la rama **develop**.

---

# Resultado del Sprint

Al finalizar este sprint el sistema ya cuenta con:

- CRUD funcional de productos
- Eliminación segura de productos
- Confirmaciones antes de eliminar
- Administración completa de categorías
- Interfaz mejor organizada

Estas mejoras permiten una gestión más completa del inventario y preparan el sistema para los siguientes sprints del proyecto.