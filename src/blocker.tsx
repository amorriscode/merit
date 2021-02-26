import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'

import './styles.css'
import { formatUrl } from './utils/url'

import Logo from './logo'

const Blocker = (): React.ReactElement => {
  const [displayBlocker, setDisplayBlocker] = useState(true)
  const [showDisableConfirmation, setShowDisableConfirmation] = useState(false)
  const [credits, setCredits] = useState(0)
  const disableReasonRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chrome.storage.sync.get(['meritCredits'], (result) => {
      setCredits(result.meritCredits || 0)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      chrome.storage.local.get(
        ['meritSpendingSite', 'meritDisabled'],
        (result) => {
          const { meritSpendingSite, meritDisabled } = result

          const onSpendingSite = formatUrl(window.location.hostname).includes(
            meritSpendingSite
          )

          if (!displayBlocker && onSpendingSite) {
            // Burn credits faster than you earn
            const newCredits = credits - 10

            chrome.storage.sync.set({ meritCredits: newCredits })

            setCredits(newCredits)

            if (newCredits <= 0) {
              setDisplayBlocker(true)
            }
          } else if (!meritDisabled) {
            setDisplayBlocker(true)
          }
        }
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [displayBlocker, credits])

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  const handleSpendCredits = () => {
    // Store the site the user wants to spend credits on
    chrome.storage.local.set({
      meritSpendingSite: formatUrl(window.location.hostname),
    })

    setDisplayBlocker(false)
  }

  const handleDisable = () => {
    chrome.storage.local.set({
      meritDisabled: true,
    })

    setDisplayBlocker(false)
    setShowDisableConfirmation(false)
  }

  return (
    <>
      {displayBlocker && (
        <div
          className="mrt-h-screen mrt-w-screen mrt-bg-black mrt-fixed mrt-top-0 mrt-left-0 mrt-right-0 mrt-bottom-0 mrt-bg-opacity-75 mrt-font-sans"
          style={{ fontSize: '14px', zIndex: 999999 }}
        >
          <main className="mrt-bg-white mrt-rounded-lg mrt-flex mrt-flex-col mrt-max-w-lg mrt-mx-auto mrt-my-20">
            <div className="mrt-p-4 mrt-rounded-t-lg mrt-bg-gradient-to-r mrt-from-yellow-400 mrt-via-red-500 mrt-to-pink-500 mrt-flex mrt-justify-between mrt-text-2xl mrt-items-center mrt-space-x-40 mrt-text-white">
              <Logo />

              <RiSettings3Fill
                onClick={openOptions}
                className="hover:mrt-opacity-50 hover:mrt-cursor-pointer"
              />
            </div>

            <div className="mrt-p-8 mrt-flex mrt-flex-col mrt-space-y-4 mrt-text-center">
              {showDisableConfirmation ? (
                <>
                  <div>Why do you want to disable Merit?</div>

                  <input
                    ref={disableReasonRef}
                    placeholder="I need a distraction"
                    className="mrt-p-4 mrt-border-0 mrt-rounded mrt-bg-gray-200"
                  />

                  <div
                    onClick={handleDisable}
                    className="mrt-p-4 hover:mrt-cursor-pointer mrt-rounded mrt-bg-pink-500 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75 mrt-w-auto"
                  >
                    Disable
                  </div>

                  <div
                    onClick={() => setShowDisableConfirmation(false)}
                    className="hover:mrt-cursor-pointer mrt-text-gray-600 hover:mrt-text-opacity-75 mrt-w-auto mrt-text-xs"
                  >
                    Back
                  </div>
                </>
              ) : (
                <>
                  {credits > 10 ? (
                    <>
                      <div>
                        You have{' '}
                        <span className="mrt-font-bold">{credits}</span> to
                        spend on this website.
                      </div>

                      <div
                        onClick={handleSpendCredits}
                        className="mrt-p-4 hover:mrt-cursor-pointer mrt-rounded mrt-bg-yellow-400 mrt-text-white mrt-font-bold hover:mrt-bg-opacity-75 mrt-w-auto"
                      >
                        Spend Credits
                      </div>
                    </>
                  ) : (
                    <>
                      <div>You have no credits remaining.</div>
                      <div>Time to get to work!</div>
                    </>
                  )}

                  <div
                    onClick={() => setShowDisableConfirmation(true)}
                    className="hover:mrt-cursor-pointer mrt-text-gray-600 hover:mrt-text-opacity-75 mrt-w-auto mrt-text-xs"
                  >
                    Bypass Merit
                  </div>
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
