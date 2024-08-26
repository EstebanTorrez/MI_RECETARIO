# Mi Recetario

Una aplicación web para gestionar recetas, categorías y comentarios, desarrollada con React y Vite. La aplicación permite a los usuarios crear, visualizar, eliminar recetas y categorías, y gestionar su perfil.

## Estructura del Proyecto

### 1. **Estructura de Carpetas**

- **src/**: Contiene todo el código fuente del proyecto.
  - **components/**: Componentes reutilizables de la interfaz.
  - **context/**: Proporciona contextos de autenticación y otros estados globales.
  - **hooks/**: Hooks personalizados para manejar estados y lógica de negocio.
  - **pages/**: Páginas principales de la aplicación.
  - **services/**: Servicios para interactuar con la API.
  - **App.jsx**: Componente principal que configura las rutas de la aplicación.
  - **main.jsx**: Punto de entrada de la aplicación.

### 2. **Configuración Inicial**


Rutas y Funcionalidades
/home: Página principal que muestra una lista de recetas.
/create-recipe: Página para crear nuevas recetas.
/login: Página de inicio de sesión.
/register: Página de registro de nuevos usuarios.
/profile: Página del perfil de usuario.
/logout: Página para cerrar sesión.
/delete-recipe: Página para eliminar recetas.
/delete-category: Página para eliminar categorías.

Componentes Importantes
Navbar.jsx: Barra de navegación que incluye enlaces a todas las páginas principales y opciones de inicio/cierre de sesión.
RecipeList.jsx: Muestra la lista de recetas.
DeleteRecipe.jsx: Página para eliminar recetas.
DeleteCategory.jsx: Página para eliminar categorías.

Servicios
services/recipeService.js: Maneja las solicitudes relacionadas con las recetas, incluyendo la creación, visualización y eliminación de recetas.
services/category.js: Maneja las solicitudes relacionadas con las categorías, incluyendo la visualización y eliminación de categorías.

Hooks Personalizados
hooks/useFetch.jsx: Hook personalizado para manejar las solicitudes HTTP con estados de carga, error y datos.

Configuración de Rutas y Autenticación
App.jsx: Configura las rutas de la aplicación y protege las rutas privadas usando PrivateRoute.

Despliegue en Vercel
Para desplegar la aplicación en Vercel: https://mi-recetarioweb.vercel.app/

Contribuciones
Si deseas contribuir al proyecto, por favor sigue estos pasos:

Fork del Repositorio
Crea una Rama para tus Cambios
Realiza un Pull Request

Licencia
Este proyecto está licenciado bajo la MIT License.