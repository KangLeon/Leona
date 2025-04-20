import FuzzyText from '@/components/FuzzyText/FuzzyText'
import StarBorder from '@/components/StarBorder/StarBorder'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">
            <div className="relative flex flex-col items-center justify-center gap-8">
                <FuzzyText
                    fontSize="clamp(4rem, 15vw, 12rem)"
                    baseIntensity={0.2}
                    hoverIntensity={0.6}
                    color="#fff"
                >
                    404
                </FuzzyText>
                <FuzzyText
                    fontSize="clamp(1rem, 4vw, 2rem)"
                    baseIntensity={0.15}
                    hoverIntensity={0.4}
                    color="#888"
                >
                    not found
                </FuzzyText>
            </div>

            <Link
                href="/"
            >
                <StarBorder
                    as="button"
                    className="custom-class"
                    color="cyan"
                    speed="5s"
                >
                    <span className="text-white">Back to Home</span>
                </StarBorder>
            </Link>
        </div>
    )
}