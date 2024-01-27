<script setup lang="ts">
import { StorageItem } from 'webext-storage'
import { onMounted, ref } from 'vue'
import { getBingCookies, toBackendURL } from '../utils'
import { BingCookie } from '../types'

async function openBingChat() {
  let bingTabID = new StorageItem<number>('bingTabID')
  let tab = await chrome.tabs.create({ url: 'https://www.bing.com/search?q=Bing+AI&showconv=1', active: true })
  await bingTabID.set(tab.id!)
}

async function resolveCaptcha() {
  let resolveCaptcha = new StorageItem<boolean>('resolveCaptcha')
  await resolveCaptcha.set(true)
  await openBingChat()
}

function checkCookieStatus() {
  status.value = CookieStatus.checking
  username.value = ''
  fetch('https://www.bing.com/search?q=Bing+AI&showconv=1').then(async (res) => {
    let respText = await res.text()
    let arr = new RegExp('data-clarity-mask="true" title="(.*?)"').exec(respText)
    if (arr) {
      status.value = CookieStatus.loggedIn
      username.value = arr[1]
    } else {
      status.value = CookieStatus.error
    }
  }).catch(err => {
    status.value = CookieStatus.error
  })
}

let loadingUpdateCookies = ref(false)

function updateCookies() {
  loadingUpdateCookies.value = true
  let cookies: BingCookie[]
  getBingCookies().then(async (res) => {
    cookies = res
    return fetch(toBackendURL('/cookies'), {
      method: 'POST',
      body: JSON.stringify(res),
    })
  }).then(resp => {
    if (resp.status === 200) {
      alert('Updated ' + cookies.length + ' cookies.')
    }
  }).catch(err => {
    alert(err)
  }).finally(() => {
    loadingUpdateCookies.value = false
  })
}

enum CookieStatus {
  checking = 'Checking...',
  loggedIn = 'Logged In',
  error = 'Error',
}

let status = ref(CookieStatus.checking)
let username = ref('')
onMounted(() => {
  checkCookieStatus()
})
</script>

<template>
  <div>
    <v-container>
      <p class="text-h6 text-center">SydneyQt Browser Extension</p>
      <div class="d-flex my-2 ml-2 align-center">
        <div class="mr-1">Cookie Status:</div>
        <div class="text-grey">{{ status + (status === CookieStatus.loggedIn ? ' (' + username + ')' : '') }}</div>
        <div class="ml-2">
          <v-progress-circular
            v-if="status===CookieStatus.checking" indeterminate size="15" width="2"></v-progress-circular>
          <v-icon v-if="status===CookieStatus.loggedIn" size="15" color="green">mdi-check</v-icon>
          <v-icon v-if="status===CookieStatus.error" size="15" color="red">mdi-alert</v-icon>
        </div>
      </div>
      <v-card class="fill-height">
        <v-list density="compact" style="font-size: 18px">
          <v-list-item prepend-icon="mdi-open-in-new" @click="openBingChat">
            Open Bing Chat
          </v-list-item>
          <v-list-item prepend-icon="mdi-robot-vacuum" @click="resolveCaptcha">
            Resolve CAPTCHA
          </v-list-item>
          <v-list-item prepend-icon="mdi-cookie" v-if="status===CookieStatus.loggedIn" @click="updateCookies">
            <div class="d-flex align-center">
              <p>
                Update Cookies to SydneyQt
              </p>
              <v-progress-circular v-if="loadingUpdateCookies" class="ml-2" indeterminate size="15"
                                   width="2"></v-progress-circular>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>
