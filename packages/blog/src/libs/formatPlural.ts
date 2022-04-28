export default function formatPlural (x: number, suffix: string, pluralSuffix?: string) {
    const formatedSuffix = suffixPlural(x, suffix, pluralSuffix)
    return `${x} ${formatedSuffix}`
}

function suffixPlural (x: number, suffix: string, pluralSuffix?: string) {
    const rule = new Intl.PluralRules()
    if (rule.select(x) === 'one') return suffix
    return pluralSuffix || (suffix + 's')
}
