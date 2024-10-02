export default defineContentScript({
  matches: ["https://github.com/*"],
  runAt: "document_start",
  main(ctx) {
    console.debug("GHRF", "start")

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        console.debug("GHRF", "DOMContentLoaded")
        setup()
      })
    } else {
      console.debug("GHRF", "direct setup")
      setup()
    }

    ctx.addEventListener(window, "wxt:locationchange", (event) => {
      console.debug("GHRF", "wxt:locationchange", event.newUrl.pathname)
      setup()
    })

    console.debug("GHRF", "end")
  },
})

function toggle(header: HTMLElement) {
  console.debug("GHRF", "toggle")

  const content = header.nextElementSibling
  if (content instanceof HTMLElement) {
    header.classList.toggle("collapsed")
  }
}

function setup() {
  const filesHeaderElement = document.getElementById(headerId)
  if (!filesHeaderElement) {
    console.debug("GHRF", "Header not found")
    return
  }

  filesHeaderElement.setAttribute("title", "Powered by the GitHub Readme First browser extension")
  filesHeaderElement.classList.remove("sr-only")

  const style = document.createElement("style")
  style.textContent = `
    #${headerId}::before {
      color: darkseagreen;
      content: "˅ Hide ";
    }
    #${headerId}.collapsed::before {
      content: "˃ Show ";
    }
    #${headerId} {
      font-size: 1rem;
      margin-bottom: 16px;
      cursor: pointer;
    }
    #${headerId}.collapsed {
      margin-bottom: 0;
    }
    #${headerId}.collapsed + * {
      display: none;
    }
  `
  document.head.appendChild(style)

  filesHeaderElement.addEventListener("click", (e) => {
    if (e.target === filesHeaderElement) {
      toggle(filesHeaderElement)
    }
  })

  window.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
      toggle(filesHeaderElement)
    }
  })

  toggle(filesHeaderElement)
}

const headerId = "folders-and-files"
