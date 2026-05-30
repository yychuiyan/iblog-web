import { useEffect, useState } from 'react'
import { Popover, Badge, List, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { useGitHubCommits } from '@/api/githubCommits'
import { GitHubCommit } from '@/api/githubCommits/type'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const { Text, Link } = Typography

const STORAGE_KEY = 'github_last_seen_sha'
const COMMITS_URL = 'https://github.com/yychuiyan/iblog-web/commits/master/'

const Notification = () => {
  const { commits, isCommitsFetched } = useGitHubCommits()
  const [hasNew, setHasNew] = useState(false)
  const [open, setOpen] = useState(false)

  // 检查是否有新的提交
  useEffect(() => {
    if (isCommitsFetched && commits && commits.length > 0) {
      const latestSha = commits[0].sha
      const lastSeenSha = localStorage.getItem(STORAGE_KEY)
      if (latestSha !== lastSeenSha) {
        setHasNew(true)
      }
    }
  }, [commits, isCommitsFetched])

  // 打开弹窗时清除红点
  const handleOpenChange = (visible: boolean) => {
    setOpen(visible)
    if (visible && commits && commits.length > 0) {
      const latestSha = commits[0].sha
      localStorage.setItem(STORAGE_KEY, latestSha)
      setHasNew(false)
    }
  }

  // 格式化提交信息（只取第一行）
  const formatMessage = (message: string) => {
    return message.split('\n')[0]
  }

  // 格式化时间
  const formatTime = (dateStr: string) => {
    return dayjs(dateStr).fromNow()
  }

  const commitList = (
    <div style={{ width: 360 }}>
      <div
        style={{
          padding: '8px 14px',
          borderBottom: '1px solid var(--border-color, #f0f0f0)',
          fontWeight: 600,
          fontSize: 14
        }}
      >
        网站维护记录
      </div>
      {isCommitsFetched && commits && commits.length > 0 ? (
        <>
          <List
            dataSource={commits}
            renderItem={(item: GitHubCommit) => (
              <List.Item style={{ padding: '5px 14px', borderBottom: 'none' }}>
                <List.Item.Meta
                  title={
                    <Text
                      style={{ fontSize: 13, lineHeight: 1.3 }}
                      ellipsis={{ tooltip: item.commit.message }}
                    >
                      {formatMessage(item.commit.message)}
                    </Text>
                  }
                  description={
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {item.commit.author.name} · {formatTime(item.commit.author.date)}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
          <div
            style={{
              textAlign: 'center',
              padding: '6px 14px',
              borderTop: '1px solid var(--border-color, #f0f0f0)'
            }}
          >
            <Link href={COMMITS_URL} target="_blank" style={{ fontSize: 13 }}>
              查看全部记录 →
            </Link>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px', color: '#999' }}>暂无更新记录</div>
      )}
    </div>
  )

  return (
    <Popover
      content={commitList}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
      overlayStyle={{ padding: 0 }}
    >
      <span
        className="flex items-center justify-center cursor-pointer"
        style={{ width: 40, height: 40 }}
      >
        <Badge dot={hasNew} offset={[-2, 2]}>
          <FontAwesomeIcon icon={faBell} size="lg" />
        </Badge>
      </span>
    </Popover>
  )
}

export default Notification
