import * as React from 'react'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
export const Home = (props) => {

  const location = useLocation();
  const history = useHistory();

  

  return (
    <div>
      home
      
    </div>
  )
}