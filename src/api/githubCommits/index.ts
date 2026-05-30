import useSWR from 'swr'
import { GitHubCommitsResponse } from './type'

// 使用 fetch 直接请求 GitHub API（不走 axios 拦截器）
const fetcher = async (url: string): Promise<GitHubCommitsResponse> => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }
  return response.json()
}

const GITHUB_COMMITS_API =
  'https://api.github.com/repos/yychuiyan/iblog-web/commits?sha=d8ae114810b2e77427f08507971fee259528ac51&per_page=5'

// 获取 GitHub 提交记录
export const useGitHubCommits = () => {
  const { data, error } = useSWR(GITHUB_COMMITS_API, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000 // 1分钟内不重复请求
  })

  return {
    commits: data as GitHubCommitsResponse,
    isCommitsFetched: !error && data !== undefined,
    error
  }
}
