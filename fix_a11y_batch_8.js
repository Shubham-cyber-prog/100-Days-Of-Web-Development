const fs = require('fs');
const path = require('path');

const files = [
    'public/apps/kanban-board/index.html',
    'public/Day 01/index.html',
    'public/Day 02/index.html',
    'public/Day 07/index.html',
    'public/Day 102/index.html',
    'public/Day 104/index.html',
    'public/Day 105/example.html',
    'public/Day 105/index.html',
    'public/Day 106/attendance.html',
    'public/Day 106/energy.html',
    'public/Day 106/login.html',
    'public/Day 106/register.html',
    'public/Day 106/settings.html',
    'public/Day 106/subjects.html',
    'public/Day 108/demo.html',
    'public/Day 108/index.html',
    'public/Day 110/index.html',
    'public/Day 112/index.html',
    'public/Day 113/index.html',
    'public/Day 116/index.html'
];

files.forEach(f => {
    const fullPath = path.resolve('d:/100-Days-Of-Web-Development-ECWoC26', f);
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${fullPath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;

    // Self-close void elements
    content = content.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/gi, (match, tag, attrs) => {
        return `<${tag}${attrs} />`;
    });

    // Ensure <img> has alt attribute
    // This is a simple regex that might Miss some complex cases but should help with the majority
    content = content.replace(/<img(?![^>]*alt=)([^>]*?) \/>/gi, '<img$1 alt="" />');
    content = content.replace(/<img(?![^>]*alt=)([^>]*?)>/gi, '<img$1 alt="">'); // fallback for non-self-closed if any left

    if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed: ${f}`);
    } else {
        console.log(`No changes for: ${f}`);
    }
});
