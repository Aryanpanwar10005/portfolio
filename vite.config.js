import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Helper to get all HTML entry points in src/blog
const getBlogInputs = () => {
  const blogDir = resolve(__dirname, 'src/blog');
  if (!fs.existsSync(blogDir)) return {};
  
  const files = fs.readdirSync(blogDir);
  const inputs = {};
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      inputs[`blog/${name}`] = resolve(__dirname, `src/blog/${file}`);
    }
  });
  
  return inputs;
};

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        ...getBlogInputs()
      }
    }
  }
});
