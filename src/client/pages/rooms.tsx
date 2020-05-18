import * as React from 'react'
import {
  useState,
  useEffect,
} from 'react'
import {
  useLocation,
  useHistory,
  NavLink
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
      <NavLink to={`/room/${room.id}`}>{room.name}</NavLink>
    </li>);
  })
  return (
    <ul>
      {roomsDOM}
    </ul>
  );
}


export const Rooms = (props) => {
  usePageViews();

  const [rooms, setRooms] = useState({});
  let updateTimer: NodeJS.Timeout;

  useEffect(() => {
    updateTimer = setInterval(reqRooms, 500);
    return () => {
      clearInterval(updateTimer)
    }
  })

  const reqRooms = () => {
    fetch('/api/rooms').then(async res => await res.json()).then(setRooms);
  }


  return (
    <RoomList rooms={rooms} />
  )
}