import React from 'react';

const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col relative top-10 h-20 w-full bg-base-100">
      <div className="mb-2 flex items-center justify-center" style={{ userSelect: 'none' }}>
        <p>
          <span>©2023</span>
          <span className="px-2">By</span>
        </p>

        <p className="">夜雨炊烟</p>
      </div>
      <div className="flex bg-base-100 cursor-pointer" style={{ userSelect: "none" }}>
        <span className="mr-1">
          <img src="https://cos.yychuiyan.com/iblogs/icp.webp" alt="" />
        </span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          className="downline text-[var(--text-color)] no-underline"
        >
          豫ICP备2022022169号-1
        </a>
      </div>
    </div>
  );
};

export default Footer;
