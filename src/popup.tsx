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
    <div className="tw-w-96">
      <div className="tw-p-4 tw-bg-gradient-to-r tw-from-yellow-400 tw-via-red-500 tw-to-pink-500 tw-flex tw-justify-between tw-text-2xl tw-items-center tw-space-x-40 tw-text-white">
        <Logo />

        <RiSettings3Fill
          onClick={openOptions}
          className="hover:tw-opacity-50 hover:tw-cursor-pointer"
        />
      </div>

      <main className="tw-bg-white tw-rounded-b-lg tw-p-8 tw-space-y-4">
        <div>
          You have <span className="tw-font-bold">{credits}</span> credits.
        </div>

        {!isProductiveSite && !isUnproductiveSite && (
          <div>
            <div className="tw-mb-2">This site is:</div>

            <div className="tw-flex tw-space-x-4">
              <div
                className="tw-p-4 hover:tw-cursor-pointer tw-rounded tw-text-center tw-bg-yellow-400 tw-text-white tw-font-bold hover:tw-bg-opacity-75 tw-w-full"
                onClick={handleNewProductiveSite}
              >
                Productive
              </div>

              <div
                className="tw-p-4 hover:tw-cursor-pointer tw-rounded tw-text-center tw-bg-pink-500 tw-text-white tw-font-bold hover:tw-bg-opacity-75 tw-w-full"
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
