import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useParams,
} from 'react-router-dom'

import { subscribeToRoom } from '../modules/Room';

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

const Chat = (props) => {
  const userDOM = [];
  if (props.users) {
    props.users.forEach(usr => {
      userDOM.push(<li key={usr}>{usr}</li>);
    })
  }
  return (
    <ul>
      {userDOM}
    </ul>
  )
}

export const Room = (props) => {
  // usePageViews();
  const [roomState, setRoomState] = useState({
    users: ['test', 'test2']
  });
  // subscribeToRoom(setRoomState)

  let { id } = useParams();
  return (
    <div>
      <h3>RoomID: {id}</h3>
      <Chat users={roomState.users} />
    </div>
  )
}