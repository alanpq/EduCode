import * as React from 'react'

import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <span className="flex-grow" />
      <Link to="/login">Login</Link>
    </nav>
  )
}