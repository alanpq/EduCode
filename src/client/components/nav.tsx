import * as React from 'react'

import { NavLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
      <span className="flex-grow" />
      <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
    </nav>
  )
}