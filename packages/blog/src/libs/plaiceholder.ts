import {getPlaiceholder} from 'plaiceholder'
import type {Node} from 'unist'
import type {Plugin} from 'unified'
import {visit} from 'unist-util-visit'


type ImageNode = {
    type: 'element'
    tagName: 'img'
    properties: {
        src: string
        height?: number
        width?: number
        blurDataURL?: string
        placeholder?: 'blur' | 'empty'
    }
}

type PostFigureNode = {
    type: 'mdxJsxFlowElement'
    name: 'PostFigure'
    attributes: Array<{
        type: 'mdxJsxAttribute'
        name: string
        value: ANY
    }>
}

async function editImageNode (node: ImageNode): Promise<void> {
    const {base64, img} = await getPlaiceholder(decodeURI(node.properties.src))

    node.properties.width = img.width
    node.properties.height = img.height

    node.properties.blurDataURL = base64
    node.properties.placeholder = 'blur'
}

async function editPostFigureNode (node: PostFigureNode): Promise<void> {
    const srcAttribute = node.attributes.find(({name}) => name === 'src')

    if (!srcAttribute) return
    const {base64, img} = await getPlaiceholder(decodeURI(srcAttribute.value))

    node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'width',
        value: img.width,
    })
    node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'height',
        value: img.height,
    })
    node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'blurDataURL',
        value: base64,
    })
    node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'placeholder',
        value: 'blur',
    })
}

export const rehypePlaiceholder: Plugin = () => {
    function isImageNode (node: Node): node is ImageNode {
        const img = node as ImageNode
        return (
            img.type === 'element' &&
            img.tagName === 'img' &&
            img.properties &&
            typeof img.properties.src === 'string'
        )
    }

    function isPostFigureNode (node: Node): node is PostFigureNode {
        const img = node as PostFigureNode
        return (
            img.type === 'mdxJsxFlowElement' &&
            img.name === 'PostFigure' &&
            !!img.attributes.find(({type, name}) => type === 'mdxJsxAttribute' && name === 'src')
        )
    }

    return async tree => {
        const images: ImageNode[] = []
        const postFigureNodes: PostFigureNode[] = []

        visit(tree, 'mdxJsxFlowElement', node => {
            if (isPostFigureNode(node)) postFigureNodes.push(node)
        })

        visit(tree, 'element', node => {
            if (isImageNode(node)) images.push(node)
        })

        await Promise.all([
            Promise.all(images.map(editImageNode)),
            Promise.all(postFigureNodes.map(editPostFigureNode)),
        ])

        return tree
    }
}
