import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './styles.css'

import Logo from './logo'
import UnproductiveSites from './unproductiveSites'
import ProductiveSites from './productiveSites'

const Options = () => {
  return (
    <div
      className="tw-h-screen tw-w-screen tw-font-sans tw-bg-gray-100"
      style={{ fontSize: '14px' }}
    >
      <div className="tw-p-4 tw-bg-gradient-to-r tw-from-yellow-400 tw-via-red-500 tw-to-pink-500">
        <Logo />
      </div>

      <div className="tw-flex">
        <nav className="tw-w-1/5 tw-p-4">
          <div className="tw-bg-gray-200 tw-p-4 tw-font-bold tw-rounded-lg tw-text-md">
            Sites
          </div>
        </nav>

        <main className="tw-w-full">
          <div className="tw-p-8 tw-space-y-8">
            <UnproductiveSites />
            <ProductiveSites />
          </div>
        </main>
      </div>
    </div>
  )
}

const mountNode = document.getElementById('options')
ReactDOM.render(<Options />, mountNode)
