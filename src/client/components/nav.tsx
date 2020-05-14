import * as React from 'react'

import { NavLink } from 'react-router-dom'

export const Navigation = (props) => {
  return (
    <nav>
      <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
      <NavLink to="/rooms" exact={true} activeClassName="active">Rooms</NavLink>
      <span className="flex-grow" />
      {
        (props.user) ?
          <NavLink to="/profile" exact={true} activeClassName="active">{props.user.username}</NavLink>
          : (<>
            <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
            <NavLink to="/signup" exact={true} activeClassName="active">Signup</NavLink>
          </>)
      }

    </nav>
  )
}