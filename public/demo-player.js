// 独立的演示播放器，基于 content.js 的回放逻辑
class DemoPlayer {
    constructor() {
        this.recordingData = null
        this.actions = []
        this.currentIndex = 0
        this.isPlaying = false
        this.isPaused = false
        this.playbackSpeed = 1
        this.timer = null
        this.playerPanel = null

        this.setupMessageListener()
        console.log('🎬 DemoPlayer 初始化完成')
    }

    setupMessageListener() {
        window.addEventListener('message', (event) => {
            console.log('🎬 DemoPlayer 收到消息:', event.data)

            switch (event.data.type) {
                case 'LOAD_DEMO_DATA':
                    this.loadDemoData(event.data.demoData)
                    break
                case 'START_DEMO':
                    this.play()
                    break
                case 'PAUSE_DEMO':
                    this.pause()
                    break
                case 'RESET_DEMO':
                    this.reset()
                    break
                case 'DESTROY_DEMO':
                    this.destroy()
                    break
            }
        })

        // 通知父窗口播放器已准备就绪
        window.parent.postMessage(
            {
                type: 'DEMO_PLAYER_READY',
            },
            '*'
        )
    }

    loadDemoData(demoData) {
        this.recordingData = demoData
        this.actions = demoData.actions || []
        this.currentIndex = 0

        this.createPlayerUI()

        console.log('🎬 演示数据已加载:', this.actions.length, '个动作')

        // 通知父窗口数据已加载
        window.parent.postMessage(
            {
                type: 'DEMO_DATA_LOADED',
                actionCount: this.actions.length,
            },
            '*'
        )
    }

    createPlayerUI() {
        // 移除已存在的播放器
        const existingPlayer = document.getElementById('demo-player-ui')
        if (existingPlayer) {
            existingPlayer.remove()
        }

        this.playerPanel = document.createElement('div')
        this.playerPanel.id = 'demo-player-ui'
        this.playerPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            min-width: 280px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `

        this.playerPanel.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>🎬 演示播放中</strong>
                <button id="demo-close" style="float: right; background: #f44336; color: white; border: none; padding: 2px 8px; border-radius: 3px; cursor: pointer;">✕</button>
            </div>
            <div style="margin-bottom: 10px;">
                <button id="demo-play" style="background: #4CAF50; color: white; border: none; padding: 6px 10px; margin-right: 5px; border-radius: 3px; cursor: pointer; font-size: 12px;">▶ 播放</button>
                <button id="demo-pause" style="background: #ff9800; color: white; border: none; padding: 6px 10px; margin-right: 5px; border-radius: 3px; cursor: pointer; font-size: 12px;">⏸ 暂停</button>
                <button id="demo-reset" style="background: #f44336; color: white; border: none; padding: 6px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">⏹ 重置</button>
            </div>
            <div style="margin-bottom: 8px;">
                <label style="font-size: 12px;">速度: </label>
                <select id="demo-speed" style="background: #333; color: white; border: 1px solid #555; padding: 2px; font-size: 12px;">
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="2">2x</option>
                    <option value="4">4x</option>
                </select>
            </div>
            <div id="demo-status" style="font-size: 11px; color: #ccc;">准备播放 (${this.actions.length} 个动作)</div>
        `

        document.body.appendChild(this.playerPanel)
        this.bindEvents()
    }

    bindEvents() {
        document
            .getElementById('demo-play')
            .addEventListener('click', () => this.play())
        document
            .getElementById('demo-pause')
            .addEventListener('click', () => this.pause())
        document
            .getElementById('demo-reset')
            .addEventListener('click', () => this.reset())
        document
            .getElementById('demo-close')
            .addEventListener('click', () => this.destroy())
        document
            .getElementById('demo-speed')
            .addEventListener('change', (e) => {
                this.playbackSpeed = parseFloat(e.target.value)
            })
    }

    play() {
        if (this.currentIndex >= this.actions.length) {
            this.currentIndex = 0
        }

        this.isPlaying = true
        this.isPaused = false
        this.updateStatus('正在播放...')

        // 通知父窗口开始播放
        window.parent.postMessage(
            {
                type: 'DEMO_PLAYBACK_STARTED',
            },
            '*'
        )

        this.executeNextAction()
    }

    pause() {
        this.isPlaying = false
        this.isPaused = true

        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }

        this.updateStatus('已暂停')

