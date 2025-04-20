import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 px-5 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-3">Leona</h2>
                <p className="text-gray-400 mb-6">
                    AI Summary Assistant Tailored for Non-Native Speakers
                </p>
                <div className="flex justify-center gap-6 mb-6">
                    <Link
                        href="/intro/privacy"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/intro/terms"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/intro/contact"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Contact
                    </Link>
                </div>
                <p className="text-sm text-gray-400">
                    © 2024 Leona. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
