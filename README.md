# SydneyQt Browser Extension

![](https://public.ptree.top/ShareX/2024/01/27/1706350303/rkgDeJj24p.png)

The browser extension of [SydneyQt](https://github.com/juzeon/SydneyQt) that enables multiple shortcuts, including resolve CAPTCHA automatically etc.

## Feature

- Resolve CAPTCHA automatically.
- Update cookies to the SydneyQt desktop client.

## Installation

**Google Chrome / Microsoft Edge**

1. Download the `build.zip` file from [releases](https://github.com/juzeon/SydneyQt-browser-extension/releases).
2. Unzip the file to an empty folder.
3. In Chrome/Edge go to the extensions page (`chrome://extensions` or `edge://extensions`).
4. Enable Developer Mode.
5. Drag the folder anywhere on the page to import it (do not delete the folder afterwards).

**Mozilla Firefox**

WIP.

## Development

```bash
git clone https://github.com/juzeon/SydneyQt-browser-extension
cd SydneyQt-browser-extension
pnpm install

pnpm dev # Run in dev mode
pnpm build # Build the extension
```

## Acknowledgement

[create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)