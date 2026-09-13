# Wallet Keystore Decryptor

A small browser tool that decrypts an Ethereum keystore file (the encrypted JSON used by Geth, MyEtherWallet, MetaMask exports, etc.) with its password and gives you the private key.

## How it works

1. Choose your keystore file. Geth names these `UTC--<date>--<address>` with no `.json` extension; they are accepted as-is.
2. Enter the wallet password and click **Decrypt**. Decryption uses scrypt and can take several seconds; a progress bar shows how far along it is.
3. Check the **wallet address** shown matches the wallet you expect, then use **Copy** to copy the private key. The key itself is never displayed.

Decryption is done by [ethers](https://docs.ethers.org/v6/) (`Wallet.fromEncryptedJson`). Both V3 keystores and the old crowdsale presale format are supported.

## Security

- **Everything happens in your browser.** The app makes no network requests; your file, password, and key are never uploaded anywhere. Production builds enforce this with a Content Security Policy (`connect-src 'none'`), so the page is blocked from making network requests at all.
- **Prefer running it offline.** For a wallet holding real funds, build it yourself (or clone and run it locally), disconnect from the internet, and use it on a machine you trust. Don't trust a hosted copy you can't verify.
- **Be careful with the clipboard.** A copied private key stays on the clipboard until overwritten. Windows clipboard history (Win+V) and clipboard sync can retain it longer. Paste it where it's needed, then copy something else and clear your clipboard history.
- **Close the tab when done.** The decrypted key stays in the page's memory until the tab is closed.
- **Anyone with the private key controls the wallet.** Never paste it into a website, chat, or support request.

## Running locally

```sh
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## License

MIT, see [LICENSE.txt](LICENSE.txt).
