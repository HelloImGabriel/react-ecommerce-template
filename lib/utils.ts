import { NextRequest } from "next/server"

export function getHomeUrl(req: NextRequest): string {
    const protocol = req.nextUrl.protocol;
    const host = req.nextUrl.host;
    return `${protocol}//${host}`;
  }

export function generateRandomString (length: number = 20): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export const sanitizeString = (input: string) => {
    // Permite letras, números y caracteres con acento, eliminando cualquier otro carácter
    return input.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '');
};

export function formatPrice(price: number): string {
    return `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export const removeItemAtIndex = <T>(list: T[], index: number): T[] => {
    if (index < 0 || index >= list.length) {
      throw new Error("Index out of bounds");
    }
    return [...list.slice(0, index), ...list.slice(index + 1)];
};

export const addItemAtIndex = <T>(list: T[], index: number, item: T): T[] => {
    if (index < 0 || index > list.length) {
        throw new Error("Index out of bounds");
    }
    return [...list.slice(0, index), item, ...list.slice(index)];
};