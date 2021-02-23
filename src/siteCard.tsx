import * as React from 'react'
import { useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'

const SiteCard = ({
  site,
  onRemove,
}: {
  site: string
  onRemove: (site: string) => void
}): React.ReactElement => {
  const [showFunctions, setShowFunctions] = useState(false)

  return (
    <div
      className="mrt-flex mrt-space-x-2 mrt-items-center mrt-text-xl mrt-p-4 mrt-border-l-0 mrt-border-r-0"
      onMouseEnter={() => setShowFunctions(true)}
      onMouseLeave={() => setShowFunctions(false)}
    >
      <div>{site}</div>

      {showFunctions && (
        <RiCloseFill
          className="mrt-bg-red-700 mrt-text-white hover:mrt-bg-opacity-75 mrt-rounded hover:mrt-cursor-pointer"
          onClick={() => onRemove(site)}
        />
      )}
    </div>
  )
}

export default SiteCard
