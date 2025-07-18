import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { wrapLanguageModel } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { customMiddleware } from './custom-middleware'

export const defaultModel = wrapLanguageModel({
    model: deepseek('deepseek-chat'),
    middleware: customMiddleware,
})
export const customModel = (apiIdentifier: string) => {
    if (apiIdentifier === 'deepseek-chat') {
        return wrapLanguageModel({
            model: deepseek(apiIdentifier),
            middleware: customMiddleware,
        })
    } else if (apiIdentifier === 'claude-4-sonnet-20250514') {
        return wrapLanguageModel({
            model: anthropic(apiIdentifier),
            middleware: customMiddleware,
        })
    } else {
        return wrapLanguageModel({
            model: openai(apiIdentifier),
            middleware: customMiddleware,
        })
    }
}
