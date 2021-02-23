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
      <div className="mrt-flex mrt-justify-between mrt-items-center">
        <h2 className="mrt-text-2xl">Unproductive Sites</h2>

        <div className="mrt-space-x-2 mrt-w-1/2 mrt-flex">
          <input
            ref={unproductiveSiteRef}
            placeholder="https://reddit.com"
            className="mrt-p-4 mrt-w-4/5 mrt-border-0 mrt-rounded mrt-bg-gray-200"
          />
          <div
            onClick={handleNewUnproductiveSite}
            className="mrt-p-4 hover:mrt-cursor-pointer mrt-w-1/5 mrt-rounded mrt-text-center mrt-bg-yellow-400 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75"
          >
            Add Site
          </div>
        </div>
      </div>

      {unproductiveSites.length ? (
        <div className="mrt-bg-white mrt-p-4 mrt-rounded-lg mrt-divide-y-2 mrt-divide-solid mrt-divide-gray-50">
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
