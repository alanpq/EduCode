import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { DefaultLayout } from './layouts/default'
import { Navigation } from './components/nav'
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Room } from './pages/room';

import '../../public/style/default.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useLocation,
} from 'react-router-dom';
import { Rooms } from './pages/rooms';
import { Signup } from './pages/signup';

function Main() {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/rooms">
            <Rooms />
          </Route>
          <Route path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

ReactDOM.render(<Main></Main>, document.querySelector(".react"));