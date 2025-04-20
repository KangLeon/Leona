import { InferSelectModel } from 'drizzle-orm'
import {
    json,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

// 用户
export const user = pgTable('User', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    email: varchar('email', { length: 64 }).notNull(),
    name: varchar('name', { length: 64 }).default(''),
    password: varchar('password', { length: 64 }),
})

export type User = InferSelectModel<typeof user>

// 聊天
export const chat = pgTable('Chat', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    userId: uuid('userId')
        .notNull()
        .references(() => user.id),
    modelId: varchar('modelId', { length: 64 }).notNull(),
})

export type Chat = InferSelectModel<typeof chat>

// 消息
export const message = pgTable('Message', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    chatId: uuid('chatId')
        .notNull()
        .references(() => chat.id),
    role: varchar('role').notNull(),
    parts: json('parts').notNull(),
    attachments: json('attachments').notNull(),
    createdAt: timestamp('createdAt').notNull(),
})

export type Message = InferSelectModel<typeof message>
