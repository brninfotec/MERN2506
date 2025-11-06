import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Dashboad() {
  let userDetails = useSelector((store)=>{
    return store.userDetails;
  });
  console.log(userDetails);

  let onDeleteAccount = async()=>{
    let dataToSend = new FormData();

    dataToSend.append("email",userDetails.email);

    let url = `http://localhost:2222/deleteProfile?email=${userDetails.email}`

    let JSONData = await fetch(url,{method:"DELETE"});
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg)
  }
  return (
    <div>
      <TopNavigation/>
      <button type='button' onClick={()=>{
          onDeleteAccount();
      }}>Delete Account</button>
      <h1>Dashboard</h1>
      <h2>{userDetails.firstName} {userDetails.lastName}</h2>
      <img src={`http://localhost:2222/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Dashboad
