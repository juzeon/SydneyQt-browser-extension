<script setup lang="ts">
function openBingChat() {
  chrome.tabs.create({ url: 'https://www.bing.com/search?q=Bing+AI&showconv=1', active: true })
}
</script>

<template>
  <div>
    <v-container>
      <p class="text-h6 text-center">SydneyQt Browser Extension</p>
      <v-card class="fill-height">
        <v-list>
          <v-list-item title="Open Bing Chat" @click="openBingChat"></v-list-item>
          <v-list-item title="Options"></v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>
