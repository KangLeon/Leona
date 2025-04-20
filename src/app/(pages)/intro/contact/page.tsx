export default function ContactPage() {
    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-4xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4 text-lg">
                            <p>
                                <span className="font-medium">Email: </span>
                                <a href="mailto:contact@Leona.com" className="text-blue-400 hover:text-blue-300">
                                    contact@Leona.com
                                </a>
                            </p>
                            <p>
                                <span className="font-medium">Business Hours: </span>
                                <span className="text-gray-300">Monday to Friday 9:00-18:00</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
                        <p className="text-gray-300 text-lg mb-4">
                            We value your opinions and suggestions. If you encounter any issues or have any suggestions for improvement, please feel free to contact us.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-lg mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
                                    placeholder="Please enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
                                    placeholder="Please enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full p-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
                                    placeholder="Please enter your message"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </section>
            </main>
        </div>
    );
}
