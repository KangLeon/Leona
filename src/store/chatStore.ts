import { create } from 'zustand'

export interface IChatStore {
  isCollapse: boolean
  modelId: string
  setIsCollapse: (value: boolean) => void
  setModelId: (value: string) => void
}

// 使用Zustand创建store
const useChatStore = create<IChatStore>((set) => ({
  isCollapse: false,
  modelId: '',
  setIsCollapse: (value: boolean) => 
    set({ isCollapse: value }),
  setModelId: (value: string) => 
    set({ modelId: value })
}))

export default useChatStore
