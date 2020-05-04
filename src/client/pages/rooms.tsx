import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { json } from 'body-parser';
import { IRoom } from '../../server/modals/IRoom';

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

export const RoomList = (props) => {
  const roomsDOM = [];
  Object.keys(props.rooms).forEach((k: string) => {
    const room: IRoom = props.rooms[k];
    roomsDOM.push(<li key={room.id}>
      <a href={`/room/${room.id}`}>{room.name}</a>
    </li>);
  })
  return (
    <ul>
      {roomsDOM}
    </ul>
  );
}

let updateTimer: NodeJS.Timeout;

export const Rooms = (props) => {
  usePageViews();

  const [rooms, setRooms] = useState({});

  const reqRooms = () => {
    fetch('/api/rooms').then(async res => JSON.parse(await res.json())).then(setRooms);
  }

  if (updateTimer) clearInterval(updateTimer)
  updateTimer = setInterval(reqRooms, 500);


  return (
    <RoomList rooms={rooms} />
  )
}