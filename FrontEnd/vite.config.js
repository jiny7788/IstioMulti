import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['ckeditor5-custom-build'],
    },
    build: {
      commonjsOptions: { exclude: ['ckeditor5-custom-build'], include: [] },
    },
    resolve: {
      alias: [
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
    },
  };
});

