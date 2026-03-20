import type { FixedColumnID } from "@shared/types"
import { useTitle } from "react-use"
import { NavBar } from "../navbar"
import { Dnd } from "./dnd"
import { currentColumnIDAtom } from "~/atoms"

export function Column({ id }: { id: string }) {
  const { data, isLoading, isError } = useColumn(id)

  // [修改] 如果正在加载或报错，可以显示骨架屏或返回 null
  if (isLoading) return <ColumnSkeleton />
  
  // [新增] 如果加载失败，或者后端返回的新闻列表为空，则直接不显示此专栏
  if (isError || !data || !data.items || data.items.length === 0) {
    return null 
  }

  return (
    <Card 
      title={data.name} 
      icon={data.icon}
      // ... 其他属性
    >
      <NewsList items={data.items} />
    </Card>
  )
}
