import * as React from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { createRoom } from '../modules/Room';
export const Home = (props) => {

  let location = useLocation();
  let history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault()

    createRoom({
      name: e.target[0].value,
      password: e.target[1].value,
      capacity: parseInt(e.target[2].value),
    }).then((id) => {
      console.log(`Room ${id} created.`)
      history.push(`/room/${id}`)
    })
  }

  return (
    <div>
      home
      <form action="" onSubmit={formSubmit}>
        <label htmlFor="name">Room Name</label>
        <input id="name" name="name" required placeholder="Room Name" />
        <label htmlFor="pwd">Room Password</label>
        <input id="pwd" name="pwd" type="password" placeholder="Room Password" />
        <label htmlFor="capacity">Room Capacity</label>
        <input id="capacity" name="capacity" required type="number" defaultValue="5" />

        <input type="submit" value="Create Room" />
      </form>
    </div>
  )
}