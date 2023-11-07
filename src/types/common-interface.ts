// 搜索区域tab
export interface SearchTabItem {
  tab: string
  label: string
}

// 首页tab 组件 props定义
export interface Title {
  title: string
}

// 工具详情页children定义
export interface ToolLayoutChild {
  children?: React.ReactNode
}

// 规则组件
export interface RuleItem {
  title: string
  text: string[]
}