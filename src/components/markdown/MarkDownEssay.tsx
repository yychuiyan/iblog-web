import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw' // 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
// 高亮的主题
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import '@/components/markdown/github-markdown-dark.css'
import '@/components/markdown/index.css'
import '@/components/markdown/essay.css'
const MarkDown = (props) => {
  return (
    <div>
      <ReactMarkdown
        className="markdown-body-essay"
        children={props.content}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
        components={{
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
          }
        }}
      />
    </div>
  )
}

export default MarkDown
