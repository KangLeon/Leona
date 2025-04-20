import ASCIIText from '@/components/AsciiText'

export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">
            <div className="relative flex flex-col items-center justify-center gap-8">
                <ASCIIText
                    text='Hello There!'
                    enableWaves={true}
                    asciiFontSize={8}
                />
            </div>
        </div>
    )
}