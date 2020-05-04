import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'

import { subscribeToRoom, RoomConnectionOptions } from '../modules/Room';
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

  const joinRoom = (room: RoomConnectionOptions) => {
    subscribeToRoom(room, (state) => {
      console.log('Got room state.')
      setRoomState(state)
    }, (err) => {
      console.error(err);
      switch (err) {
        case ConnError.ROOM_MAX_CAPACITY:
          alert('Room full.')
          history.push('/')
          break;
        case ConnError.UNAUTHORIZED:
          const pwd = prompt('Enter password')
          if (pwd != null)
            joinRoom({ roomID: room.roomID, password: pwd, user: room.user })
          else
            history.push('/')
          break;
        default:
          alert('Error.')
          history.push('/')
          break
      }
    })
  }

  if (!connectingState) {
    joinRoom({ roomID: id, password: '', user: null })
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