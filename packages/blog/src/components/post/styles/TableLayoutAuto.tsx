
import PostStyle from './PostStyle'


export default function Component ({}) {
    return (
        <PostStyle styles={[
            `table {
                table-layout: auto;
            }`,
            `> div table {
                table-layout: auto;
            }`,
        ]} />
    )
}
