import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { message } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
const CopyRight = (props) => {
  // 路由信息
  const location = useLocation()
  const [link, setLink] = useState('')
  useEffect(() => {
    setLink(`https://yychuiyan.com${location.pathname}`)
  }, [location.pathname])
  // 点击复制
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    message.info({
      content: '复制成功!',
      icon: <SoundOutlined style={{ color: 'var(--bgcolor-social-default)' }} />,
      className: 'text-[var(--bgcolor-social-default)]'
    })
  }
  // 跳转到协议
  const handleJump = () => {
    window.open('https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh')
  }
  const handleJumpDetail = (link: string) => {
    window.open(link)
  }
  return (
    <div className="flex items-center relative top-8 h-28 w-full shadow-md overflow-hidden rounded-xl bg-base-200 lg:w-full lg:top-16 lg:h-28">
      <div className="flex flex-col h-20 px-5 w-full z-10 lg:z-0 lg:h-24 lg:overflow-hidden">
        <span className="text-xl lg:hidden">{props.content}</span>
        <div className="flex h-7" style={{ userSelect: 'none' }}>
          <span className="lg:break-normal lg:underline block lg:hidden">{link}</span>
          <span
            className="lg:break-normal lg:underline hidden lg:block"
            onClick={() => handleJumpDetail(link)}
          >
            {link.substring(0, 40) + '···'}
          </span>
          <span className="cursor-pointer pl-2" onClick={handleCopy}>
            <FontAwesomeIcon icon={faClone} size="xl" />
          </span>
        </div>
        <span style={{ userSelect: 'none' }}>
          本博客所有文章除特别声明外，均采用
          <span className="downline mx-1 cursor-pointer lg:underline" onClick={handleJump}>
            CC BY-NC-SA 4.0
          </span>
          许可协议。转载请注明来自
          <span className="downline  cursor-pointer font-medium lg:underline">夜雨炊烟</span>
        </span>
      </div>
      <div className="absolute right-0 lg:right-0 lg:-z-10">
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3927"
          width="200"
          height="130"
        >
          <path
            d="M512 16C238.066 16 16 238.066 16 512s222.066 496 496 496 496-222.066 496-496S785.934 16 512 16z m0 896c-221.064 0-400-178.902-400-400 0-221.062 178.902-400 400-400 221.064 0 400 178.902 400 400 0 221.064-178.902 400-400 400z m214.702-202.128c-19.228 19.424-91.06 82.792-208.13 82.792-164.86 0-280.968-122.85-280.968-283.134 0-158.304 120.55-278.802 279.524-278.802 111.062 0 177.476 53.24 195.186 69.558a23.93 23.93 0 0 1 3.872 30.644l-36.31 56.226c-7.682 11.9-23.932 14.564-34.998 5.842-17.19-13.552-63.628-45.076-123.416-45.076-96.606 0-155.832 70.66-155.832 160.164 0 83.178 53.776 167.384 156.554 167.384 65.314 0 113.686-38.078 131.452-54.45 10.54-9.714 27.192-8.078 35.64 3.476l39.73 54.34a23.894 23.894 0 0 1-2.304 31.036z"
            fill="var(--color-default)"
            p-id="3928"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default CopyRight
