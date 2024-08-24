import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw' // 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
// 高亮的主题
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import '@/components/markdown/github-markdown-dark.css'
import '@/components/markdown/index.css'
import CodeCopyBtn from '@/components/markdown/CodeCopyBtn'
import { Modal } from 'antd'
const MarkDown = (props) => {
  const Pre = ({ children }) => (
    <pre className={`relative mb-5`}>
      <CodeCopyBtn children={children}></CodeCopyBtn>
      {children}
    </pre>
  )
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState('')
  // 平台类型
  const [isMobile, setIsMobile] = useState(false)
  // 监听移动端PC端
  useEffect(() => {
    const system = {
      pingtai: /(Win32|Win16|WinCE|Mac68K|MacIntel|MacPPC|Linux mips64)/i.test(navigator.platform)
    }

    if (system.pingtai) {
      // 电脑
      setIsMobile(false)
    } else {
      // 手机
      setIsMobile(true)
    }
  }, [])
  const imgWithPreview = ({ node, ...props }) => {
    // 检查节点是否为 <img> 元素
    if (node.type === 'element' && node.tagName === 'img') {
      // 从节点属性中提取图片 URL
      const imageUrl = node.properties?.src

      const handleImageClick = () => {
        setPreviewVisible(true)
        setPreviewImageUrl(imageUrl)
      }

      const handleModalCancel = () => {
        setPreviewVisible(false)
      }

      return (
        <div className="image_priview">
          <img {...props} src={imageUrl} alt="Markdown 图片" onClick={handleImageClick} />
          {isMobile ? (
            <Modal open={previewVisible} onCancel={handleModalCancel} footer={null} width="auto">
              <img
                alt="预览"
                style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}
                src={previewImageUrl}
              />
            </Modal>
          ) : (
            <Modal
              open={previewVisible}
              onCancel={handleModalCancel}
              footer={null}
              width="calc(100% - 25%)"
            >
              <img
                alt="预览"
                style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}
                src={previewImageUrl}
              />
            </Modal>
          )}
        </div>
      )
    }

    // 对于其他元素，原样返回
    return null
  }

  return (
    <div>
      <ReactMarkdown
        className="markdown-body "
        children={props.content}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]} // 禁用波浪号删除线语法
        rehypePlugins={[rehypeRaw]}
        components={{
          pre: Pre,
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={oneDark as React.CSSProperties | any}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code>{children}</code>
            )
          },
          img: imgWithPreview
        }}
      />
    </div>
  )
}

export default MarkDown
