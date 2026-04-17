const fs = require('fs');
const originalContent = fs.readFileSync('index.html', 'utf8');
const newContent = originalContent.replace(
    'srcset="/assets/img/Aryan_Panwar.webp 800w"', 
    'srcset="/assets/img/Aryan_Panwar_400.webp 400w, /assets/img/Aryan_Panwar.webp 800w"'
);

if (newContent === originalContent) {
    console.error('Error: Target content not found or already replaced in index.html.');
    process.exit(1);
}

fs.writeFileSync('index.html', newContent, 'utf8');
console.log('Done');
