# GitHub Readme First
<div style="display: flex; flex-direction: row; gap: 1em">
    <div>
        Available for Chrome<br>
        <a href="https://chromewebstore.google.com/detail/github-readme-first/hknjjcclkjaocphdlpbfccojankachkm">
            <img src="./assets/chrome-store.png" alt="Chrome" style="height: 60px; object-fit: contain">
        </a>
    </div>
    &nbsp;
    <div>
        Available for Firefox<br>
        <a href="https://addons.mozilla.org/fr/firefox/addon/github-readme-first/">
            <img src="./assets/firefox-store.png" alt="Firefox" style="height: 60px; object-fit: contain">
        </a>
    </div>
    &nbsp;
    <div>
        Available for Edge<br>
        <a href="https://microsoftedge.microsoft.com/addons/detail/github-readme-first/dkbbdklmkkmnpiddpidkaahbcabgcfom">
            <img src="./assets/edge-store.png" alt="Edge" style="height: 60px; object-fit: contain">
        </a>
    </div>
</div>

## The Why

If you are like me, the first thing you do when you visit a GitHub page is to scroll down to the README.
Truth is we rarely need to view the files, at least not directly, and most of the times they are just getting in our way.

This extension hides the files block that jumps at your face:

1. The `Folders and files` section is now collapsed by default
2. You can now show the files by clicking on `Show Folders and files` or by using the `ctrl+shift+F` keyboard shortcut
3. Clicking or using the shortcut again will hide the files again

![with screenshot](/assets/with.png "The extension in action")
![without screenshot](/assets/without.png "without the extension")

## The How

This extension is built with the very nice [WXT](https://wxt.dev/) browser extension framework.
It uses event listeners and CSS.
