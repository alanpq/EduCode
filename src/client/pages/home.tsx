import * as React from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { createRoom } from '../modules/Room';
export const Home = (props) => {

  let location = useLocation();
  let history = useHistory();
  return (
    <div>
      home
      <form htmlaction="#" onSubmit={(e) => {
        console.log(e.target[0])
        createRoom({
          name: e.target[0],
          password: e.target[1],
          capacity: parseInt(e.target[2]),
        }).then((id) => {
          history.push(`/room/${id}`)
        })
        e.preventDefault()
      }}>
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