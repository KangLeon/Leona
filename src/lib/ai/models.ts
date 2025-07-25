// Define your models here.

export interface Model {
    id: string
    label: string
    apiIdentifier: string
    description: string
}

export const models: Array<Model> = [
    {
        id: 'gpt-4o-mini',
        label: 'GPT 4o mini',
        apiIdentifier: 'gpt-4o-mini',
        description: 'Small model for fast, lightweight tasks',
    },
    {
        id: 'deepseek-chat',
        label: 'DeepSeek Chat',
        apiIdentifier: 'deepseek-chat',
        description: 'For complex, multi-step tasks',
    },
    {
        id: 'gpt-4o',
        label: 'GPT 4o',
        apiIdentifier: 'gpt-4o',
        description: 'For complex, multi-step tasks',
    },
    {
        id: 'grok',
        label: 'grok',
        apiIdentifier: 'grok',
        description: 'For complex, multi-step tasks',
    },
    {
        id: 'claude-3-5-sonnet',
        label: 'Claude 3.5 Sonnet',
        apiIdentifier: 'claude-3-5-sonnet',
        description: 'Best for coding tasks',
    },
] as const

export const DEFAULT_MODEL_NAME: string = 'deepseek-chat'
