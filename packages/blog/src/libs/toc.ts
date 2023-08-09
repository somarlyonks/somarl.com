import {toc} from 'mdast-util-toc'
import type {Plugin} from 'unified'
import type {Root} from 'mdast-util-toc/node_modules/@types/mdast'


export const remarkToc: Plugin<void[], Root> = () => {
    return node => {
        const result = toc(
            node,
            Object.assign({}, {
                heading: 'toc|table[ -]of[ -]contents?',
            })
        )

        if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
        ) {
            return
        }

        node.children = [
            {
                type: 'html',
                value: '<svg id="tocanchor">',
            },
            ...node.children.slice(0, result.index),
            {
                type: 'html',
                value: '<svg id="tocmark" xmlns="http://www.w3.org/2000/svg"><path /></svg>',
            },
            result.map,
            ...node.children.slice(result.endIndex),
        ]
    }
}
