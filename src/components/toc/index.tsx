import { useEffect, useState, useCallback } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

// 从 DOM 中提取所有标题
function extractHeadings(): TocItem[] {
  const article = document.querySelector('.markdown-body')
  if (!article) return []

  const headings = article.querySelectorAll('h1, h2, h3')
  const items: TocItem[] = []
  const stack: TocItem[] = []

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1))
    const text = heading.textContent || ''
    let id = heading.id
    if (!id) {
      id = text.replace(/\s+/g, '-').replace(/[^\w一-龥-]/g, '')
      heading.id = id
    }

    const item: TocItem = { id, text, level, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      items.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }
    stack.push(item)
  })

  return items
}

const Toc = () => {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeadings(extractHeadings())
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      }
    )

    const elements = document.querySelectorAll(
      '.markdown-body h1[id], .markdown-body h2[id], .markdown-body h3[id]'
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  // 递归渲染目录项，counters 追踪各级序号
  const renderItems = (items: TocItem[], depth = 0, counters: number[] = []) => {
    if (items.length === 0) return null
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, index) => {
          // 计算序号：深度级的序号 = index + 1
          const numCounters = [...counters]
          numCounters[depth] = index + 1
          // 清理更深层的序号
          const displayCounters = numCounters.slice(0, depth + 1)
          const num = displayCounters.join('.') + '. '

          return (
            <li key={item.id} style={{ lineHeight: '2rem' }}>
              <a
                className={`block truncate cursor-pointer no-underline transition-colors duration-200`}
                style={{
                  paddingLeft: `${16 + depth * 14}px`,
                  paddingRight: '8px',
                  fontSize: item.level === 3 ? '15px' : '17px',
                  fontWeight: activeId === item.id ? 600 : 400,
                  color: 'var(--color-icon-default)',
                  backgroundColor:
                    activeId === item.id ? 'var(--color-active-default)' : 'transparent',
                  userSelect: 'none'
                }}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(item.id)
                }}
                onMouseEnter={(e) => {
                  if (activeId !== item.id) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      'var(--color-active-default)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== item.id) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  }
                }}
                title={item.text}
              >
                {num}
                {item.text}
              </a>
              {item.children.length > 0 && renderItems(item.children, depth + 1, numCounters)}
            </li>
          )
        })}
      </ul>
    )
  }

  if (headings.length === 0) return null

  return (
    <div
      className="w-[300px] max-h-[calc(100vh-160px)] overflow-y-auto rounded-2xl bg-base-100"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div
        className="w-full border border-solid border-b-1 border-t-0 border-l-0 border-r-0 border-[var(--border-color)]"
        style={{ color: 'var(--color-icon-default)' }}
      >
        <p
          className="flex items-center h-10 text-xl px-3"
          style={{ userSelect: 'none', fontWeight: 600 }}
        >
          <svg
            className="icon w-7 h-7 pr-1"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="67666"
          >
            <path
              d="M655.36 678.4m-288 0a288 288 0 1 0 576 0 288 288 0 1 0-576 0Z"
              fill="#FFD84A"
            ></path>
            <path
              d="M631.04 915.2h-358.4c-120.32 0-217.6-97.28-217.6-217.6v-448c0-120.32 97.28-217.6 217.6-217.6h358.4c120.32 0 217.6 97.28 217.6 217.6v448c0 120.32-98.56 217.6-217.6 217.6z m-358.4-832c-92.16 0-166.4 74.24-166.4 166.4v448c0 92.16 74.24 166.4 166.4 166.4h358.4c92.16 0 166.4-74.24 166.4-166.4v-448c0-92.16-74.24-166.4-166.4-166.4h-358.4z"
              fill="var(--color-icon-default)"
            ></path>
          </svg>
          目录
        </p>
      </div>
      <div className="py-2">{renderItems(headings)}</div>
    </div>
  )
}

export default Toc
