import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import preact from "@preact/preset-vite";

export default defineConfig({
    plugins: [
      preact(), 
      tsconfigPaths(),
      tailwindcss()
    ],
});
