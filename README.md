# Auth_Login_React
<h4>Author : Andoni ALONSO TORT</h4>

Implementing authentication in React with JWT received from server.

For this project we are intrecact with the [authentication jwt project](git@github.com:AndoniAT/Auth_Login_React.git) in node js from my github.

Project created with :
> npm create vite@latest

To run project :
- Install dependencies :
    > npm install

- Run :
    > npm run dev

<hr/>
# React + TypeScript + Vite

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

This project uses Tailwind for styles.

> npm install -D tailwindcss postcss autoprefixer

> npx tailwindcss init -p

See [tailwind documentation](https://tailwindcss.com/docs/guides/vite) to see how to install tailwind with vite.



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