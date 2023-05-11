import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Social = () => {
  // 弹窗显示隐藏
  const [show, setShow] = useState(false);
  // 跳转到github
  const handleGitHub = () => {
    window.open(`https://github.com/zhanghaoju`);
  };
  // 跳转到语雀
  const handleYuQue = () => {
    window.open(`https://www.yuque.com/yycy`);
  };
  // 跳转到掘金
  const handleJueJin = () => {
    window.open(`https://juejin.cn/user/149189312651341/posts`);
  };
  // 鼠标移动到标签后显示弹窗
  const onMouseOver = () => {
    setShow(true);
  };
  const onMouseOut = () => {
    setShow(false);
  };
  return (
    <div className="flex items-center  justify-around bg-base-100 h-20 mb-5 mx-auto rounded-2xl transition duration-500 ease-in-out transform hover:scale-x-[105%] hover:scale-y-[110%]">
      <div className="cursor-pointer text-base-100" onClick={handleGitHub}>
        <svg
          // @ts-ignore
          t="1676557249155"
          className="icon"
          viewBox="0 0 1049 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4368"
          width="45"
          height="40"
        >
          <path
            d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z"
            fill="var(--color-icon-default)"
            p-id="4369"
          ></path>
        </svg>
      </div>
      <div className="cursor-pointer" onClick={handleYuQue}>
        <svg
          // @ts-ignore
          t="1676557268114"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4573"
          width="45"
          height="40"
        >
          <path
            d="M854.6 370.6c-9.9-39.4 9.9-102.2 73.4-124.4l-67.9-3.6s-25.7-90-143.6-98c-117.9-8.1-195-3-195-3s87.4 55.6 52.4 154.7c-25.6 52.5-65.8 95.6-108.8 144.7-1.3 1.3-2.5 2.6-3.5 3.7C319.4 605 96 860 96 860c245.9 64.4 410.7-6.3 508.2-91.1 20.5-0.2 35.9-0.3 46.3-0.3 135.8 0 250.6-117.6 245.9-248.4-3.2-89.9-31.9-110.2-41.8-149.6z"
            p-id="4574"
            fill="var(--color-icon-default)"
          ></path>
        </svg>
      </div>
      <div className="cursor-pointer relative" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div
          className={`w-36 h-36 flex justify-center py-2 bg-base-100 absolute bottom-12 -right-12 shadow-md  rounded-lg ${show
            ? 'block transition delay-200 duration-500 ease-in'
            : 'hidden transition delay-200 duration-500 ease-in'
            }`}
        >
          <p className="flex flex-col items-center">
            {/* <img src="https://cos.yychuiyan.com/iblogs/wx1360.webp" alt="微信公众号" /> */}
            <img
              src="https://cos.yychuiyan.com/iblogs/wx.webp"
              alt="微信公众号"
              className="w-32 h-32"
            />
            <span className="text-sm">关注公众号</span>
          </p>
        </div>
        <svg
          // @ts-ignore
          t="1679307814371"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3197"
          width="45"
          height="40"
        >
          <path
            d="M308.73856 119.23456C23.65696 170.15296-71.37024 492.23936 155.392 639.66464c12.43392 7.99232 12.43392 7.104-6.21824 62.76096l-15.98464 47.65952 57.43104-30.784 57.43104-30.78656 30.49216 7.40096c31.96928 7.99232 72.82432 13.61664 100.0576 13.61664l16.28416 0-5.62688-21.61152c-44.70016-164.5952 109.82912-327.71072 310.8352-327.71072l27.2384 0-5.62432-19.53792C677.59616 186.43456 491.392 86.67136 308.73856 119.23456zM283.87072 263.40352c30.1952 20.4288 31.97184 64.5376 2.95936 83.48416-47.06816 30.78656-102.1312-23.38816-70.45632-69.57056C230.28736 256.59648 263.74144 249.78688 283.87072 263.40352zM526.62016 263.40352c49.73568 33.45408 12.43392 110.71744-43.22304 89.40288-40.25856-15.39328-44.99712-70.75072-7.40096-90.5856C490.79808 254.22848 513.88928 254.81984 526.62016 263.40352zM636.44928 385.37216c-141.2096 25.7536-239.19872 132.91776-233.57184 256.06656 7.40096 164.89472 200.71168 278.56896 386.32448 227.65312l21.90592-5.92128 46.1824 24.8704c25.4592 13.9136 46.77376 23.97696 47.36512 22.79168 0.59392-1.47968-4.43648-19.24352-10.95168-39.6672-14.79936-45.59104-15.09632-42.33472 4.73856-56.54272C1121.64864 654.464 925.67552 332.97408 636.44928 385.37216zM630.82496 518.28992c12.4288 8.28928 18.944 29.01248 13.61408 44.1088-11.24864 32.26624-59.49952 34.63424-72.52992 3.55328C557.10976 530.13248 597.9648 496.97536 630.82496 518.28992zM828.57472 521.84576c19.53792 18.64704 16.2816 50.32448-6.51264 62.16448-34.93376 17.76128-71.63904-17.76128-53.58336-51.80416C780.32128 510.2976 810.81344 504.97024 828.57472 521.84576z"
            fill="var(--color-icon-default)"
            p-id="3198"
          ></path>
        </svg>
      </div>
      <div className="cursor-pointer" onClick={handleJueJin}>
        <svg
          width="45"
          height="40"
          viewBox="0 0 36 28"
          fill="var(--color-fd-default)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z"
            fill="var(--color-icon-default)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Social;
