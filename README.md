# React + Vite

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

O compilador React não está habilitado neste modelo devido ao seu impacto no desempenho de desenvolvimento e compilação. Para adicioná-lo, consulte [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

Se você estiver desenvolvendo um aplicativo de produção, recomendamos o uso do TypeScript com regras de lint que levam em consideração os tipos, ativadas. Confira o [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) Para obter informações sobre como integrar o TypeScript e [`typescript-eslint`](https://typescript-eslint.io) em seu projeto.
