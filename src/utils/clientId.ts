// 生成或获取客户端唯一标识，用于点赞去重
const CLIENT_ID_KEY = 'iblog_client_id'

function generateId(): string {
  return 'client_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getClientId(): string {
  let clientId = localStorage.getItem(CLIENT_ID_KEY)
  if (!clientId) {
    clientId = generateId()
    localStorage.setItem(CLIENT_ID_KEY, clientId)
  }
  return clientId
}
