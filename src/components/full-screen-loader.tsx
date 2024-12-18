'use client'

import { trefoil } from 'ldrs'

export function FullScreenLoader() {
  // This only needs to be called once
  trefoil.register()

  return (


<l-trefoil
  size="80"
  stroke="4"
  stroke-length="0.15"
  bg-opacity="0.1"
  speed="1.4" 
  color="black" 
></l-trefoil>
  )
}

