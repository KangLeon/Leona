export default function AboutPage() {
    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-4xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-8">About Leona</h1>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-300 text-lg">
                            Leona is dedicated to helping job seekers improve their Summary skills through AI-assisted mock Summarys. We believe that through continuous practice and feedback, everyone can present their best selves in Summarys.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Leona</h2>
                        <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
                            <li>Intelligent AI Summaryer providing realistic Summary experiences</li>
                            <li>Detailed feedback and suggestions to help you continuously improve</li>
                            <li>Flexible practice time, enhance your skills anytime, anywhere</li>
                            <li>Coverage of Summary scenarios across multiple industries</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-300 text-lg">
                            If you have any questions or suggestions, please feel free to contact us at:
                            <br />
                            Email: <a href="mailto:contact@Leona.com" className="text-blue-400 hover:text-blue-300">contact@Leona.com</a>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
