import useSWR from 'swr'
import { request } from '@/utils/request'
import { GitHubCommitsResponse } from './type'

const fetcher = async (url: string) => {
  try {
    const response = await request.get(url)
    return (response as any).data.data as GitHubCommitsResponse
  } catch (error) {
    console.error('Fetch commits error:', error)
    throw error
  }
}

// 通过后端代理，浏览器 Network 只显示 /iblog/commits
const COMMITS_API = '/iblog/commits'

export const useGitHubCommits = () => {
  const { data, error } = useSWR(COMMITS_API, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000
  })

  return {
    commits: data as GitHubCommitsResponse,
    isCommitsFetched: !error && data !== undefined,
    error
  }
}
