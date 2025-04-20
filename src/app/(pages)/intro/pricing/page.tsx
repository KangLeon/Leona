'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'


export default function PricingPage() {
    const [isLoading, setIsLoading] = useState(false)

    // 选择pro计划
    const handleChooseProPlan = async () => {
        setIsLoading(true)
        // 1. 获取当前时间
        // 2. 创建支付会话s
        // 3. 跳转到支付页面

        setIsLoading(false)
    }

    return (
        <div className="bg-black pt-20 min-h-screen w-full">
            <main className="p-8 max-w-6xl mx-auto pt-24 text-white">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
                    Choose the plan that best fits your needs. Start with our free
                    tier and upgrade anytime as you grow.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Free Plan */}
                    <div className="border border-white/10 rounded-lg p-8 flex flex-col bg-zinc-900/50">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Free Trial</h2>
                            <p className="text-gray-300 mb-4">
                                Perfect for trying out our platform
                            </p>
                            <div className="text-3xl font-bold mb-2">$0</div>
                            <p className="text-gray-300">No credit card required</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>1 Free
                                Mock Summarys
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>10
                                Questions per Summary
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Basic AI Feedback
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Standard Question Bank
                            </li>
                        </ul>
                        <button
                            className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            onClick={handleChooseProPlan}
                            disabled={isLoading}
                        >
                            <span>Start Free Trial</span>
                            {isLoading && (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            )}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="border-2 border-white rounded-lg p-8 flex flex-col relative bg-zinc-900/50">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-white text-black px-4 py-1 rounded-full text-sm">
                                Most Popular
                            </span>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
                            <p className="text-gray-300 mb-4">
                                For serious Summary preparation
                            </p>
                            <div className="text-3xl font-bold mb-2">$29</div>
                            <p className="text-gray-300">per month</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                100 Summarys per Month
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Advanced AI Models
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Detailed Performance Analytics
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Industry-Specific Questions
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 mr-2">✓</span>
                                Priority Support
                            </li>
                        </ul>
                        <button
                            className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            onClick={handleChooseProPlan}
                            disabled={isLoading}
                        >
                            <span>Choose Pro Plan</span>
                            {isLoading && (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-4">
                        Frequently Asked Questions
                    </h3>
                    <div className="max-w-3xl mx-auto space-y-6 mt-8">
                        <div className="text-left">
                            <h4 className="font-bold mb-2">
                                Can I switch plans later?
                            </h4>
                            <p className="text-gray-300">
                                Yes, you can upgrade or downgrade your plan at any
                                time. Changes will be reflected in your next billing
                                cycle.
                            </p>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold mb-2">
                                What payment methods do you accept?
                            </h4>
                            <p className="text-gray-300">
                                We accept all major credit cards, PayPal, and bank
                                transfers for enterprise customers.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
