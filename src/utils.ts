import { BingCookie } from './types'

export async function getBingCookies(): Promise<BingCookie[]> {
  let cookies = await chrome.cookies.getAll({ domain: 'bing.com' })
  cookies = cookies.filter(cookie =>
    ['.bing.com', 'bing.com', 'www.bing.com'].includes(cookie.domain))
  return cookies.map(cookie => {
    return {
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
    }
  })
}

export function toBackendURL(path: string) {
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  return 'http://127.0.0.1:61989' + path
}
