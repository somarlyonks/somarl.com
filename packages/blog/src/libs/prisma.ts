import {PrismaClient} from '@prisma/client'

export async function fetchPrisma<T> (f: F1<PrismaClient, T>): Promise<T> {
    const prisma = new PrismaClient()
    try {
        return f(prisma)
    } finally {
        await prisma.$disconnect()
    }
}
