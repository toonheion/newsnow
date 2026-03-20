import { sources } from "@shared/sources";
import { getLatest } from "../getters";

export default defineEventHandler(async (event) => {
  // 1. 获取原始数据
  const results = await getLatest();

  // 2. [关键修复] 在处理器内部进行过滤
  const filteredResults = results.map(res => ({
    ...res,
    // 只保留有标题和有链接的新闻项
    items: res.items?.filter(item => 
      item.title && item.title.trim() !== "" && 
      (item.url || item.mobileUrl)
    ) || []
  })).filter(res => res.items && res.items.length > 0); // 过滤掉整个为空的专栏

  // 3. 返回过滤后的结果
  return filteredResults; 
});
