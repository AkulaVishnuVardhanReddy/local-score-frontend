import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';


export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure alias is set correctly
    },
  },
});
