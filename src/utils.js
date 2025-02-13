export async function sleep(seconds) {
    await new Promise(r => setTimeout(r, seconds * 1000));
}

export function toCamelCase(snakeCase) {
    return snakeCase.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function toSnakeCase(camelCase) {
    return camelCase.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function enterToBR(val) {
    return val.replace(/\n/g, '<br>');
}