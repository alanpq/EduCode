import * as React from 'react'
import { useState } from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { json } from 'body-parser';

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

export const RoomList = (props) => {
  const roomsDOM = [];
  props.rooms.forEach(room => {
    roomsDOM.push(<li key={room}>
      <a href={`/room/${room}`}>{room}</a>
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
    <RoomList rooms={Object.keys(rooms)} />
  )
}