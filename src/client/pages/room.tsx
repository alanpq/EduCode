import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'

import { leaveRoom, subscribeToRoom, RoomConnectionOptions, me } from '../modules/Room';
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
      userDOM.push(<li key={usr.id} className={usr.id == me?.id ? "me" : ""}>{usr.displayName} {usr.id == props.host ? '- host' : ''} {usr.id == me?.id ? '(you)' : ''}</li>);
    })
  }
  return (
    <ul>
      {userDOM}
    </ul>
  )
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const Room = (props) => {
  // usePageViews();
  const { id } = useParams();
  const [roomState, setRoomState]: [IRoom, any] = useState(null);
  const [connectingState, setConnecting] = useState(false);

  const history = useHistory();
  const query = useQuery();

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
    joinRoom({ roomID: id, password: query.get('pass'), user: null })
    setConnecting(true);
  }

  return (
    <div>
      <h1>{roomState?.name}</h1>
      <h3>RoomID: {id}</h3>
      <h4>HostID: {roomState?.host}</h4>
      <a onClick={leaveRoom}>Leave Room</a>
      <Chat users={roomState?.connections} host={roomState?.host} />
    </div>
  )
}