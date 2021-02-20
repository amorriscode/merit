import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'

import './styles.css'

import Logo from './logo'

const Popup = () => {
  const [credits, setCredits] = useState()

  useEffect(() => {
    chrome.storage.sync.get(['meritCredits'], (result) => {
      setCredits(result.meritCredits || 0)
    })
  }, [])

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  return (
    <div>
      <div className="tw-p-4 tw-bg-gradient-to-r tw-from-yellow-400 tw-via-red-500 tw-to-pink-500 tw-flex tw-justify-between tw-text-2xl tw-items-center tw-space-x-40">
        <Logo />

        <RiSettings3Fill
          onClick={openOptions}
          className="hover:tw-opacity-50 hover:tw-cursor-pointer"
        />
      </div>

      <main className="tw-bg-white tw-rounded-b-lg tw-p-8">
        <div>You have {credits} credits.</div>
      </main>
    </div>
  )
}

const mountNode = document.getElementById('popup')
ReactDOM.render(<Popup />, mountNode)
