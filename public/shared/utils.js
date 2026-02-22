/**
 * Select a single element from the DOM
 * @param {string} selector 
 * @param {Element} [scope=document] 
 * @returns {Element}
 */
export const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Select multiple elements from the DOM
 * @param {string} selector 
 * @param {Element} [scope=document] 
 * @returns {NodeList}
 */
export const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/**
 * Get element by ID
 * @param {string} id 
 * @returns {Element}
 */
export const byId = (id) => document.getElementById(id);

/**
 * Add event listener wrapper
 * @param {Element} element 
 * @param {string} event 
 * @param {Function} callback 
 */
export const on = (element, event, callback) => element.addEventListener(event, callback);

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Create a new DOM element
 * @param {string} tag 
 * @param {object} [attributes={}] 
 * @returns {Element}
 */
export const create = (tag, attributes = {}) => {
    const element = document.createElement(tag);
    for (const key in attributes) {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'textContent') {
            element.textContent = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
};
