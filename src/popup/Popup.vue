<script setup lang="ts">
import { StorageItem } from 'webext-storage'
import { ref } from 'vue'

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

let status = ref('Checking...')
</script>

<template>
  <div>
    <v-container>
      <p class="text-h6 text-center">SydneyQt Browser Extension</p>
      <div class="d-flex my-2 ml-2 align-center">
        <div class="mr-1">Cookie Status:</div>
        <div class="text-grey">{{ status }}</div>
        <div class="ml-2" v-if="status==='Checking...'">
          <v-progress-circular indeterminate size="15" width="2"></v-progress-circular>
        </div>
      </div>
      <v-card class="fill-height">
        <v-list>
          <v-list-item title="Open Bing Chat" @click="openBingChat"></v-list-item>
          <v-list-item title="Resolve CAPTCHA" @click="resolveCaptcha"></v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>
