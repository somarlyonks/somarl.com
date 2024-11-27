export default function formatNth (n: number) {
    return `${n}${nth(n)}`
}

function nth (n: number) {
    // eslint-disable-next-line no-sparse-arrays
    return [, 'st', 'nd', 'rd'][n / 10 % 10 ^ 1 && n % 10] || 'th'
}
