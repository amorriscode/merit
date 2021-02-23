import * as React from 'react'
import { useEffect, useState, useRef } from 'react'

import SiteCard from './siteCard'

const ProductiveSites = (): React.ReactElement => {
  const [productiveSites, setProductiveSites] = useState<string[]>([])
  const productiveSiteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chrome.storage.sync.get(['meritProductiveSites'], (result) => {
      setProductiveSites(result.meritProductiveSites || [])
    })
  }, [])

  const handleNewProductiveSite = () => {
    if (productiveSiteRef.current?.value) {
      const newProductiveSites = [
        ...productiveSites,
        productiveSiteRef.current.value,
      ]

      chrome.storage.sync.set({ meritProductiveSites: newProductiveSites })
      setProductiveSites(newProductiveSites)

      productiveSiteRef.current.value = ''
    }
  }

  const handleRemoveProductiveSite = (site: string) => {
    const newProductiveSites = productiveSites.filter(
      (productiveSite) => productiveSite !== site
    )

    chrome.storage.sync.set({ meritProductiveSites: newProductiveSites })
    setProductiveSites(newProductiveSites)
  }

  return (
    <section>
      <div className="mrt-flex mrt-justify-between mrt-items-center">
        <h2 className="mrt-text-2xl">Productive Sites</h2>

        <div className="mrt-space-x-2 mrt-w-1/2 mrt-flex">
          <input
            ref={productiveSiteRef}
            placeholder="https://reddit.com"
            className="mrt-p-4 mrt-w-4/5 mrt-border-0 mrt-rounded mrt-bg-gray-200"
          />
          <div
            onClick={handleNewProductiveSite}
            className="mrt-p-4 hover:mrt-cursor-pointer mrt-w-1/5 mrt-rounded mrt-text-center mrt-bg-yellow-400 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75"
          >
            Add Site
          </div>
        </div>
      </div>

      {productiveSites.length ? (
        <div className="mrt-bg-white mrt-p-4 mrt-rounded-lg mrt-divide-y-2 mrt-divide-solid mrt-divide-gray-50">
          {productiveSites.map((site) => (
            <SiteCard
              key={site}
              site={site}
              onRemove={handleRemoveProductiveSite}
            />
          ))}
        </div>
      ) : (
        <div>
          You don&apos;t have any productive sites. Add one to get started!
        </div>
      )}
    </section>
  )
}

export default ProductiveSites
