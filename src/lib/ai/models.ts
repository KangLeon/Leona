// Define your models here.

export interface Model {
    id: string
    label: string
    apiIdentifier: string
    description: string
}

export const models: Array<Model> = [
    {
        id: 'deepseek-chat',
        label: 'DeepSeek Chat',
        apiIdentifier: 'deepseek-chat',
        description: 'For complex, multi-step tasks',
    },
    {
        id: 'claude-4-sonnet-20250514',
        label: 'Claude 4 Sonnet',
        apiIdentifier: 'claude-4-sonnet-20250514',
        description: 'Best for coding tasks',
    },
] as const

export const DEFAULT_MODEL_NAME: string = 'deepseek-chat'
export const DEFAULT_MODEL_ID: string = 'deepseek-chat'
export const DEFAULT_MODEL_LABEL: string = 'DeepSeek Chat'
