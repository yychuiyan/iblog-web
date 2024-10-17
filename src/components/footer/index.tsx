// import { useWebSiteUpdate } from '@/api/webSite'
import { useEffect } from 'react'

const Footer = () => {
  // useWebSiteUpdate() // 网站访问
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (!hasVisited) {
      // 如果 sessionStorage 中没有记录，则调用接口
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])
  return (
    <div className="flex justify-center items-center flex-col relative top-8 h-20 py-2 w-full bg-base-100 lg:h-12 lg:w-full">
      <div className="flex items-center justify-center lg:flex-col" style={{ userSelect: 'none' }}>
        <div className="flex items-center">
          <p className="flex items-center">
            <span>©2023</span>
            <span className="px-1">❤️</span>
            <span className="pr-1">by</span>
          </p>
          <p className="downline text-[var(--color-icon-default)] cursor-pointer">夜雨炊烟</p>
        </div>
        <p className="px-2 lg:hidden">|</p>
        <div>
          <p className="cursor-pointer">
            {/* <span className="mr-1">
            <img src="https://cos.yychuiyan.com/iblogs/icp.webp" alt="" />
          </span> */}
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              className="downline text-[var(--text-color)] no-underline"
            >
              豫ICP备2022022169号-1
            </a>
          </p>
        </div>
      </div>
      <div className="pb-2 pt-3 lg:hidden" style={{ userSelect: 'none' }}>
        <span className="inline-block w-auto h-7 text-center leading-7 px-1 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          React
        </span>
        <span className="inline-block w-auto h-7 text-center leading-7 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          Vite
        </span>
        <span className="inline-block w-auto h-7 text-center leading-7 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          TypeScript
        </span>
        <span className="inline-block w-auto h-7 text-center leading-7 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          React Redux
        </span>
        <span className="inline-block w-auto h-7 text-center leading-7 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          Hooks
        </span>
        <span className="inline-block w-auto h-7 text-center leading-7 px-2 mx-1 text-[var(--article-content-tags-font)] rounded-md bg-[var(--article-content-tags-bgcolor)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500  cursor-pointer z-11">
          Tailwind CSS
        </span>
      </div>
    </div>
  )
}

export default Footer
