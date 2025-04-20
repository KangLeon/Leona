export default function TermsPage() {
    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-4xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            By accessing and using Leona&apos;s AI Summary practice platform, you agree to be bound
                            by these Terms of Service. If you disagree with any part of these terms, you may not
                            access our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Leona provides an AI-powered Summary practice platform designed to help users improve
                            their Summary skills. Our services include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>AI-powered mock Summarys</li>
                            <li>Performance analysis and feedback</li>
                            <li>Practice session recordings</li>
                            <li>Summary preparation resources</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                When creating an account, you must provide accurate and complete information. You are
                                responsible for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Maintaining the security of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized access</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Subscription and Payments</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                Some features of our service require a paid subscription. By choosing a paid plan, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Pay all fees according to your selected plan</li>
                                <li>Provide accurate billing information</li>
                                <li>Automatic renewal unless cancelled in advance</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            You agree not to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Share account access with others</li>
                            <li>Use the service for any illegal purposes</li>
                            <li>Attempt to bypass any security measures</li>
                            <li>Upload harmful content or malware</li>
                            <li>Violate any intellectual property rights</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The service and its original content, features, and functionality are owned by Leona
                            and are protected by international copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may terminate or suspend your account and access to the service immediately, without
                            prior notice, for conduct that we believe violates these Terms or is harmful to other
                            users, us, or third parties, or for any other reason.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. We will provide
                            notice of any significant changes. Continued use of the service after such modifications
                            constitutes acceptance of the updated Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <div className="mt-4">
                            <a href="mailto:legal@Leona.com" className="text-blue-400 hover:text-blue-300">
                                legal@Leona.com
                            </a>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Last updated: March 2024
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
