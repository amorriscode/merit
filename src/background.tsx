import { formatUrl } from './utils/url'

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      return
    }

    const activeTabUrl = formatUrl(tabs[0].url || '')

    chrome.tabs.sendMessage(tabs[0].id, { activeTabUrl })

    chrome.storage.sync.get(['meritProductiveSites'], (result) => {
      const productiveSites: string[] = result.meritProductiveSites || []

      chrome.alarms.clearAll()

      // Stop spending credits (reset all blockers)
      chrome.storage.local.set({ meritSpendingSite: null })

      // Allow the user to earn credits if the active tab is a productive site
      if (productiveSites.some((site) => activeTabUrl.includes(site))) {
        chrome.storage.sync.set({ meritSpendingSite: null })
        chrome.alarms.create('earnMeritCredits', { periodInMinutes: 1 })
      }
    })
  })
})

const earnCredits = () => {
  chrome.storage.sync.get(['meritCredits'], (result) => {
    const credits = result.meritCredits || 0
    chrome.storage.sync.set({ meritCredits: credits + 60 })
  })
}

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case 'earnMeritCredits':
      earnCredits()
      break
  }
})
