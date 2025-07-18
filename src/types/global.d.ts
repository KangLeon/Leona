// 全局类型声明
declare global {
    interface Window {
        demoPlayer?: {
            destroy: () => void
            loadDemoData: (data: any) => void
            play: () => void
            pause: () => void
            reset: () => void
        }
    }
}

export {}
