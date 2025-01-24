<h1 class="text-center" style="background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));
 padding: 5px;"> Authentication JWT Login in React
 <img src="./src/assets/react.svg"/>
 </h1>
<h4>Author : Andoni ALONSO TORT</h4>

Implementing authentication in React with JWT received from server.

A front-end application built with React, designed to provide an intuitive and modern interface for user and role management. It includes:

- ✅ An intuitive user interface for login and user profile management.
- ✅ Role management with specific views and permissions based on user authorizations.
- ✅ Integration with a secure REST API, developed in Node.js, for all authentication and user management operations. Communications use JWTs (JSON Web Tokens) to ensure secure exchanges.
- ✅ Support for conditional navigation with protected routes based on user login status and roles.
- ✅ An optimized user experience thanks to modern libraries like React Router and Axios.

This front-end is designed to interact with the [authentication JWT Node.js back-end proejct](https://github.com/AndoniAT/Auth_JWT_NodeJs). Offering a solid and secure foundation for applications requiring advanced user management.


Project created with :
> npm create vite@latest

To run project :
- Install dependencies :
    > npm install

- Run :
    > npm run dev

<hr/>

### Dependencies


Other dependencies installed :
  - axios: For API requests
  - @fvilers/disable-react-devtools : To disable react devtools in browser
  - jwt-decode : To decode accesToken received from Backend
  - clsx : Fot conditional clasnames
  - [heroui](https://www.heroui.com/docs/components): Some dependencies for styles

For styles see :
  - [Flowbite](https://www.heroui.com/
  docs/components)
  - [Tailwind](https://tailwindcss.com/docs)
  - [Heroui](https://www.heroui.com/docs/components)

To init tailwind in project :
> npm install -D tailwindcss postcss autoprefixer

> npx tailwindcss init -p

See [tailwind documentation](https://tailwindcss.com/docs/guides/vite) to see how to install tailwind with vite.


### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
<hr/>

# Other project details

<h6>== USER ROLES ==</h6>

<table style="margin: 0 auto; width: fit-content; border: 1px solid black;">
  <tr style="background: gray;">
    <th style="border: 1px solid black;">Role</th>
    <th style="border: 1px solid black;">Code</th>
  </tr>
  <tr>
    <td style="border: 1px solid black">Admin</td>
    <td style="border: 1px solid black">1000</td>
  </tr>
  <tr>
    <td style="border: 1px solid black">User</td>
    <td style="border: 1px solid black">2000</td>
  </tr>
</table>


<hr/>
<h5>Author: <i>Andoni ALONSO TORT</i><h5>
