export default function PrivacyPage() {
    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-4xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-gray-300 leading-relaxed">
                            At Leona, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you use our AI Summary practice platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li>Name and email address when you create an account</li>
                                    <li>Profile information you provide</li>
                                    <li>Payment information when subscribing to our services</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li>Summary recordings and transcripts</li>
                                    <li>Performance analytics and practice history</li>
                                    <li>Platform interaction data</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>To provide and maintain our Summary practice service</li>
                            <li>To improve our AI models and Summary feedback systems</li>
                            <li>To communicate with you about service updates and changes</li>
                            <li>To process your payments and manage your subscription</li>
                            <li>To analyze usage patterns and improve user experience</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We implement appropriate technical and organizational security measures to protect
                            your personal information from unauthorized access, disclosure, or destruction.
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Strict access controls and authentication measures</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Access your personal information</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for data processing</li>
                            <li>Export your data in a portable format</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have any questions about this Privacy Policy or our data practices, please
                            contact us at:
                        </p>
                        <div className="mt-4">
                            <a href="mailto:privacy@Leona.com" className="text-blue-400 hover:text-blue-300">
                                privacy@Leona.com
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
