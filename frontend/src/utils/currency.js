/**
 * Currency utility for Tanzania Shillings (TZS)
 */

/**
 * Formats a number as Tanzania Shillings.
 * Example: formatTZS(25000) => "TZS 25,000"
 */
export const formatTZS = (amount) => {
    const num = parseFloat(amount) || 0;
    return `TZS ${num.toLocaleString('en-TZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const CURRENCY_SYMBOL = 'TZS';
