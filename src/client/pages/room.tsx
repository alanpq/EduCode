import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'

import { subscribeToRoom } from '../modules/Room';
import { ConnError } from '../../modals/Errors';
import { IRoom } from '../../server/modals/IRoom';

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
      userDOM.push(<li key={usr.id}>{usr.displayName} {usr.id == props.host ? '- host' : ''}</li>);
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
  const { id } = useParams();
  const [roomState, setRoomState]: [IRoom, any] = useState(null);
  const [connectingState, setConnecting] = useState(false);
  const history = useHistory();
  if (!connectingState) {
    subscribeToRoom({ roomID: id, password: '', user: null }, (state) => {
      console.log('Got room state.')
      setRoomState(state)
    }, (err) => {
      console.error(err);
      switch (err) {
        case ConnError.ROOM_MAX_CAPACITY:
          alert('Room full.')
          break;
        case ConnError.UNAUTHORIZED:
          alert('Wrong password.')
          break;
        default:
          alert('Error.')
          break
      }
      history.push('/')
    })
    setConnecting(true);
  }

  return (
    <div>
      <h1>{roomState?.name}</h1>
      <h3>RoomID: {id}</h3>
      <h4>HostID: {roomState?.host}</h4>
      <Chat users={roomState?.connections} host={roomState?.host} />
    </div>
  )
}