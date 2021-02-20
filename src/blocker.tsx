import * as React from 'react'
import { useEffect, useState } from 'react'

import './styles.css'

import Logo from './logo'

const Blocker = () => {
  const [displayBlocker, setDisplayBlocker] = useState(true)
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    chrome.storage.sync.get(['meritCredits'], (result) => {
      setCredits(result.meritCredits || 0)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Remove credits from user's account
      if (!displayBlocker) {
        const newCredits = credits - 2
        chrome.storage.sync.set({ meritCredits: newCredits })

        setCredits(newCredits)

        if (newCredits <= 0) {
          setDisplayBlocker(true)
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [displayBlocker, credits])

  return (
    <>
      {displayBlocker && (
        <div className="tw-h-screen tw-w-screen tw-bg-black tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-z-50 tw-bg-opacity-75 tw-font-sans">
          <main className="tw-bg-white tw-rounded-lg tw-flex tw-flex-col tw-max-w-lg tw-mx-auto tw-my-20">
            <div className="tw-p-4 tw-rounded-t-lg tw-bg-gradient-to-r tw-from-yellow-400 tw-via-red-500 tw-to-pink-500">
              <Logo />
            </div>

            <div className="tw-p-8 tw-flex tw-flex-col tw-space-y-4">
              {credits > 10 ? (
                <>
                  <div>You have {credits} to spend on this website.</div>
                  <button
                    onClick={() => setDisplayBlocker(false)}
                    className="tw-p-4 hover:tw-cursor-pointer tw-w-1/5 tw-rounded tw-text-center tw-bg-yellow-400 tw-text-white tw-font-bold hover:tw-bg-opacity-75 tw-w-max"
                  >
                    Spend Credits
                  </button>
                </>
              ) : (
                <>
                  <div>You have no credits remaining.</div>
                  <div>Time to get to work!</div>
                </>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}

export default Blocker
