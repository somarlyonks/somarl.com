import Link from 'next/link'

import formatNth from '../../libs/formatNth'
import formatPlural from '../../libs/formatPlural'


interface IProps {
    post: IPostMeta
    collection: IPostMeta[]
}

export default function PostCollection ({post, collection}: IProps) {
    const postIndex = collection.findIndex(p => p.url === post.url)

    return (
        <section className="post-collection">
            <p>
                <small>The {formatNth(postIndex + 1)} of {formatPlural(collection.length, 'post')} in collection </small>
                <Link href={`/collection/${post.collection}`}><a><strong>{post.collection}</strong></a></Link>
            </p>
            <ul>
                {collection.slice(postIndex && postIndex - 1, postIndex + (postIndex ? 2 : 3)).map(collectionPost => (
                    <li className={collectionPost.url === post.url ? 'current' : ''} key={collectionPost.url}>
                        <Link href={collectionPost.url}>{collectionPost.title}</Link>
                    </li>
                ))}
                {!!(collection.length - postIndex > (postIndex ? 2 : 3)) && (<li><small>...</small></li>)}
            </ul>
        </section>
    )
}
