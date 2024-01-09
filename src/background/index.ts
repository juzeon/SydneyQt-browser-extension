import { getBingCookies } from './utils'

console.log('background is running')

getBingCookies().then(res => {
  console.log(res)
})
