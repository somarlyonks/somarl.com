type MomentPostType = 'quote' | 'picture' | 'video'

interface IMomentPost {
    type: MomentPostType
    published: Date
    abstract: string
    cover?: string
    extraInfo: Record<string, string>
}
