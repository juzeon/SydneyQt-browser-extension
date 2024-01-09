import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: 'SydneyQt Browser Extension',
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  // options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://*.bing.com/*', '*://copilot.microsoft.com/*'],
      js: ['src/contentScript/bing.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [],
      matches: [],
    },
  ],
  host_permissions: [
    '*://*.bing.com/*',
    '*://copilot.microsoft.com/*',
    '*://127.0.0.1:*/*',
  ],
  permissions: ['storage', 'cookies'],
})
