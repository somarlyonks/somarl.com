/// <reference types="react" />

declare module '@userfront/react' {
    class Userfront {
        static init (tenantId: string): void

        static build (options: {
            toolId: string
        }): () => JSX.Element

        static logout (): void

        static tokens: {
            accessTokenName: string
        }

        static user: {
            mode: string
            tenantId: string
            userId: number
            userUuid: string
            email: string
            name: string
            image: string // "https://res.cloudinary.com/component/image/upload/avatars/avatar-plain-9.png"
            username: string,
            confirmedAt: string,
            isConfirmed: true,
            createdAt: string,
            updatedAt: string,

            hasRole (role: string): boolean
        }
    }

    export = Userfront
}
