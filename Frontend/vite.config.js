import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server.proxy: Configures a proxy for the development server
  server: {
    proxy: {
      "/api": { target: "http://localhost:5000" }
      // Vite server handles the communication with the backend 
      // behind the scenes, bypassing the browser’s CORS restrictions.
    }
  }
});
