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
  - [axios](https://www.npmjs.com/package/axios): For API requests
  - [@fvilers/disable-react-devtools](https://www.npmjs.com/package/@fvilers/disable-react-devtools) : To disable react devtools in browser
  - [jwt-decode](https://www.npmjs.com/package/jwt-decode) : To decode accesToken received from Backend
  - [clsx](https://www.npmjs.com/package/clsx) : Fot conditional clasnames
  - [react-error-boundary](https://legacy.reactjs.org/docs/error-boundaries.html) : To manage errorrs thrown with suspense. An error boundary is a special component that lets you display some fallback UI instead of the part that crashed—for example, an error message. [See more](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

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

## == 🏠 Home Page ==

On the homepage, there will be a page similar to when starting a new project with React + Vite, except that there will be an additional navbar with navigation buttons.

<div style="flex inline-flex">
     <img src="https://github.com/user-attachments/assets/fe029448-ce47-44fb-81fd-6f322305aceb" width="500"/>
     <img src="https://github.com/user-attachments/assets/56f1d304-0ce3-4083-8e7e-4a132578efcb" width="500"/>
</div>

## == 🔐 Login ==

Login page to connect to the application. This form calls the login API of the back-end project, which provides an accessToken with a duration of 1 minute and also stores a refreshToken in the cookies.

Each time an API call fails because the token has expired, the application will automatically request a new accessToken. The backend will use the refreshToken stored in the cookies to verify if the user is authorized to make this request

Added a 'Trust this device' checkbox to stay logged into the application.

<div style="flex inline-flex">
     <img src="https://github.com/user-attachments/assets/2e6326d2-8172-4eb4-846f-3235105308b5" width="500"/>
     <img src="https://github.com/user-attachments/assets/cd362988-b2a6-4eda-ad33-dca21a9e5f65" width="500"/>
</div>

## == ✅🧔 Create Account ==

Create an account while following the rules defined in the [Back-end project](https://github.com/AndoniAT/Auth_JWT_NodeJs). Once the account is created, the user will be redirected to the login page.

<div style="flex inline-flex">
    <img src="https://github.com/user-attachments/assets/5205d68a-6d52-4038-8131-23374c07fda7" width="500"/>
    <img src="https://github.com/user-attachments/assets/4622bc3a-a107-4046-8a86-0a103dfc5db6" width="500"/>
</div>

## == 👨‍💼 Admin Page Users Manage ==

The admin page displays a list of users with action buttons: Edit and Delete.

‼️WARNING: An administrator cannot be deleted if they are the only administrator of the application.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/161ab61b-6c30-450f-a460-77c3e10f3412" width="500"/>
   <img src="https://github.com/user-attachments/assets/4648d227-143c-4cfb-8e4e-546fbee5ac6a" width="500"/>
</div>

## == 👨‍💻 User Profile ==

The user profile page is divided into 3 sections:

 - 👁️ Form for viewing, editing, and deleting the user : Actions only displayed in your own profile or if you are an admin.

 - 🤝 Interactions : Are only displayed in other user, not your own profile.

 - 💻 Posts

(Points 2 and 3 are not features of this application. They are just examples of what could be added. This application is designed solely to provide a complete authentication and user management project based on roles.)

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/36988fbb-d41a-49e5-b0f4-1e1659cfddc9" width="500"/>
   <img src="https://github.com/user-attachments/assets/301a4715-db83-4825-aec7-115f6f59e5b4" width="500"/>
</div>

‼️WARNING: Some modifications to sensitive information ( email, username and roles ) may require reauthentication.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/90b6cff1-720a-4eb6-8d6f-9aa6ff120787" width="500"/>
   <img src="https://github.com/user-attachments/assets/98edacff-8e1b-4214-b616-480c131c6c48" width="500"/>
</div>

# == ✅➕ MORE ==

## == ↪️ REDIRECTIONS (Navigation)  ==

- 🙅 If a user does not have permission to access a page, they will be redirected to the homepage. For example, a regular user attempting to access the admin page.
- ❓ If an unauthenticated user tries to access a page, they will be redirected to the login page. Once logged in, they will be redirected to the page they were trying to reach.

## == ❌ ERROR LOADING (ErrorBoundary) ==

- Error messages on the page if a resource fails to load properly.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/48f01ae2-16e0-4088-ac3c-a6cead7423c3" width="500"/>
  <img src="https://github.com/user-attachments/assets/a70273fd-c81c-4aff-949c-76fcb07f3723" width="500"/>
</div>

## == 🔄️ LOAGING DATA (Suspend => SKELETONS ) ==

Use of Suspense to display a loading skeleton while the data is being loaded. This feature enhances the user experience

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/c1466d4d-056f-422c-8c03-d9a648a974f6" width="500"/>
  <img src="https://github.com/user-attachments/assets/24d1fcda-d345-4519-9c62-84b1b8bf5ad9" width="500"/>
</div>

## == ❌ ERROR FORMS ==

Display clear error messages in forms so that the user can correct the submitted information.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/da6ddfa7-654f-453d-93c2-160e5fe15121" width="500"/>
  <img src="https://github.com/user-attachments/assets/7aac1b80-6c39-4a7f-a48d-dbb64182e528" width="500"/>
</div>

<hr/>
<h5>Author: <i>Andoni ALONSO TORT</i><h5>
