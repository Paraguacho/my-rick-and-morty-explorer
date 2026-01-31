Explorador interactivo de personajes basado en la API de Rick and Morty. Esta permite visualizar, buscar y consultar información detallada de los personajes de la serie mediante una interfaz moderna y eficiente.

---

## Descripcion del Proyecto

Este proyecto ha sido desarrollado como una SPA utilizando React y Vite. El objetivo principal es ofrecer una experiencia de usuario fluida, implementando el consumo de API REST, el manejo de estados  y la optimización de consultas Debounce.

La interfaz está construida con la biblioteca de componentes Ant Design.

---

## Funcionalidades Principales

* **Listado de Personajes**: Visualización de personajes en una cuadrícula.
* **Busqueda Inteligente**: Barra de búsqueda con implementación de Debounce para filtrar personajes por nombre sin saturar la API.
* **Detalle Extendido**: Ventana modal que muestra información técnica adicional (especie, origen, género y fecha de creación) consultando directamente el endpoint individual.
* **Paginacion**: Sistema de navegación entre los más de 800 personajes disponibles en la base de datos.
* **Manejo de Estados**: Gestión de estados de carga y mensajes  cuando no se encuentran resultados.

---

## Tecnologias Utilizadas

| Tecnologia | Proposito |
| :--- | :--- |
| **React** | Biblioteca principal para la construcción de la interfaz. |
| **Vite** | Herramienta de construcción para un entorno de desarrollo rápido. |
| **Ant Design** | Biblioteca de componentes UI para el diseño y maquetación. |
| **Rick and Morty API** | Fuente de datos externa para la información de los personajes. |
| **CSS Moderno** | Uso de Flexbox y Grid para asegurar la consistencia visual. |

---

## Arquitectura de Componentes

El proyecto tiene una estructura modular para facilitar el mantenimiento y la escalabilidad:

1. **App.jsx**: Componente que maneja el estado global y la lógica de búsqueda.
2. **CharacterCard.jsx**: Componente encargado de renderizar la tarjeta individual.
3. **CharacterModal.jsx**: Componente independiente para mostrar los detalles técnicos del personaje seleccionado.


---
