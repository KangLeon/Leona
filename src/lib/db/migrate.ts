import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

config({
    path: '.env.local',
})

const runMigrate = async () => {
    if (!process.env.POSTGRES_URL) {
        throw new Error('POSTGRES_URL is not defined')
    }

    const connection = postgres(process.env.POSTGRES_URL, { max: 1 })
    const db = drizzle(connection)

    console.log('⏳ 正在运行数据库迁移...')

    try {
        await migrate(db, { migrationsFolder: './src/lib/db/migrations' })
        console.log('✅ 数据库迁移成功')
    } catch (error) {
        console.error('❌ 数据库迁移失败:', error)
        process.exit(1)
    }

    process.exit(0)
}

runMigrate()
