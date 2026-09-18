/**
 * Prices in your admin are free text like "2 400 DA" so shop owners can
 * write them naturally. These helpers pull the number out for cart math,
 * and format numbers back the same way for display.
 */

export function parsePrice(priceText) {
    if (!priceText) return 0
    const digitsOnly = String(priceText).replace(/[^\d]/g, '')
    return digitsOnly ? parseInt(digitsOnly, 10) : 0
}

export function formatPrice(amount) {
    const rounded = Math.round(amount)
    return `${rounded.toLocaleString('en-US').replace(/,/g, ' ')} DA`
}