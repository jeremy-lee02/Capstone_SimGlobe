import React from 'react'
import { simGlobe_logo } from '../assets'

function Logo() {
  return (
    <img src={simGlobe_logo} alt="Logo" width={150} height={60} className="object-contain absolute left-6 top-6" />
  )
}

export default Logo