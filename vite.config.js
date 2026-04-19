import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Helper to get all HTML entry points in blog/
const getBlogInputs = () => {
  const blogDir = resolve(__dirname, 'blog');
  if (!fs.existsSync(blogDir)) return {};
  
  const files = fs.readdirSync(blogDir);
  const inputs = {};
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      inputs[`blog/${name}`] = resolve(__dirname, `blog/${file}`);
    }
  });
  
  return inputs;
};

// Helper to get all HTML entry points in reports/
const getReportInputs = () => {
  const reportDir = resolve(__dirname, 'reports');
  if (!fs.existsSync(reportDir)) return {};
  
  const files = fs.readdirSync(reportDir);
  const inputs = {};
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      inputs[`reports/${name}`] = resolve(__dirname, `reports/${file}`);
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
        main: resolve(__dirname, 'index.html'),
        ...getBlogInputs(),
        ...getReportInputs()
      }
    }
  }
});
