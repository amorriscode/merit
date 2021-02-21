import * as React from 'react'
import { useEffect, useState, useRef } from 'react'

import SiteCard from './siteCard'

const UnproductiveSites = (): React.ReactElement => {
  const [unproductiveSites, setUnproductiveSites] = useState<string[]>([])
  const unproductiveSiteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chrome.storage.sync.get(['meritUnproductiveSites'], (result) => {
      setUnproductiveSites(result.meritUnproductiveSites || [])
    })
  }, [])

  const handleNewUnproductiveSite = () => {
    if (unproductiveSiteRef.current?.value) {
      const newUnproductiveSites = [
        ...unproductiveSites,
        unproductiveSiteRef.current.value,
      ]

      chrome.storage.sync.set({ meritUnproductiveSites: newUnproductiveSites })
      setUnproductiveSites(newUnproductiveSites)

      unproductiveSiteRef.current.value = ''
    }
  }

  const handleRemoveUnproductiveSite = (site: string) => {
    const newUnproductiveSites = unproductiveSites.filter(
      (unproductiveSite) => unproductiveSite !== site
    )

    chrome.storage.sync.set({ meritUnproductiveSites: newUnproductiveSites })
    setUnproductiveSites(newUnproductiveSites)
  }

  return (
    <section>
      <div className="tw-flex tw-justify-between tw-items-center">
        <h2 className="tw-text-2xl">Unproductive Sites</h2>

        <div className="tw-space-x-2 tw-w-1/2 tw-flex">
          <input
            ref={unproductiveSiteRef}
            placeholder="https://reddit.com"
            className="tw-p-4 tw-w-4/5 tw-border-0 tw-rounded tw-bg-gray-200"
          />
          <div
            onClick={handleNewUnproductiveSite}
            className="tw-p-4 hover:tw-cursor-pointer tw-w-1/5 tw-rounded tw-text-center tw-bg-yellow-400 tw-text-white tw-font-bold hover:tw-bg-opacity-75"
          >
            Add Site
          </div>
        </div>
      </div>

      {unproductiveSites.length ? (
        <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-divide-y-2 tw-divide-solid tw-divide-gray-50">
          {unproductiveSites.map((site) => (
            <SiteCard
              key={site}
              site={site}
              onRemove={handleRemoveUnproductiveSite}
            />
          ))}
        </div>
      ) : (
        <div>
          You don&apos;t have any unproductive sites. Add one to get started!
        </div>
      )}
    </section>
  )
}

export default UnproductiveSites
