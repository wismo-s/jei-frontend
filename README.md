# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

## ✅ Calidad de código: Prettier, ESLint y pre-commit hooks

Este proyecto usa [Husky](https://typicode.github.io/husky/) y [lint-staged](https://github.com/okonet/lint-staged) para asegurar que el código esté formateado y limpio antes de cada commit.

### Instalación inicial

1. Instala las dependencias:
    ```bash
    pnpm install
    ```

### ¿Cómo funciona?

-   Al hacer un commit (`git commit`), Husky ejecuta lint-staged:
    -   **Prettier** formatea archivos JS, TS, JSON, CSS, etc.
    -   **ESLint** corrige y verifica código JS/TS.
-   Si hay errores de formato o lint, el commit se aborta y debes corregirlos antes de poder commitear.
-   lint-staged se encarga de ejecutar los scripts de formato y lint solo sobre los archivos staged, evitando que se suba código mal formateado o con errores.

### Comandos útiles

-   Formatear todo el proyecto manualmente:
    ```bash
    pnpm prettier:write
    ```
-   Verificar lint en todo el proyecto:
    ```bash
    pnpm lint
    ```

### Solución de problemas

-   Si ves errores como `cannot open .husky/_/husky.sh`, elimina la carpeta `.husky` y ejecuta:
    ```bash
    rm -rf .husky
    pnpm dlx husky-init
    pnpm dlx husky add .husky/pre-commit "pnpm lint-staged"
    chmod +x .husky/pre-commit
    ```

---

Mantén esta sección actualizada para que todos los integrantes del equipo puedan replicar la configuración y mantener la calidad del código.
