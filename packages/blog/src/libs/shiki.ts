import {HighlighterOptions, Lang, Highlighter, getHighlighter as getShikiHighlighter} from 'shiki'
import type {Plugin} from 'unified'
import type {Node as MdastNode} from 'unist'
import {visit} from 'unist-util-visit'
import {raw} from 'hast-util-raw'


type ISchemedThemeOptions = (Omit<HighlighterOptions, 'theme'> & {
    darkTheme?: string
    lightTheme?: string
})

type IOptions = HighlighterOptions | ISchemedThemeOptions

interface ICodeNode extends MdastNode {
    lang: string | undefined
    value: string
    // meta
}

export const remarkShiki: Plugin<[IOptions?]> = options => {
    function isSchemedOptions (highlighterOptions: IOptions): highlighterOptions is ISchemedThemeOptions {
        return Reflect.has(highlighterOptions, 'darkTheme') && Reflect.has(highlighterOptions, 'lightTheme')
    }

    const resultPattern = new RegExp('<pre(.+?)>')

    function highlight (highlighter: Highlighter, input: string, lang?: string, scheme?: 'light' | 'dark') {
        const loadedLanguages = highlighter.getLoadedLanguages()
        const code = highlighter.codeToHtml(input, {
            lang: loadedLanguages.includes(lang as Lang) ? lang : undefined,
        })
        return code.replace(resultPattern, `<pre class="scheme--${scheme}">`)
    }

    async function getHighlighter (highlighterOptions: IOptions = {}) {
        if (isSchemedOptions(highlighterOptions)) {
            const lightHighlighter = await getShikiHighlighter({theme: highlighterOptions.lightTheme})
            const darkHighlighter = await getShikiHighlighter({theme: highlighterOptions.darkTheme})

            return (input: string, lang?: string) => {
                const lightCode = highlight(lightHighlighter, input, lang, 'light')
                const darkCode = highlight(darkHighlighter, input, lang, 'dark')
                return `<figure role="pre">
    ${lightCode}
    ${darkCode}
    ${lang ? `<figcaption>${lang}</figcaption>` : ''}
</figure>`
            }
        } else {
            const highlighter = await getShikiHighlighter({theme: highlighterOptions.theme})

            return (input: string, lang?: string) => highlight(highlighter, input, lang)
        }
    }

    return async tree => {
        const highlighter = await getHighlighter(options)

        visit(tree, 'code', (node: ICodeNode, index, parent) => {
            node.value = highlighter(node.value, node.lang)
            node.type = 'html'
            node.data = {
                from: 'remarkShiki',
            }
        })
    }
}


/**
 * @description Remember that this deals with all **raw** mdast nodes,
 * it works just because it's the only remark plugin returns raw nodes
 */
export const rehypeShiki: Plugin<[IOptions?]> = () => {
    return async tree => {
        visit(tree, 'raw', (node: ICodeNode, index, parent) => {
            const newNode = raw(node)
            for (const key in newNode) {
                node[key] = newNode[key]
            }
        })
    }
}
