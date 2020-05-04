import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'

import { subscribeToRoom } from '../modules/Room';
import { ConnError } from '../../modals/Errors';

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
      userDOM.push(<li key={usr}>{usr.displayName}</li>);
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
  const [roomState, setRoomState] = useState({
    connections: ['test', 'test2']
  });
  const [connectingState, setConnecting] = useState(false);
  const history = useHistory();
  if (!connectingState) {
    subscribeToRoom({ roomID: id, password: '', user: null }).then(setRoomState).catch((err) => {
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
    }).finally(() => { console.log('Connected to Room.') })
    setConnecting(true);
  }

  return (
    <div>
      <h3>RoomID: {id}</h3>
      <Chat users={roomState.connections} />
    </div>
  )
}