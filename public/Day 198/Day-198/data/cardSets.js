/**
 * Card Sets for Memory Game
 * Programming concepts organized by theme
 */

export const CARD_SETS = {
    html: [
        { id: 'div', content: '<div>', label: 'DIV', theme: 'html' },
        { id: 'span', content: '<span>', label: 'SPAN', theme: 'html' },
        { id: 'p', content: '<p>', label: 'Paragraph', theme: 'html' },
        { id: 'a', content: '<a>', label: 'Anchor', theme: 'html' },
        { id: 'img', content: '<img>', label: 'Image', theme: 'html' },
        { id: 'ul', content: '<ul>', label: 'Unordered List', theme: 'html' },
        { id: 'li', content: '<li>', label: 'List Item', theme: 'html' },
        { id: 'h1', content: '<h1>', label: 'Heading 1', theme: 'html' },
        { id: 'input', content: '<input>', label: 'Input', theme: 'html' },
        { id: 'button', content: '<button>', label: 'Button', theme: 'html' },
        { id: 'form', content: '<form>', label: 'Form', theme: 'html' },
        { id: 'table', content: '<table>', label: 'Table', theme: 'html' },
        { id: 'header', content: '<header>', label: 'Header', theme: 'html' },
        { id: 'footer', content: '<footer>', label: 'Footer', theme: 'html' },
        { id: 'nav', content: '<nav>', label: 'Navigation', theme: 'html' },
        { id: 'section', content: '<section>', label: 'Section', theme: 'html' }
    ],

    css: [
        { id: 'color', content: 'color:', label: 'Color', theme: 'css' },
        { id: 'display', content: 'display:', label: 'Display', theme: 'css' },
        { id: 'flex', content: 'flex:', label: 'Flex', theme: 'css' },
        { id: 'grid', content: 'grid:', label: 'Grid', theme: 'css' },
        { id: 'margin', content: 'margin:', label: 'Margin', theme: 'css' },
        { id: 'padding', content: 'padding:', label: 'Padding', theme: 'css' },
        { id: 'border', content: 'border:', label: 'Border', theme: 'css' },
        { id: 'position', content: 'position:', label: 'Position', theme: 'css' },
        { id: 'transform', content: 'transform:', label: 'Transform', theme: 'css' },
        { id: 'opacity', content: 'opacity:', label: 'Opacity', theme: 'css' },
        { id: 'z-index', content: 'z-index:', label: 'Z-Index', theme: 'css' },
        { id: 'font-size', content: 'font-size:', label: 'Font Size', theme: 'css' },
        { id: 'bg-color', content: 'background:', label: 'Background', theme: 'css' },
        { id: 'width', content: 'width:', label: 'Width', theme: 'css' },
        { id: 'height', content: 'height:', label: 'Height', theme: 'css' },
        { id: 'overflow', content: 'overflow:', label: 'Overflow', theme: 'css' }
    ],

    javascript: [
        { id: 'var', content: 'var', label: 'Variable', theme: 'javascript' },
        { id: 'let', content: 'let', label: 'Let', theme: 'javascript' },
        { id: 'const', content: 'const', label: 'Const', theme: 'javascript' },
        { id: 'function', content: '() =>', label: 'Arrow Function', theme: 'javascript' },
        { id: 'if', content: 'if', label: 'If Statement', theme: 'javascript' },
        { id: 'for', content: 'for', label: 'For Loop', theme: 'javascript' },
        { id: 'while', content: 'while', label: 'While Loop', theme: 'javascript' },
        { id: 'class', content: 'class', label: 'Class', theme: 'javascript' },
        { id: 'async', content: 'async', label: 'Async', theme: 'javascript' },
        { id: 'await', content: 'await', label: 'Await', theme: 'javascript' },
        { id: 'try', content: 'try', label: 'Try-Catch', theme: 'javascript' },
        { id: 'return', content: 'return', label: 'Return', theme: 'javascript' },
        { id: 'map', content: '.map()', label: 'Array Map', theme: 'javascript' },
        { id: 'filter', content: '.filter()', label: 'Array Filter', theme: 'javascript' },
        { id: 'reduce', content: '.reduce()', label: 'Array Reduce', theme: 'javascript' },
        { id: 'promise', content: 'Promise', label: 'Promise', theme: 'javascript' }
    ],

    frameworks: [
        { id: 'react', content: '⚛️', label: 'React', theme: 'react' },
        { id: 'vue', content: '🖖', label: 'Vue', theme: 'vue' },
        { id: 'angular', content: 'A', label: 'Angular', theme: 'html' },
        { id: 'svelte', content: 'S', label: 'Svelte', theme: 'html' },
        { id: 'next', content: 'N', label: 'Next.js', theme: 'react' },
        { id: 'nuxt', content: 'Nu', label: 'Nuxt', theme: 'vue' },
        { id: 'express', content: 'E', label: 'Express', theme: 'node' },
        { id: 'node', content: '🟢', label: 'Node.js', theme: 'node' },
        { id: 'typescript', content: 'TS', label: 'TypeScript', theme: 'javascript' },
        { id: 'webpack', content: 'W', label: 'Webpack', theme: 'javascript' },
        { id: 'vite', content: 'V⚡', label: 'Vite', theme: 'javascript' },
        { id: 'tailwind', content: 'TW', label: 'Tailwind', theme: 'css' },
        { id: 'bootstrap', content: 'B', label: 'Bootstrap', theme: 'css' },
        { id: 'sass', content: 'S', label: 'Sass', theme: 'css' },
        { id: 'git', content: '📦', label: 'Git', theme: 'git' },
        { id: 'npm', content: '📦', label: 'NPM', theme: 'node' }
    ]
};

/**
 * Get cards for a specific theme and difficulty
 */
export function getCardSet(theme, pairCount) {
    let sourceCards;

    if (theme === 'mixed') {
        // Mix cards from all themes
        sourceCards = [
            ...CARD_SETS.html.slice(0, 4),
            ...CARD_SETS.css.slice(0, 4),
            ...CARD_SETS.javascript.slice(0, 4),
            ...CARD_SETS.frameworks.slice(0, 4)
        ];
    } else {
        sourceCards = CARD_SETS[theme] || CARD_SETS.html;
    }

    // Select the required number of unique cards
    const selected = sourceCards.slice(0, pairCount);

    // Duplicate for pairs and add unique identifiers
    const pairs = [];
    selected.forEach((card, index) => {
        pairs.push({ ...card, pairId: index, uniqueId: `${card.id}-1` });
        pairs.push({ ...card, pairId: index, uniqueId: `${card.id}-2` });
    });

    return pairs;
}
