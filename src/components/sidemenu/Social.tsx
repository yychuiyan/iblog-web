import { useState } from 'react'
import IconFont from '../iconfont'

const Social = () => {
  // 弹窗显示隐藏
  const [show, setShow] = useState(false)
  // 跳转到github
  const handleGitHub = () => {
    window.open(`https://github.com/yychuiyan`)
  }
  // 跳转到语雀
  const handleYuQue = () => {
    window.open(`https://www.yuque.com/yycy`)
  }
  // 跳转到掘金
  const handleJueJin = () => {
    window.open(`https://juejin.cn/user/149189312651341/posts`)
  }
  // 鼠标移动到标签后显示弹窗
  const onMouseOver = () => {
    setShow(true)
  }
  const onMouseOut = () => {
    setShow(false)
  }
  return (
    <div className="flex items-center  justify-around bg-base-100 h-20 mb-5 mx-auto rounded-2xl transition duration-500 ease-in-out transform hover:scale-x-[105%] hover:scale-y-[110%]">
      <div className="cursor-pointer text-base-100" onClick={handleGitHub}>
        <IconFont
          iconName="icon-github"
          className="text-[40px] text-[var(--color-icon-default)] pr-1"
        ></IconFont>
      </div>
      <div className="cursor-pointer" onClick={handleYuQue}>
        <IconFont
          iconName="icon-yuque-fill"
          className="text-[45px] text-[var(--color-icon-default)] pr-1"
        ></IconFont>
      </div>
      <div className="cursor-pointer relative" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div
          className={`w-36 h-36 flex justify-center py-2 bg-base-100 absolute bottom-12 -right-12 shadow-md  rounded-lg ${
            show
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
        <IconFont
          iconName="icon-weixin"
          className="text-[45px] text-[var(--color-icon-default)] pr-1"
        ></IconFont>
      </div>
      <div className="cursor-pointer" onClick={handleJueJin}>
        <IconFont
          iconName="icon-juejin"
          className="text-[40px] text-[var(--color-icon-default)] pr-1"
        ></IconFont>
      </div>
    </div>
  )
}

export default Social
