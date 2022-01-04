
import PostStyle from './PostStyle'


export default function ImgShadow ({}) {
    return (
        <PostStyle styles={[
            `img {
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }`,
        ]} />
    )
}
