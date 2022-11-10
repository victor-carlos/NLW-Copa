import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


async function main(): Promise<void> {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: "test@prisma.io",
            avatarUrl: "https://i.pravatar.cc/150?u=a042581f",
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Test Pool',
            code: 'BOL123',
            ownerId: user.id,
            
            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })


    await prisma.game.create({
        data: {
            date: '2022-11-05T17:12:00.757Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-06T17:12:00.757Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                            
                        }
                    }
                }
            }
        }
    })
}

main()