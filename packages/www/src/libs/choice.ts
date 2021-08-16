export default function choice<T> (choices: T[]) {
    return choices[Math.random() * choices.length | 0]
}
