# Sprint 4 – Filtros de búsqueda y mejora de inventario

## Descripción del Sprint

Durante este sprint se realizaron mejoras en el sistema de búsqueda y filtrado del inventario de productos dentro de **ProductHub**. El objetivo fue mejorar la experiencia de usuario permitiendo encontrar productos de forma más rápida mediante filtros combinados, manteniendo el renderizado dinámico de la aplicación sin recargar la página.

Se modificó el comportamiento del buscador para que filtre únicamente por **nombre del producto** y se añadieron nuevos filtros por **categoría** y **estado del producto**, permitiendo aplicar múltiples criterios de búsqueda al mismo tiempo.

También se realizaron ajustes en la interfaz para organizar los filtros en una sola línea, optimizando el espacio visual del inventario.

---

# Funcionalidades implementadas

## Búsqueda por nombre de producto
Se modificó el sistema de búsqueda para que el filtrado se realice únicamente por el **nombre del producto**, eliminando la coincidencia con la categoría.

Características implementadas:

- Búsqueda dinámica en tiempo real.
- Filtrado sin recargar la página.
- No sensible a mayúsculas, minúsculas ni tildes.

---

## Filtro por categoría
Se implementó un **menú desplegable de categorías** que permite visualizar únicamente los productos pertenecientes a una categoría específica.

Características:

- Carga dinámica de las categorías disponibles.
- Actualización automática cuando se crean nuevas categorías.
- Integración con el resto de filtros.

---

## Filtro por estado del producto
Se agregó un filtro adicional para seleccionar el **estado del producto**:

- Activo
- Inactivo
- Todos

Este filtro permite visualizar únicamente productos disponibles o administrar productos desactivados dentro del inventario.

---

## Combinación de filtros
El sistema ahora permite aplicar múltiples filtros simultáneamente, combinando:

- Nombre del producto
- Categoría
- Estado

Ejemplos de uso:

- Buscar "mouse" dentro de la categoría **Electrónica**
- Mostrar productos **Activos** de la categoría **Bebidas**
- Buscar productos específicos dentro de una categoría seleccionada

Todo el filtrado se realiza en el navegador mediante JavaScript, manteniendo el **renderizado dinámico** de la interfaz.

---

## Mejora de la interfaz de filtros
Se reorganizó la sección de filtros para que todos los controles se muestren alineados en una sola fila.

Filtros visibles:

- Categoría
- Estado
- Búsqueda por nombre

Para esto se utilizaron estilos con **Flexbox**, mejorando la distribución visual y la experiencia de usuario.

---

# Trabajo realizado por integrante

## Jeremy – Scrum Master
- Supervisión del desarrollo del sprint.
- Verificación del cumplimiento de los objetivos establecidos.
- Revisión de las funcionalidades implementadas.
- Validación de las correcciones solicitadas por el ingeniero.
- Coordinación de la integración del código en la rama **develop**.

---

## Kenia – Desarrollo de filtros
Responsable de la lógica de filtrado.

Implementaciones realizadas:

- Filtro por categoría.
- Filtro por estado del producto.
- Integración de filtros combinados.
- Actualización dinámica del inventario al aplicar filtros.

---

## Karla – Interfaz y experiencia de usuario
Responsable de las mejoras visuales de la interfaz.

Implementaciones realizadas:

- Reorganización de los filtros en una sola línea.
- Ajustes de diseño responsive.
- Mejora de la visualización del inventario.
- Optimización del layout de los controles de filtrado.

---

## Felix – Lógica de búsqueda
Responsable del sistema de búsqueda.

Implementaciones realizadas:

- Modificación del buscador para filtrar únicamente por nombre.
- Implementación de búsqueda en tiempo real.
- Integración de la búsqueda con los filtros de categoría y estado.

---

# Problemas encontrados

Durante el desarrollo del sprint se identificaron algunos problemas técnicos:

- El filtro de categorías no se actualizaba automáticamente al crear nuevas categorías.
- El sistema de renderizado recibía parámetros incorrectos al actualizar las categorías.
- Los filtros se mostraban en diferentes líneas afectando la interfaz.

Estos problemas fueron solucionados mediante:

- Actualización dinámica del selector de categorías.
- Corrección en las llamadas a la función `renderProducts`.
- Ajustes en los estilos utilizando **Flexbox**.

---

# Resultado del Sprint

Al finalizar el Sprint 4 se logró implementar un sistema de filtrado más completo que permite administrar y visualizar el inventario de manera más eficiente.

Las mejoras permiten:

- Buscar productos por nombre.
- Filtrar por categoría.
- Filtrar por estado.
- Combinar múltiples filtros simultáneamente.
- Mantener el renderizado dinámico sin recargar la página.