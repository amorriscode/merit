import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import SiteCard from './siteCard';

const ProductiveSites = () => {
  const [productiveSites, setProductiveSites] = useState<string[]>([]);
  const productiveSiteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chrome.storage.sync.get(['meritProductiveSites'], (result) => {
      setProductiveSites(result.meritProductiveSites || []);
    });
  }, []);

  const handleNewProductiveSite = () => {
    if (
      productiveSiteRef.current?.value &&
      !productiveSites.includes(productiveSiteRef.current.value)
    ) {
      const newProductiveSites = [
        ...productiveSites,
        productiveSiteRef.current.value,
      ];

      chrome.storage.sync.set({ meritProductiveSites: newProductiveSites });
      setProductiveSites(newProductiveSites);

      productiveSiteRef.current.value = '';
    }
  };

  const handleRemoveProductiveSite = (site: string) => {
    const newProductiveSites = productiveSites.filter(
      (productiveSite) => productiveSite !== site
    );

    chrome.storage.sync.set({ meritProductiveSites: newProductiveSites });
    setProductiveSites(newProductiveSites);
  };

  return (
    <section>
      <div className='tw-flex tw-justify-between tw-items-center'>
        <h2 className='tw-text-2xl'>Productive Sites</h2>

        <div className='tw-space-x-2 tw-w-1/2 tw-flex'>
          <input
            ref={productiveSiteRef}
            placeholder='reddit.com'
            className='tw-p-4 tw-w-4/5 tw-border-0 tw-rounded tw-bg-gray-200'
          />
          <div
            onClick={handleNewProductiveSite}
            className='tw-p-4 hover:tw-cursor-pointer tw-w-1/5 tw-rounded tw-text-center tw-bg-yellow-400 tw-text-white tw-font-bold hover:tw-bg-opacity-75'
          >
            Add Site
          </div>
        </div>
      </div>

      {!!productiveSites.length ? (
        <div className='tw-bg-white tw-p-4 tw-rounded-lg tw-divide-y-2 tw-divide-solid tw-divide-gray-50'>
          {productiveSites.map((site) => (
            <SiteCard site={site} onRemove={handleRemoveProductiveSite} />
          ))}
        </div>
      ) : (
        <div>You don't have any productive sites. Add one to get started!</div>
      )}
    </section>
  );
};

export default ProductiveSites;
