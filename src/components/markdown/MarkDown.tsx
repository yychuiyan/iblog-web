import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
// 高亮的主题，还有很多别的主题，可以自行选择
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import '@/components/markdown/github-markdown-dark.css';
import '@/components/markdown/index.css';
import CodeCopyBtn from '@/components/markdown/CodeCopyBtn'
import { Modal } from 'antd';
const MarkDown = (props: any) => {
  // @ts-ignore
  const Pre = ({ children }) => <pre className={`relative mb-5`} >
    <CodeCopyBtn children={children}></CodeCopyBtn>
    {children}
  </pre>
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  // @ts-ignore

  const imgWithPreview = ({ node, ...props }: { node: any;[key: string]: any }) => {
    // 检查节点是否为 <img> 元素
    if (node.type === 'element' && node.tagName === 'img') {
      // 从节点属性中提取图片 URL
      const imageUrl = node.properties?.src;

      const handleImageClick = () => {
        setPreviewVisible(true);
        setPreviewImageUrl(imageUrl);
      };

      const handleModalCancel = () => {
        setPreviewVisible(false);
      };

      return (
        <div className='image_priview'>
          <img {...props} src={imageUrl} alt="Markdown 图片" onClick={handleImageClick} />
          <Modal open={previewVisible} onCancel={handleModalCancel} footer={null} width="calc(100% - 400px)">
            <img alt="预览" style={{ width: '100%' }} src={previewImageUrl} />
          </Modal>
        </div>
      );
    }

    // 对于其他元素，原样返回
    return null;
  };


  return (
    <div>
      <ReactMarkdown
        className='markdown-body '
        children={props.content}
        //@ts-ignore
        remarkPlugins={[remarkGfm, { singleTilde: false }]}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre: Pre,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                //@ts-ignore
                style={oneDark}
                language={match[1]}
                PreTag="div"
              {...props}
              />
              : (<code>{children}</code>)
          },
          img: imgWithPreview
        }}
      />
    </div>
  )
}

export default MarkDown
