export default function formatNth (n: number) {
    return `${n}${nth(n)}`
}

function nth (n: number) {
    return [, 'st', 'nd', 'rd'][n / 10 % 10 ^ 1 && n % 10] || 'th'
}
