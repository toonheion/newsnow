import { sources } from "@shared/sources"; // 使用您的 alias 导入数据源配置

export default defineEventHandler((event) => {
  // 设置响应头为 XML 格式，以便搜索引擎正确解析
  setHeader(event, 'Content-Type', 'text/xml');

  const baseUrl = 'https://newsnow.busiyi.world';
  // 获取当前日期的 YYYY-MM-DD 格式
  const lastmod = new Date().toISOString().split('T')[0];

  // 1. 初始化 Sitemap 并添加根目录节点
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 2. 遍历所有的 sources 动态生成每个频道的节点
  Object.keys(sources).forEach((sourceId) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/c/${sourceId}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // 3. 闭合标签
  sitemap += `\n</urlset>`;

  return sitemap;
});
