import { formatUrl } from './utils/url'

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      return
    }

    const activeTabUrl = formatUrl(tabs[0].url || '')

    chrome.storage.sync.get(['meritProductiveSites'], (result) => {
      const productiveSites: string[] = result.meritProductiveSites || []

      if (productiveSites.some((site) => activeTabUrl.includes(site))) {
        chrome.alarms.create('earnMeritCredits', { periodInMinutes: 1 })
      } else {
        chrome.alarms.clearAll()
      }
    })
  })
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'earnMeritCredits') {
    chrome.storage.sync.get(['meritCredits'], (result) => {
      const credits = result.meritCredits || 0
      chrome.storage.sync.set({ meritCredits: credits + 60 })
    })
  }
})
