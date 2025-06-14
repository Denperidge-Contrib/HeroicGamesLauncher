export const initShortcuts = () => {
  let gamesInView: Array<Element> | undefined

  document.addEventListener('keydown', (e) => {
    // Ctrl+F or Cmd+F, focus search bar
    if ((e.ctrlKey || e.metaKey) && e.key.toLocaleLowerCase() === 'f') {
      document.getElementById('search')?.focus()
    }

    if (e.shiftKey) {
      gamesInView = Array.from(document.getElementsByClassName('gameListItem'))
      if (gamesInView.length > 0) {
        gamesInView.forEach((elem) => {
          const inp = elem.querySelector('input')
          if (inp) inp.style.display = 'initial'
        })
      }
    }

    if (e.ctrlKey || e.metaKey) {
      // Ctrl+R or Cmd+R, reload
      // Ctrl+L or Cmd+L, show library
      // Ctrl+J or Cmd+J, download manager
      // Ctrl+K or Cmd+K, settings
      // Ctrl+Q or Cmd+Q, quit Heroic
      if (['r', 'j', 'k', 'l', 'q'].includes(e.key)) {
        window.api.processShortcut(`ctrl+${e.key}`)
      }

      // Ctrl+Shift+I or Cmd+Shift+I, open devtools
      if (e.key === 'I') {
        window.api.processShortcut(`ctrl+shift+${e.key.toLocaleLowerCase()}`)
      }
    }
  })

  document.addEventListener('keyup', (e) => {
    if (gamesInView != undefined && !e.shiftKey) {
      gamesInView.forEach((elem) => {
        const inp = elem.querySelector('input')
        if (inp) inp.style.display = 'none'
      })
      gamesInView = undefined
    }
  })
}
