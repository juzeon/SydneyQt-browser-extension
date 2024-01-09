import './bing.css'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

class Bing {
  cib: HTMLElement
  prompt: string = 'hi'

  async entrypoint() {
    this.cib = await this.waitElement(() => document.querySelector('#b_sydConvCont > cib-serp'))
    this.setSearchBox(this.prompt)
    while (true) {
      this.pressSendButton()
      if (this.getSearchBoxValue() !== this.prompt) {
        break
      }
      await sleep(1000)
    }
    await this.waitElement(() => {
      return this.cib.shadowRoot
        .querySelector('#cib-conversation-main').shadowRoot
        .querySelector('#cib-chat-main > cib-chat-turn').shadowRoot
        .querySelector('cib-message-group.response-message-group')
    })
    let tab = await chrome.tabs.getCurrent()
    await chrome.tabs.remove(tab.id)
    console.log('end of entrypoint')
  }

  async waitElement(getElement: () => any): Promise<HTMLElement> {
    while (true) {
      let elem = getElement()
      if (elem) {
        console.log('loaded element')
        return elem
      }
      console.log('waiting element')
      await sleep(1000)
    }
  }

  getSearchBox(): HTMLTextAreaElement {
    return this.cib.shadowRoot
      .querySelector('#cib-action-bar-main').shadowRoot
      .querySelector('div > div.main-container > div > div.input-row > cib-text-input')
      .shadowRoot.querySelector('#searchbox')
  }

  getSendButton(): HTMLButtonElement {
    return this.cib.shadowRoot
      .querySelector('#cib-action-bar-main').shadowRoot
      .querySelector('div > div.main-container > div > div.bottom-controls > ' +
        'div.bottom-right-controls > div.control.submit > button')
  }

  setSearchBox(value: string) {
    let input = this.getSearchBox()
    input.value = ''
    input.value = value
    let event = new Event('input', {
      bubbles: true,
      cancelable: true,
    })
    input.dispatchEvent(event)
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  }

  getSearchBoxValue(): string {
    let input = this.getSearchBox()
    return input.value
  }

  pressSendButton() {
    let btn = this.getSendButton()
    btn.click()
  }
}

new Bing().entrypoint()
