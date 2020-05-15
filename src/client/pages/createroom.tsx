import * as React from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { createRoom } from '../modules/Room';

export const CreateRoom = (props) => {
  const history = useHistory();

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
    <form className="solo-form" action="" onSubmit={formSubmit}>
      <label htmlFor="name">Room Name</label>
      <input id="name" required maxLength="30" placeholder="Room Name" />
      <label htmlFor="pwd">Room Password</label>
      <input id="pwd" type="password" maxLength="30" placeholder="Room Password" />
      <label htmlFor="capacity">Room Capacity</label>
      <input id="capacity" required type="number" defaultValue="5" min="2" max="10" />

      <input type="submit" value="Create Room" />
    </form>
  )
}