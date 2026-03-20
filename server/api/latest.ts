export default defineEventHandler(async () => {
  return {
    v: Version,
  }
})
// [新增] 过滤掉无效的新闻项，并过滤掉空专栏
const filteredResults = results.map(res => ({
  ...res,
  // 只保留有标题和有链接的新闻
  items: res.items?.filter(item => 
    item.title && item.title.trim() !== "" && 
    (item.url || item.mobileUrl)
  ) || []
})).filter(res => res.items.length > 0); // 如果整个专栏一条新闻都没有，直接不返回该专栏

return filteredResults;
