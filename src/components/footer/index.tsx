import React from 'react';

const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col relative top-10 h-28 w-full bg-base-100">
      <div className="mb-2 flex items-center justify-center" style={{ userSelect: 'none' }}>
        <p>
          <span>©2023</span>
          <span className="px-2">By</span>
        </p>

        <p className="text-[var(--bgcolor-social-default)]">夜雨炊烟</p>
      </div>
      <div className="flex cursor-pointer">
        <span className="mr-1">
          {/* <img src="https://cos.yychuiyan.com/iblogs/icp.webp" alt="" /> */}
        </span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          className="downline text-[var(--text-color)] no-underline"
        >
          豫ICP备2022022169号-1
        </a>
      </div>
      <div className='pb-2 pt-3 lg:hidden' style={{ userSelect: 'none' }}>
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
  );
};

export default Footer;
