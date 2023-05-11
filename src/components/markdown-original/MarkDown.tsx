import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import './github-dark.css';
import './github-markdown-dark.css';
import './index.css';
import { message } from 'antd';
const MarkDown = (props: any) => {
  // 文章内容
  const [text, setText] = useState('');
  // 复制
  const [copyContent, setCopyContent] = useState("复制")
  useEffect(() => {
    let text = props.content;
    setText(text);
  }, []);

  useEffect(() => {
    // 配置highlight
    hljs.configure({
      //@ts-ignore
      tabReplace: '',
      classPrefix: 'hljs-',
      languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'TypeScript', 'Markdown'],
    });
    // 配置marked
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: code => hljs.highlightAuto(code).value,
      gfm: true, //默认为true。 允许 Git Hub标准的markdown.
      //@ts-ignore
      tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
    });
  }, []);

  const htmlAttr = "<div data-type='copy' class='copy  h-6 w-20 text-base bg-blue-400 absolute right-80 cursor-pointer hover:block' onclick='handleCopy'>复制</div>"
  return (
    <>
      <div className="marked">
        {/* <p className="absolute right-80">点击复制</p> */}
        <div
          className="show-region markdownStyle bg-base-100"
          dangerouslySetInnerHTML={{
            __html: marked(text).replace(
              /<pre>/g,
              "<pre id='hljs'>"
            ),
          }}
        ></div >
      </div >
    </>
  );
};

export default MarkDown;
