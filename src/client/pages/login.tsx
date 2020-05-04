import * as React from 'react'
import { useLocation } from 'react-router-dom'

import '../../../public/style/solo-form.scss'

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

export const Login = (props) => {
  usePageViews();

  return (
    <form className="solo-form">
      <h1>Login</h1>
      <label htmlFor="username">Username:</label>
      <input name="username" id="username" placeholder="username" />
      <label htmlFor="password">Password:</label>
      <input name="password" id="password" type="password" placeholder="password" />
      <input type="submit" value="Log in" />
    </form>
  )
}