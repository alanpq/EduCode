import * as React from 'react'
import { useLocation } from 'react-router-dom'

import '../../../public/style/solo-form.scss'
import { UserContext } from '..';

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

export const Login = (props) => {
  usePageViews();

  const submitForm = (e, setUser) => {
    e.preventDefault()
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      })
    } as unknown).then((res) => res.json()).then((res) => {
      if (res.success) {
        setUser(res.user)
        console.log("Successful login.", res.user)
      } else {
        console.error("Bad Login")
        console.error(res)
      }
    })
  }

  return (
    <UserContext.Consumer>
      {({ user, setUser }) =>
        <form className="solo-form" action="" onSubmit={(e) => { submitForm(e, setUser) }}>
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input id="username" placeholder="username" />
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="password" />
          <input type="submit" value="Log in" />
        </form>
      }
    </UserContext.Consumer>
  )
}