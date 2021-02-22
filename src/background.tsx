import { formatUrl } from './utils/url'

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      return
    }

    const activeTabUrl = formatUrl(tabs[0].url || '')

    chrome.tabs.sendMessage(tabs[0].id, { activeTabUrl })

    chrome.storage.sync.get(
      ['meritProductiveSites', 'meritUnproductiveSites'],
      (result) => {
        const productiveSites: string[] = result.meritProductiveSites || []
        const unproductiveSites: string[] = result.meritUnproductiveSites || []

        chrome.alarms.clearAll()

        if (productiveSites.some((site) => activeTabUrl.includes(site))) {
          chrome.storage.sync.set({ meritSpendingSite: null })
          chrome.alarms.create('earnMeritCredits', { periodInMinutes: 1 })
        } else if (
          unproductiveSites.some((site) => activeTabUrl.includes(site))
        ) {
          chrome.storage.sync.set({ meritSpendingSite: activeTabUrl })
        }
      }
    )
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
