import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { DefaultLayout } from './layouts/default'
import { Navigation } from './components/nav'
import { Home } from './pages/home';
import { Login } from './pages/login';

import '../../public/style/default.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function Main() {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

ReactDOM.render(<Main></Main>, document.querySelector(".react"));