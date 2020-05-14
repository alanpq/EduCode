import * as React from 'react'

import { NavLink } from 'react-router-dom'

export const NavProfile = (props) => {
  return (
    <section className="profile">
      <a onClick={() => { alert('lol im lazy just refresh the page') }}>Log Out</a>
      <NavLink to="/profile" exact={true} activeClassName="active">Profile</NavLink>
      <a>{props.name}</a>
    </section>
  )
}

export const Navigation = (props) => {
  return (
    <nav>
      <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
      <NavLink to="/rooms" exact={true} activeClassName="active">Rooms</NavLink>
      <span className="flex-grow" />
      {
        (props.user) ? (<>
          <NavLink to="/createroom/" exact={true} activeClassName="active">Create a Room</NavLink>
          <NavProfile name={props.user.username} />
        </>)
          : (<>
            <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
            <NavLink to="/signup" exact={true} activeClassName="active">Signup</NavLink>
          </>)
      }

    </nav>
  )
}