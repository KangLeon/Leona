"use client"
import React from "react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { cn } from "@/lib/utils"

// 正确定义组件的 Props 类型
interface MarkdownRendererProps {
    content: string
    className?: string
}

export function Markdown({ content, className }: MarkdownRendererProps) {
    return (
        <div className={cn("markdown-renderer prose dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // 标题样式
                    h1: ({ className, children, ...props }) => (
                        <h1 {...props} className={cn("text-2xl font-bold mt-6 mb-4", className)}>
                            {children}
                        </h1>
                    ),
                    h2: ({ className, children, ...props }) => (
                        <h2 {...props} className={cn("text-xl font-bold mt-5 mb-3", className)}>
                            {children}
                        </h2>
                    ),
                    h3: ({ className, children, ...props }) => (
                        <h3 {...props} className={cn("text-lg font-bold mt-4 mb-2", className)}>
                            {children}
                        </h3>
                    ),
                    h4: ({ className, children, ...props }) => (
                        <h4 {...props} className={cn("text-base font-bold mt-3 mb-2", className)}>
                            {children}
                        </h4>
                    ),

                    // 段落样式
                    p: ({ className, children, ...props }) => (
                        <p {...props} className={cn("my-1", className)}>
                            {children}
                        </p>
                    ),

                    // 列表样式
                    ul: ({ className, children, ...props }) => (
                        <ul {...props} className={cn("list-disc pl-6 my-1", className)}>
                            {children}
                        </ul>
                    ),
                    ol: ({ className, children, ...props }) => (
                        <ol {...props} className={cn("list-decimal pl-6 my-1", className)}>
                            {children}
                        </ol>
                    ),
                    li: ({ className, children, ...props }) => (
                        <li {...props} className={cn("my-1", className)}>
                            {children}
                        </li>
                    ),

                    // 链接样式
                    a: ({ className, children, ...props }) => (
                        <a
                            {...props}
                            className={cn("text-blue-400 hover:underline", className)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),

                    // 表格样式
                    table: ({ className, children, ...props }) => (
                        <div className="overflow-x-auto my-4">
                            <table {...props} className={cn("min-w-full border-collapse border border-gray-300", className)}>
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ className, children, ...props }) => (
                        <thead {...props} className={cn("bg-gray-100", className)}>
                            {children}
                        </thead>
                    ),
                    tbody: ({ className, children, ...props }) => (
                        <tbody {...props} className={className}>
                            {children}
                        </tbody>
                    ),
                    tr: ({ className, children, ...props }) => (
                        <tr {...props} className={cn("border-b border-gray-300", className)}>
                            {children}
                        </tr>
                    ),
                    th: ({ className, children, ...props }) => (
                        <th {...props} className={cn("px-4 py-2 text-left font-semibold", className)}>
                            {children}
                        </th>
                    ),
                    td: ({ className, children, ...props }) => (
                        <td {...props} className={cn("px-4 py-2", className)}>
                            {children}
                        </td>
                    ),

                    // 引用样式
                    blockquote: ({ className, children, ...props }) => (
                        <blockquote
                            {...props}
                            className={cn(
                                "border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700 dark:text-gray-300",
                                className
                            )}
                        >
                            {children}
                        </blockquote>
                    ),

                    // 代码块样式
                    code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "")
                        const language = match ? match[1] : ""

                        if (!className) {
                            // 内联代码
                            return (
                                <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
                                    {children}
                                </code>
                            )
                        }

                        // 代码块
                        return (
                            <pre className="relative my-4 rounded-md overflow-hidden">
                                <div className="flex items-center justify-between bg-gray-800 px-4 py-1 text-xs text-gray-200">
                                    <span>{language || "code"}</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(String(children).replace(/\n$/, ""))
                                        }}
                                        className="text-xs text-gray-200 hover:text-white"
                                    >
                                        复制
                                    </button>
                                </div>
                                <SyntaxHighlighter
                                    {...props}
                                    style={vscDarkPlus}
                                    language={language}
                                    PreTag="div"
                                    ref={undefined}
                                    className="!m-0 !rounded-t-none"
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </pre>
                        )
                    },

                    // 水平线样式
                    hr: ({ className, ...props }) => (
                        <hr {...props} className={cn("my-6 border-t border-gray-300", className)} />
                    ),

                    // 图片样式
                    img: ({ className, alt, src, ...props }) => {
                        if (!src || typeof src !== 'string') return null
                        return (
                            <Image
                                {...props}
                                src={src}
                                alt={alt || "Image"}
                                width={800}
                                height={400}
                                className={cn("max-w-full h-auto rounded-md my-4", className)}
                                loading="lazy"
                            />
                        )
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}