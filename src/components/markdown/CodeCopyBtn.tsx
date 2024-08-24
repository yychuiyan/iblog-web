import { useEffect, useState } from 'react'
const CodeCopyBtn = (props) => {
  // 复制文本
  const [copyContent, setCopyContent] = useState('复制')
  // 复制显示状态
  // const [copyShow, setCopyShow] = useState(false)
  // 语言
  const [language, setLanguage] = useState()
  // 语言
  useEffect(() => {
    const { children } = props
    const language = children
      .map((item: { props: { className: string } }) => item.props.className)
      .join('')
      .slice(9)
    setLanguage(language)
  }, [props])
  const handleClick = () => {
    navigator.clipboard.writeText(props.children[0].props.children[0])
    setCopyContent('复制成功!')
    setTimeout(() => {
      setCopyContent('复制')
    }, 2000)
  }

  return (
    <div className="absolute top-1  right-1 px-1 rounded-md flex items-center w-auto h-5 text-sm shadow-xl">
      <span className="text-base-300 pr-2" style={{ userSelect: 'none' }}>
        {language}
      </span>
      <span
        onClick={handleClick}
        style={{ color: 'var(--color-copy-default)' }}
        className=" cursor-pointer"
      >
        {copyContent}
      </span>
    </div>
  )
}
export default CodeCopyBtn
