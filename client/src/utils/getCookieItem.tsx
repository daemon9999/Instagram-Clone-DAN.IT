export function getCookieItem(key: string): string {
    const cookieItem = document.cookie.split(';').find(c => c.trim().split('=')[0] === key);

    return cookieItem?.trim().split('=')[1]!;
}
