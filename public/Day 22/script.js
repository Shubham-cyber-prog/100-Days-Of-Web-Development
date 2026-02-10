const input = document.getElementById("markdownInput");
const preview = document.getElementById("preview");

function renderMarkdown(text) {
  return text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`(.*?)`/gim, "<code>$1</code>")
    .replace(/\n/gim, "<br />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>");
}

input.addEventListener("input", () => {
  preview.innerHTML = renderMarkdown(input.value);
});

input.value = `# Markdown Previewer

### Introduction

This document demonstrates commonly used Markdown syntax.
It can be used as sample content for a Markdown editor or previewer project.

---

## Prerequisites

Before using this previewer, you should be familiar with:

- Basic Markdown syntax
- Writing plain text content

---

## Step 1 — Text Formatting

This is *italic text*  
This is **bold text**  
This is ~~strikethrough text~~

This is \`inline code\`.

---

## Step 2 — Lists

### Unordered List
- Item one
- Item two
- Item three

### Ordered List
1. First item
2. Second item
3. Third item

---

## Step 3 — Blockquotes

> This is a blockquote.
>
> > This is a nested blockquote.

---

## Step 4 — Horizontal Rule

Use horizontal rules to separate sections:

---

## Step 5 — Tables

| Feature | Supported |
|--------|-----------|
| Bold   | Yes       |
| Italic | Yes       |
| Lists  | Yes       |
| Tables | Yes       |

---

## Step 6 — Code Blocks

\`\`\`js
const message = "Hello, Markdown!";
console.log(message);
\`\`\`
`;

preview.innerHTML = renderMarkdown(input.value);
