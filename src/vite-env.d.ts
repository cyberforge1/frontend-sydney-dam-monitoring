// src/vite-env.d.ts


/// <reference types="vite/client" />



declare module "*.mp4" {
  const src: string;
  export default src;
}
