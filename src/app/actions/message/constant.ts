import { z } from 'zod'

export const ttsRequestSchema = z.object({
    text: z.string(),
    voiceId: z.string().default('Grinch'),
    speed: z.number().default(1),
    vol: z.number().default(1),
    pitch: z.number().default(0),
})

export type TTSResponse = {
    status: 'success' | 'failed'
    audioUrl?: string
    error?: string
}

export function generateAudioName(messageId: string): string {
    return `audio_${messageId}`
}
