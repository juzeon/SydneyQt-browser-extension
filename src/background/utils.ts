export async function getBingCookies(): Promise<string> {
  let cookies = await chrome.cookies.getAll({ domain: 'bing.com' })
  cookies = cookies.filter(cookie =>
    ['.bing.com', 'bing.com', 'www.bing.com'].includes(cookie.domain))
  console.log(cookies)
  let arr: string[] = []
  for (let cookie of cookies) {
    arr.push(cookie.name + '=' + encodeURIComponent(cookie.value))
  }
  return arr.join('; ')
}
