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
  // Only for repositories
  if (document.location.pathname.match(/\//g)?.length !== 2) {
    return
  }

  const filesHeaderElement = document.getElementById("folders-and-files")
  if (!filesHeaderElement) {
    console.warn("GHRF", "Header not found")
    return
  }

  filesHeaderElement.setAttribute("title", "Powered by the GitHub Readme First browser extension")
  filesHeaderElement.classList.remove("sr-only")

  const style = document.createElement("style")
  style.textContent = `
    #folders-and-files::before {
      color: darkseagreen;
      content: "˅ Hide ";
    }
    #folders-and-files.collapsed::before {
      content: "˃ Show ";
    }
    #folders-and-files {
      font-size: 1rem;
      margin-bottom: 16px;
      cursor: pointer;
    }
    #folders-and-files.collapsed {
      margin-bottom: 0;
    }
    #folders-and-files.collapsed + * {
      display: none;
    }
  `
  document.head.appendChild(style)

  filesHeaderElement.addEventListener("click", (e) => {
    if (e.target === filesHeaderElement) {
      toggle(filesHeaderElement)
    }
  })

  window.addEventListener("keypress", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
      toggle(filesHeaderElement)
    }
  })

  toggle(filesHeaderElement)
}