        // 通知父窗口暂停
        window.parent.postMessage(
            {
                type: 'DEMO_PLAYBACK_PAUSED',
            },
            '*'
        )
    }

    reset() {
        this.isPlaying = false
        this.isPaused = false
        this.currentIndex = 0

        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }

        this.updateStatus('已重置')

        // 通知父窗口重置
        window.parent.postMessage(
            {
                type: 'DEMO_PLAYBACK_RESET',
            },
            '*'
        )
    }

    executeNextAction() {
        if (!this.isPlaying || this.currentIndex >= this.actions.length) {
            if (this.currentIndex >= this.actions.length) {
                this.updateStatus('播放完成')
                this.isPlaying = false

                // 通知父窗口播放完成
                window.parent.postMessage(
                    {
                        type: 'DEMO_PLAYBACK_COMPLETED',
                    },
                    '*'
                )
            }
            return
        }

        const action = this.actions[this.currentIndex]
        const nextAction = this.actions[this.currentIndex + 1]

        this.executeAction(action)
        this.currentIndex++

        if (nextAction && this.isPlaying) {
            const delay = Math.max(
                800,
                (nextAction.timestamp - action.timestamp) / this.playbackSpeed
            )
            this.timer = setTimeout(() => {
                this.executeNextAction()
            }, delay)
        } else {
            this.updateStatus('播放完成')
            this.isPlaying = false

            // 通知父窗口播放完成
            window.parent.postMessage(
                {
                    type: 'DEMO_PLAYBACK_COMPLETED',
                },
                '*'
            )
        }
    }

    executeAction(action) {
        this.updateStatus(
            `执行 ${action.type} (${this.currentIndex + 1}/${
                this.actions.length
            })`
        )

        // 通知父窗口当前执行的动作
        window.parent.postMessage(
            {
                type: 'DEMO_ACTION_EXECUTING',
                action: action,
                progress: {
                    current: this.currentIndex + 1,
                    total: this.actions.length,
                },
            },
            '*'
        )

        try {
            switch (action.type) {
                case 'click':
                    this.executeClick(action)
                    break
                case 'input':
                    this.executeInput(action)
                    break
                case 'submit':
                    this.executeSubmit(action)
                    break
                case 'navigation':
                    this.executeNavigation(action)
                    break
                default:
                    console.log('未知动作类型:', action.type)
            }
        } catch (error) {
            console.error('执行动作失败:', error, action)

            // 通知父窗口动作失败
            window.parent.postMessage(
                {
                    type: 'DEMO_ACTION_FAILED',
                    action: action,
                    error: error.message,
                },
                '*'
            )
        }
    }

    executeClick(action) {
        const element = this.findElement(action.selectors)
        if (element) {
            // 高亮元素
            this.highlightElement(element)

            setTimeout(() => {
                element.click()
                console.log('✅ 点击执行:', element)

                // 通知父窗口动作完成
                window.parent.postMessage(
                    {
                        type: 'DEMO_ACTION_COMPLETED',
                        action: action,
                    },
                    '*'
                )
            }, 300)
        } else {
            console.warn('❌ 未找到点击目标:', action)

            // 通知父窗口动作失败
            window.parent.postMessage(
                {
                    type: 'DEMO_ACTION_FAILED',
                    action: action,
                    error: '未找到目标元素',
                },
                '*'
            )
        }
    }

    executeInput(action) {
        const element = this.findElement(action.selectors)
        if (element && action.inputInfo) {
            // 高亮元素
            this.highlightElement(element)

            setTimeout(() => {
                element.focus()
                element.value = action.inputInfo.value
                element.dispatchEvent(new Event('input', { bubbles: true }))
                element.dispatchEvent(new Event('change', { bubbles: true }))
                console.log('✅ 输入执行:', element, action.inputInfo.value)

                // 通知父窗口动作完成
                window.parent.postMessage(
                    {
                        type: 'DEMO_ACTION_COMPLETED',
                        action: action,
                    },
                    '*'
                )
            }, 300)
        } else {
            console.warn('❌ 未找到输入目标:', action)

            // 通知父窗口动作失败
            window.parent.postMessage(
                {
                    type: 'DEMO_ACTION_FAILED',
                    action: action,
                    error: '未找到目标元素',
                },
                '*'
            )
        }
    }

    executeSubmit(action) {
        const element = this.findElement(action.selectors)
        if (element) {
            // 高亮元素
            this.highlightElement(element)

            setTimeout(() => {
                if (element.tagName === 'FORM') {
                    element.submit()
                } else {
                    element.click()
                }
                console.log('✅ 提交执行:', element)

                // 通知父窗口动作完成
                window.parent.postMessage(
                    {
                        type: 'DEMO_ACTION_COMPLETED',
                        action: action,
                    },
                    '*'
                )
            }, 300)
        } else {
            console.warn('❌ 未找到提交目标:', action)

            // 通知父窗口动作失败
            window.parent.postMessage(
                {
                    type: 'DEMO_ACTION_FAILED',
                    action: action,
                    error: '未找到目标元素',
                },
                '*'
            )
        }
    }

    executeNavigation(action) {
        console.log('🔄 导航动作:', action)

        // 通知父窗口动作完成
        window.parent.postMessage(
            {
                type: 'DEMO_ACTION_COMPLETED',
                action: action,
            },
            '*'
        )
    }

    findElement(selectors) {
        if (!selectors) return null

        // 按优先级尝试不同的选择器
        const priorities = [
            'id',
            'attributes',
            'src',
            'imgAlt',
            'imgSrc',
            'svgPath',
            'svgPathMid',
            'svgViewBox',
            'svgAriaLabel',
            'svgTitle',
            'svgClass',
            'svgSize',
            'class',
            'xpath',
            'svgGeneric',
            'tag',
        ]

        for (const type of priorities) {
            const selector = selectors[type]
            if (!selector) continue

            try {
                let element = null

                if (type === 'xpath') {
                    // 使用XPath查找
                    const result = document.evaluate(
                        selector,
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    )
                    element = result.singleNodeValue
                } else if (type === 'imgAlt' || type === 'imgSrc') {
                    // 查找包含图片的按钮
                    const parentElement = document.querySelector(
                        selector.split(' ')[0]
                    )
                    if (parentElement) {
                        const img = parentElement.querySelector(
                            selector.split(' ').slice(1).join(' ')
                        )
                        if (img) {
                            element = parentElement
                        }
                    }
                    // 如果上面的方法失败，尝试直接查找
                    if (!element) {
                        element = document.querySelector(selector)
                    }
                } else if (type.startsWith('svg')) {
                    // 处理SVG选择器
                    if (selector.includes(' svg ')) {
                        // 复合选择器：查找容器中的SVG
                        const parts = selector.split(' svg ')
                        const containerSelector = parts[0]
                        const svgSelector = 'svg ' + parts[1]

                        const containers =
                            document.querySelectorAll(containerSelector)
                        for (const container of containers) {
                            const svgElement =
                                container.querySelector(svgSelector)
                            if (svgElement) {
                                element = container // 返回容器元素（按钮）
                                break
                            }
                        }
                    } else {
                        // 直接SVG选择器
                        element = document.querySelector(selector)
                        // 如果找到的是SVG元素或其子元素，返回其可点击的父容器
                        if (element) {
                            let current = element
                            while (current && current !== document.body) {
                                if (
                                    current.tagName === 'BUTTON' ||
                                    current.tagName === 'A' ||
                                    current.getAttribute('role') === 'button' ||
                                    current.style.cursor === 'pointer' ||
                                    current.onclick
                                ) {
                                    element = current
                                    break
                                }
                                current = current.parentElement
                            }
                        }
                    }
                } else {
                    element = document.querySelector(selector)
                }

                if (element) {
                    console.log(`🎯 使用 ${type} 选择器找到元素:`, selector)
                    return element
                }
            } catch (e) {
                console.warn(`❌ ${type} 选择器失败: ${selector}`, e)
            }
        }

        console.warn('🚫 所有选择器都无法找到元素:', selectors)
        return null
    }

    highlightElement(element) {
        const originalStyle = element.style.cssText
        element.style.cssText +=
            'outline: 3px solid #ff6b6b; outline-offset: 2px; background-color: rgba(255, 107, 107, 0.1);'

        setTimeout(() => {
            element.style.cssText = originalStyle
        }, 1500)
    }

    updateStatus(status) {
        const statusElement = document.getElementById('demo-status')
        if (statusElement) {
            statusElement.textContent = status
        }
    }

    destroy() {
        this.isPlaying = false
        if (this.timer) {
            clearTimeout(this.timer)
        }

        if (this.playerPanel && this.playerPanel.parentNode) {
            this.playerPanel.parentNode.removeChild(this.playerPanel)
        }

        // 通知父窗口播放器已销毁
        window.parent.postMessage(
            {
                type: 'DEMO_PLAYER_DESTROYED',
            },
            '*'
        )

        console.log('🎬 DemoPlayer 已销毁')
    }
}

// 创建全局播放器实例
window.demoPlayer = new DemoPlayer()
