'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Aurora from '@/components/Aurora'
import ShinyText from '@/components/ShinyText/ShinyText'
import GridDistortion from '@/components/GridDistortion'
import InfiniteScrollColumn, {
    fadeInUpVariant,
    staggerContainer,
    testimonials,
} from '@/components/InfiniteScrollColumn'
import RotatingText from '@/components/RotatingText'
import StarBorder from '@/components/StarBorder/StarBorder'
import Footer from '@/components/Footer'

export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const startFreeTrial = () => {
        setIsLoading(true)
        router.push('/chat')
    }

    // 选择pro计划
    const handleChooseProPlan = async () => {}

    return (
        <div className="min-h-screen flex flex-col bg-black text-white relative">
            <div className="fixed inset-0 z-0">
                <Aurora
                    colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>
            <div className="fixed inset-0 z-10">
                <GridDistortion
                    imageSrc="https://picsum.photos/1920/1080?grayscale"
                    grid={10}
                    mouse={0.1}
                    strength={0.15}
                    relaxation={0.9}
                    className="custom-class"
                />
            </div>

            <div className="relative z-20 mt-60 pointer-events-none">
                {/* 介绍入口 */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUpVariant}
                    className="flex-1 pt-36 md:pt-44 pb-16 md:pb-24 px-5"
                >
                    <div className="max-w-6xl mx-auto pointer-events-auto">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                    Leona
                                </h1>
                                <RotatingText
                                    texts={[
                                        'Summary',
                                        'Improver',
                                        'Practice',
                                        'Partner',
                                    ]}
                                    mainClassName="inline-flex px-2 sm:px-2 font-bold text-4xl md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                    staggerFrom={'last'}
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-120%' }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{
                                        type: 'spring',
                                        damping: 30,
                                        stiffness: 400,
                                    }}
                                    rotationInterval={2000}
                                />
                            </div>
                            <p className="text-white/90 text-lg leading-relaxed mb-8">
                                Our AI-powered platform lets you summarize text,
                                articles, and more.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => router.push('/chat')}
                                    className="px-6 py-2.5 text-lg font-bold bg-gradient-to-r from-black   to-black text-white rounded-full hover:from-black hover:to-black transition-all duration-300 shadow-lg hover:shadow-black/25"
                                >
                                    <ShinyText text="Start for Free" />
                                </button>
                                <button className="px-6 py-2.5 border text-lg font-bold border-white/20 text-gray-400 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 选择理由 */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    id="features"
                    className="py-20 my-40 md:py-24 px-5"
                >
                    <motion.div
                        variants={fadeInUpVariant}
                        className="pointer-events-auto"
                    >
                        <motion.div
                            variants={fadeInUpVariant}
                            className="flex flex-col items-center justify-center"
                        >
                            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                Better than any other summary tool
                            </h2>
                            <h3 className="text-2xl font-bold text-center mb-16 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                Summary, Improver, Practice, Partner
                            </h3>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        >
                            <motion.div variants={fadeInUpVariant}>
                                <StarBorder
                                    as="button"
                                    className="custom-class"
                                    color="cyan"
                                    speed="5s"
                                >
                                    <div className="rounded-3xl p-8 h-[500px] relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <h3 className="text-2xl font-bold mb-4">
                                            Multi-Model Intelligence
                                        </h3>
                                        <p className="text-gray-400">
                                            Switch seamlessly between leading AI
                                            models like GPT-4, Claude, and more.
                                            Choose the perfect model for your
                                            summarization needs.
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-center justify-center">
                                            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                                        </div>
                                    </div>
                                </StarBorder>
                            </motion.div>

                            <motion.div variants={fadeInUpVariant}>
                                <StarBorder
                                    as="button"
                                    className="custom-class"
                                    color="cyan"
                                    speed="5s"
                                >
                                    <div className="rounded-3xl p-8 h-[500px] relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <h3 className="text-2xl font-bold mb-4">
                                            Lightning Fast
                                        </h3>
                                        <p className="text-gray-400">
                                            Instantly summarize articles, URLs,
                                            and documents. Our optimized
                                            processing ensures you get concise
                                            summaries in seconds, not minutes.
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-center justify-center">
                                            <div className="grid grid-cols-2 gap-2 transform group-hover:rotate-12 transition-transform duration-500">
                                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                                                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
                                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg"></div>
                                                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </StarBorder>
                            </motion.div>

                            <motion.div variants={fadeInUpVariant}>
                                <StarBorder
                                    as="button"
                                    className="custom-class"
                                    color="cyan"
                                    speed="5s"
                                >
                                    <div className="rounded-3xl p-8 h-[500px] relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <h3 className="text-2xl font-bold mb-4">
                                            Smart Customization
                                        </h3>
                                        <p className="text-gray-400">
                                            Customize summary length, style, and
                                            focus areas. Perfect for research,
                                            content creation, or quick
                                            information digestion.
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                    </div>
                                </StarBorder>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>

                {/* 社交证明 */}
                <section
                    id="social-proof"
                    className="my-20 py-20 md:py-24 relative"
                >
                    <div className="pointer-events-auto">
                        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            User Testimonials
                        </h2>
                        <h3 className="text-2xl font-bold text-center mb-16 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            What our users say
                        </h3>
                        <div className="max-w-6xl mx-auto h-[600px] relative">
                            {/* 滚动列 */}
                            <div className="grid grid-cols-3 gap-8 h-full shadow-black">
                                <InfiniteScrollColumn
                                    items={testimonials}
                                    speed={0.04}
                                    direction="up"
                                />
                                <InfiniteScrollColumn
                                    items={testimonials}
                                    speed={0.04}
                                    direction="down"
                                />
                                <InfiniteScrollColumn
                                    items={testimonials}
                                    speed={0.04}
                                    direction="up"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 价格 */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    id="pricing"
                    className="py-20 md:py-24 px-5 bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        variants={fadeInUpVariant}
                        className="pointer-events-auto"
                    >
                        <h2 className="text-3xl font-bold text-center mb-16">
                            Flexible Pricing
                        </h2>
                        <motion.div
                            variants={staggerContainer}
                            className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
                        >
                            <motion.div
                                variants={staggerContainer}
                                className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
                            >
                                {/* Free Plan */}
                                <motion.div
                                    variants={fadeInUpVariant}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="border border-white/10 rounded-lg p-8 flex flex-col bg-white/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-white/10 transition-shadow"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">
                                            Free Trial
                                        </h2>
                                        <p className="text-white/70 mb-4">
                                            Perfect for trying out our platform
                                        </p>
                                        <div className="text-3xl font-bold mb-2">
                                            $0
                                        </div>
                                        <p className="text-white/70">
                                            No credit card required
                                        </p>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-1">
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            1 Free Mock Summarys
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            10 Questions per Summary
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Basic AI Feedback
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Standard Question Bank
                                        </li>
                                    </ul>
                                    <button
                                        className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        onClick={startFreeTrial}
                                        disabled={isLoading}
                                    >
                                        <span>Start Free Trial</span>
                                        {isLoading && (
                                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                        )}
                                    </button>
                                </motion.div>

                                {/* Pro Plan */}
                                <motion.div
                                    variants={fadeInUpVariant}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="border-2 border-white/20 rounded-lg p-8 flex flex-col relative bg-white/10 backdrop-blur-sm hover:shadow-2xl hover:shadow-white/10 transition-shadow"
                                >
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">
                                            Pro Plan
                                        </h2>
                                        <p className="text-white/70 mb-4">
                                            For serious Summary preparation
                                        </p>
                                        <div className="text-3xl font-bold mb-2">
                                            $29
                                        </div>
                                        <p className="text-white/70">
                                            per month
                                        </p>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-1">
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            100 Summarys per Month
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Advanced AI Models
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Detailed Performance Analytics
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Industry-Specific Questions
                                        </li>
                                        <li className="flex items-center text-white/90">
                                            <span className="text-emerald-400 mr-2">
                                                ✓
                                            </span>
                                            Priority Support
                                        </li>
                                    </ul>
                                    <button
                                        className="w-full px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        onClick={handleChooseProPlan}
                                        disabled={isLoading}
                                    >
                                        <span>Choose Pro Plan</span>
                                        {isLoading && (
                                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                        )}
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>

                <Footer />
            </div>
        </div>
    )
}
