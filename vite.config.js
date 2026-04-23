import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Helper to get all HTML entry points in a directory
const getHtmlInputs = (dirPath, prefix = '') => {
  const fullPath = resolve(__dirname, dirPath);
  if (!fs.existsSync(fullPath)) return {};
  
  const files = fs.readdirSync(fullPath);
  const inputs = {};
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      const key = prefix ? `${prefix}/${name}` : name;
      inputs[key] = resolve(__dirname, dirPath, file);
    }
  });
  
  return inputs;
};

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...getHtmlInputs('.'),
        ...getHtmlInputs('blog', 'blog'),
        ...getHtmlInputs('reports', 'reports')
      }
    }
  }
});
