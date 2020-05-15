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

export const Signup = (props) => {
  usePageViews();

  const submitForm = (e) => {
    console.log(e)
    e.preventDefault()
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      })
    } as unknown).then((e) => {
      console.log(e)
    })
  }

  return (
    <form className="solo-form" action="" onSubmit={submitForm}>
      <h1>Sign up</h1>
      <label htmlFor="username">Username:</label>
      <input name="username" id="username" placeholder="username" />
      <label htmlFor="email">Email:</label>
      <input name="email" id="email" type="text" placeholder="email@example.com" />
      <label htmlFor="password">Password:</label>
      <input name="password" id="password" type="password" placeholder="password" />
      <input type="submit" value="Sign up" />
    </form>
  )
}