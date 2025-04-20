export default function FeaturesPage() {
    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-6xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-12 text-center">Our Features</h1>

                <section className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">AI-Powered Summary Practice</h2>
                            <p className="text-gray-300 text-lg">
                                Experience realistic Summary scenarios with our advanced AI technology.
                                Practice answering common Summary questions and receive instant feedback
                                to improve your performance.
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-lg border border-white/10">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Real-time speech recognition
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Natural conversation flow
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Customizable Summary scenarios
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="order-2 md:order-1 bg-zinc-900/50 p-8 rounded-lg border border-white/10">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Detailed performance analytics
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Pronunciation feedback
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Speaking pace analysis
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-2xl font-bold mb-4">Comprehensive Feedback System</h2>
                            <p className="text-gray-300 text-lg">
                                Get detailed insights into your Summary performance. Our system analyzes
                                your responses, speaking patterns, and provides actionable feedback for improvement.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Industry-Specific Training</h2>
                            <p className="text-gray-300 text-lg">
                                Practice with Summary questions tailored to your industry. From tech to
                                finance, healthcare to education, we&apos;ve got you covered with relevant scenarios.
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-lg border border-white/10">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Industry-specific questions
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Role-based scenarios
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    Regular content updates
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
                        <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-lg font-bold">
                            Start Free Trial
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
