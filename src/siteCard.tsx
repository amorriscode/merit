import * as React from 'react'
import { useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'

const SiteCard = ({ site, onRemove }: { site: string; onRemove: Function }) => {
  const [showFunctions, setShowFunctions] = useState(false)

  return (
    <div
      className="tw-flex tw-space-x-2 tw-items-center tw-text-xl tw-p-4 tw-border-l-0 tw-border-r-0"
      onMouseEnter={() => setShowFunctions(true)}
      onMouseLeave={() => setShowFunctions(false)}
    >
      <div>{site}</div>

      {showFunctions && (
        <RiCloseFill
          className="tw-bg-red-700 tw-text-white hover:tw-bg-opacity-75 tw-rounded hover:tw-cursor-pointer"
          onClick={() => onRemove(site)}
        />
      )}
    </div>
  )
}

export default SiteCard
