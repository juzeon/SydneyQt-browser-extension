import { getBingCookies } from './utils'
import { onMessage } from 'webext-bridge/background'
import { CloseTabMessage } from '../types'

console.log('background is running')

getBingCookies().then(res => {
  console.log(res)
})
onMessage('closeTab', async (message) => {
  let data = message.data as any as CloseTabMessage
  await chrome.tabs.remove(data.tabID)
})
