<script setup lang="ts">
import { StorageItem } from 'webext-storage'

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
</script>

<template>
  <div>
    <v-container>
      <p class="text-h6 text-center">SydneyQt Browser Extension</p>
      <v-card class="fill-height">
        <v-list>
          <v-list-item title="Open Bing Chat" @click="openBingChat"></v-list-item>
          <v-list-item title="Resolve CAPTCHA" @click="resolveCaptcha"></v-list-item>
          <v-list-item title="Options"></v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>
