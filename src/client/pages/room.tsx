import * as React from 'react'
import {
  useLocation,
  useParams
} from 'react-router-dom'

const usePageViews = () => {
  let location = useLocation();
  React.useEffect(() => {
    // ga.send(["pageview", location.pathname]);
    // TODO: analytics
  }, [location]);
}

const Chat = () => {

}

export const Room = (props) => {
  // usePageViews();

  let { id } = useParams();
  return (
    <div>
      <h3>RoomID: {id}</h3>
    </div>
  )
}