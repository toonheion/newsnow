import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect } from "react" // [新增]
import { Column } from "~/components/column"
import { sources } from "@shared/sources" // [新增] 引入您的 sources 配置

export const Route = createFileRoute("/c/$column")({
  // ... 现有的 params 等配置保持不变 ...
  component: SectionComponent,
  params: {
    parse: (params) => {
      const column = fixedColumnIds.find(x => x === params.column.toLowerCase())
      if (!column) throw new Error(`"${params.column}" is not a valid column.`)
      return {
        column,
      }
    },
    stringify: params => params,
  },
  onError: (error) => {
    if (error?.routerCode === "PARSE_PARAMS") {
      throw redirect({ to: "/" })
    }
  },
})

function SectionComponent() {
  const { column } = Route.useParams()
  
  // [新增] 动态 SEO 优化逻辑
  useEffect(() => {
    // 从 sources 获取当前专栏的信息，例如 "知乎"
    const sourceInfo = sources[column as keyof typeof sources]
    const sourceName = sourceInfo?.name || column
    const sourceDesc = sourceInfo?.desc || `获取${sourceName}的最新实时资讯。`

    // 1. 动态修改网页标题
    const originalTitle = document.title
    document.title = `${sourceName}热榜 - NewsNow 实时聚合`

    // 2. 动态修改 meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    const originalDesc = metaDescription?.getAttribute('content')
    if (metaDescription) {
      metaDescription.setAttribute('content', `${sourceDesc} 尽在 NewsNow 实时新闻聚合阅读器。`)
    }

    // 清理函数：组件卸载（离开此页面）时恢复原状
    return () => {
      document.title = originalTitle
      if (metaDescription && originalDesc) {
        metaDescription.setAttribute('content', originalDesc)
      }
    }
  }, [column])

  return <Column id={column} />
}
