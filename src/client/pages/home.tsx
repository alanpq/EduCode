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
      <button onClick={() => {
        createRoom({
          capacity: 5,
          name: 'sup',
          password: '',
        }).then((id) => {
          history.push(`/room/${id}`)
        })
      }}>Create Room</button>
    </div>
  )
}