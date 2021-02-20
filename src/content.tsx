import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Blocker from './blocker'

chrome.storage.sync.get(
  ['meritProductiveSites', 'meritUnproductiveSites', 'meritCredits'],
  (result) => {
    const productiveSites: string[] = result.meritProductiveSites || []
    const unproductiveSites: string[] = result.meritUnproductiveSites || []

    let credits = result.meritCredits || 0

    const addCredits = () => {
      setInterval(() => {
        credits += 10
        chrome.storage.sync.set({ meritCredits: credits })
      }, 10000)
    }

    const blockSite = () => {
      const blocker = document.createElement('div')
      blocker.id = 'blocker'
      document.body.appendChild(blocker)

      const mountNode = document.getElementById('blocker')
      ReactDOM.render(<Blocker />, mountNode)
    }

    if (productiveSites.some((site) => window.location.href.includes(site))) {
      addCredits()
    } else if (
      unproductiveSites.some((site) => window.location.href.includes(site))
    ) {
      blockSite()
    }
  }
)
