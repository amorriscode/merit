import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Blocker from './blocker'

chrome.storage.sync.get(['meritUnproductiveSites'], (result) => {
  const unproductiveSites: string[] = result.meritUnproductiveSites || []

  const blockSite = () => {
    const blocker = document.createElement('div')
    blocker.id = 'blocker'
    document.body.appendChild(blocker)

    const mountNode = document.getElementById('blocker')
    ReactDOM.render(<Blocker />, mountNode)
  }

  if (unproductiveSites.some((site) => window.location.href.includes(site))) {
    blockSite()
  }
})
