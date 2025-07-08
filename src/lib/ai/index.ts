import { openai } from '@ai-sdk/openai'
import { wrapLanguageModel } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { xai } from '@ai-sdk/xai'
import { customMiddleware } from './custom-middleware'

export const customModel = (apiIdentifier: string) => {
    if (apiIdentifier === 'deepseek-chat') {
        return wrapLanguageModel({
            model: deepseek(apiIdentifier),
            middleware: customMiddleware,
        })
    } else if (apiIdentifier === 'claude-3-5-sonnet') {
        return wrapLanguageModel({
            model: openai(apiIdentifier),
            middleware: customMiddleware,
        })
    } else if (apiIdentifier === 'grok') {
        return wrapLanguageModel({
            model: xai(apiIdentifier),
            middleware: customMiddleware,
        })
    } else if (apiIdentifier === 'gpt-4o') {
        return wrapLanguageModel({
            model: openai.responses(apiIdentifier),
            middleware: customMiddleware,
        })
    } else {
        return wrapLanguageModel({
            model: openai(apiIdentifier),
            middleware: customMiddleware,
        })
    }
}
