import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'

import './styles.css'
import { formatUrl } from './utils/url'

import Logo from './logo'

const Popup = () => {
  const [productiveSites, setProductiveSites] = useState<string[]>([])
  const [unproductiveSites, setUnproductiveSites] = useState<string[]>([])
  const [currentSite, setCurrentSite] = useState('')
  const [credits, setCredits] = useState()

  const isProductiveSite = productiveSites.some((site) =>
    currentSite.includes(site)
  )

  const isUnproductiveSite = unproductiveSites.some((site) =>
    currentSite.includes(site)
  )

  useEffect(() => {
    chrome.storage.sync.get(
      ['meritCredits', 'meritProductiveSites', 'meritUnproductiveSites'],
      (result) => {
        setCredits(result.meritCredits || 0)
        setProductiveSites(result.meritProductiveSites || [])
        setUnproductiveSites(result.meritUnproductiveSites || [])
      }
    )

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setCurrentSite(formatUrl(tabs[0].url || ''))
    })
  }, [])

  const handleNewProductiveSite = () => {
    const newProductiveSites = [...productiveSites, currentSite]
    chrome.storage.sync.set({ meritProductiveSites: newProductiveSites })
    setProductiveSites(newProductiveSites)
  }

  const handleNewUnproductiveSite = () => {
    const newUnproductiveSites = [...unproductiveSites, currentSite]
    chrome.storage.sync.set({ meritUnproductiveSites: newUnproductiveSites })
    setProductiveSites(newUnproductiveSites)
  }

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  return (
    <div className="mrt-w-96" style={{ fontSize: '14px' }}>
      <div className="mrt-p-4 mrt-bg-gradient-to-r mrt-from-yellow-400 mrt-via-red-500 mrt-to-pink-500 mrt-flex mrt-justify-between mrt-text-2xl mrt-items-center mrt-space-x-40 mrt-text-white">
        <Logo />

        <RiSettings3Fill
          onClick={openOptions}
          className="hover:mrt-opacity-50 hover:mrt-cursor-pointer"
        />
      </div>

      <main className="mrt-bg-white mrt-rounded-b-lg mrt-p-8 mrt-space-y-4">
        <div>
          You have <span className="mrt-font-bold">{credits}</span> credits.
        </div>

        {!isProductiveSite && !isUnproductiveSite && (
          <div>
            <div className="mrt-mb-2">This site is:</div>

            <div className="mrt-flex mrt-space-x-4">
              <div
                className="mrt-p-4 hover:mrt-cursor-pointer mrt-rounded mrt-text-center mrt-bg-yellow-400 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75 mrt-w-full"
                onClick={handleNewProductiveSite}
              >
                Productive
              </div>

              <div
                className="mrt-p-4 hover:mrt-cursor-pointer mrt-rounded mrt-text-center mrt-bg-pink-500 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75 mrt-w-full"
                onClick={handleNewUnproductiveSite}
              >
                Unproductive
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

const mountNode = document.getElementById('popup')
ReactDOM.render(<Popup />, mountNode)
