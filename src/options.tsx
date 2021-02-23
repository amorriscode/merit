import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './styles.css'

import Logo from './logo'
import UnproductiveSites from './unproductiveSites'
import ProductiveSites from './productiveSites'

const Options = () => {
  return (
    <div
      className="mrt-h-screen mrt-w-screen mrt-font-sans mrt-bg-gray-100"
      style={{ fontSize: '14px' }}
    >
      <div className="mrt-p-4 mrt-bg-gradient-to-r mrt-from-yellow-400 mrt-via-red-500 mrt-to-pink-500">
        <Logo />
      </div>

      <div className="mrt-flex">
        <nav className="mrt-w-1/5 mrt-p-4">
          <div className="mrt-bg-gray-200 mrt-p-4 mrt-font-bold mrt-rounded-lg mrt-text-md">
            Sites
          </div>
        </nav>

        <main className="mrt-w-full">
          <div className="mrt-p-8 mrt-space-y-8">
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
