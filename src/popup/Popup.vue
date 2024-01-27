<script setup lang="ts">
import { StorageItem } from 'webext-storage'
import { onMounted, ref } from 'vue'

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
        <div class="text-grey">{{ status + (status === CookieStatus.loggedIn ? ' (' + username + ')' : '')}}</div>
        <div class="ml-2">
          <v-progress-circular
            v-if="status===CookieStatus.checking" indeterminate size="15" width="2"></v-progress-circular>
          <v-icon v-if="status===CookieStatus.loggedIn" size="15" color="green">mdi-check</v-icon>
          <v-icon v-if="status===CookieStatus.error" size="15" color="red">mdi-alert</v-icon>
        </div>
      </div>
      <v-card class="fill-height">
        <v-list density="compact">
          <v-list-item title="Open Bing Chat" @click="openBingChat"></v-list-item>
          <v-list-item title="Resolve CAPTCHA" @click="resolveCaptcha"></v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>
