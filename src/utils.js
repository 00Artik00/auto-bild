/**
 * Возвращает разметку с текстом ошибки
 * @param {string} text 
 * @returns {HTMLElement} html разметка
 */
export const formatError = text => `
<span style="color: red;">
    ${text} 
</span> 
`;