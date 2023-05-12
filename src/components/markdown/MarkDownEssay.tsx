import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
import '@/components/markdown/essay.css';
const MarkDown = (props: any) => {

  return (
    <div>
      <ReactMarkdown
        className='markdown-body-essay'
        children={props.content}
        //@ts-ignore
        remarkPlugins={[remarkGfm, { singleTilde: false }]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                //@ts-ignore
                style={oneDark}
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
