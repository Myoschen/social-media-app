import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'lib', replacement: resolve(__dirname, 'src/lib') },
      { find: 'utils', replacement: resolve(__dirname, 'src/utils') },
      { find: 'hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: 'components', replacement: resolve(__dirname, 'src/components') },
    ],
  },
});
