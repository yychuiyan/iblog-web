export interface GitHubCommitAuthor {
  name: string
  email: string
  date: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    author: GitHubCommitAuthor
    message: string
  }
  html_url: string
}

export type GitHubCommitsResponse = GitHubCommit[]
