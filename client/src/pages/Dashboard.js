import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";


const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [ skilledUsers, setSkilledUsers ] = useState(null)
  // const [ allUsers, setAllUsers ] = useState(null)
  const [lastDirection, setLastDirection] = useState()

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const getAllUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/all-users', {
  //       params: {dob_year: user?.dob_year}
  //     })
  //     setAllUsers(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const getSkilledUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/skillfiltered-users', {
        params: {subject: user?.subject}
      })
      console.log(response.data)
      setSkilledUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUser()
}, [])

useEffect(() => {
if (user) {
  getSkilledUsers()
}
}, [user])

// useEffect(() => {
//   if (user) {
//     getAllUsers()
//   }
//   }, [user])




const updateMatches = async (matchedUserId) => {
  try {
    await axios.put('http://localhost:8000/addmatch', {
      userId,
      matchedUserId
    })
    getUser()
  } catch (err) {
    console.log(err)
  }
}



  const swiped = (direction, swipedUserId) => {

    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)
  console.log(matchedUserIds)


  const filteredSkilledUsers = skilledUsers?.filter(
    skilledUser => !matchedUserIds.includes(skilledUser.user_id)
  )
  console.log(filteredSkilledUsers)
//   const filteredAllUsers = allUsers?.filter(
//     allUser => !matchedUserIds.includes(allUser.user_id)
//   )
// console.log(filteredAllUsers)
  return (
    <>
    {user && 
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swipe-container">
        <div className="card-container">
        {filteredSkilledUsers?.map((skilledUser) =>
          <TinderCard className='swipe' key={skilledUser.user_id} onSwipe={(dir) => swiped(dir, skilledUser.user_id)} onCardLeftScreen={() => outOfFrame(skilledUser.first_name)}>       
            <div style={{ backgroundImage: 'url(' + skilledUser.url + ')' }} className='card'>
              <h3>{skilledUser.first_name}</h3>
            </div>
          </TinderCard>
        )}
        <div className="swipe-info">
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
        </div>
        </div>
      </div>
    </div>
}
</>
  )
}






export default Dashboard;
