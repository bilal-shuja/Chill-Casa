import SendNotification from '../Notifications/SendNotifications';
import React,{useState , useEffect} from 'react';
import colorScheme from '../Colors/Styles.js';
import Profile from '../Images/avatar5.jpg';
import { useQuery } from 'react-query';
import axios from 'axios';

const MemProfile = () => {

  // useEffect(() => {
  //   SetLocalLogin()
  // }, [])




  const[mem , setMem] = useState('');
  const[amount , setAmount] = useState('');
  const [memID , setMemID] = useState('')
  
  // Getting admin information from local storage:

  // const SetLocalLogin = async () => {
  //   try {
  //     let userObj = await localStorage.getItem('user');
  //     let parseUserObj = JSON.parse(userObj)
      
  //     if (parseUserObj !== null) {
  //       gettingMembers(parseUserObj.id);
  //       gettingTotalAmount(parseUserObj.id)
  //       setMemID(parseUserObj.id)

  //     }

  //   } catch {
  //     return null;
  //   }
  // }



  // function gettingSingleMember(){
  //   return axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${memID}`)

  // }

  // function gettingTotals(){
  //   return axios.post(`${process.env.REACT_APP_BASE_URL}fetch_totals`,5)
  // }



//   const {isLoading ,isFetching ,data , isError , error} = useQuery('Ind-mem-info', gettingSingleMember,  {
//      refetchOnWindowFocus:true,

   
//     })

// if(data === undefined){
//   console.log("No data")
// }
// else{
//   console.log(data?.data.data.username)
// }
// if(isError){
//   console.log(error.message)
// }




// Function for fetching specific member:

  // function gettingMembers(id){
  //   axios.post(`${process.env.REACT_APP_BASE_URL}fetchuserwithid/${id}`)
  //   .then((res)=>{
  //     setMem(res.data.data)
  //   })
  //   .catch((error)=>{
  //     return null;
  //   })
  // }


  // Function for getting total balance of member:

  // function gettingTotalAmount(id){
  //   const memIdObj ={
  //     user_id:id
  //   }
  //   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_totals`,memIdObj)
  //   .then((res)=>{
  //     setAmount(res.data.Total_balance)
  //   })
  //   .catch((error)=>{
  //     return null;

  //   })
  // }



  

  return (
    <>
<div className="content-wrapper" style={{background:colorScheme.body_bg_color}}>
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={{color:colorScheme.card_txt_color}}>Profile</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            {/* <li className="breadcrumb-item" ><a href="#" style={{color:colorScheme.card_txt_color}} onClick={logOut}><i className="fa-solid fa-lock fa-2x"></i></a></li> */}

          </ol>
        </div>
      </div>
    </div>
  </section>
<section className="content">
  <div className="container-fluid">
    <div className="row ">
    <div className="col-lg-4">
        <div className="card p-1" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
        <div className="card-body">
            <div className="text-center">
                <img className="img-fluid img-circle"src={Profile} alt="User_profile_picture" width={123} />
            </div>
            <h3 className="profile-username text-center">Admin</h3>
            <p className="text-center mt-4">Chill Casa Co.</p>
            <p  className="text-center">Bay Area, San Francisco, CA</p>
            
            <div className="text-center">
            <button className="btn btn-info col-4" onClick={()=>{
              SendNotification("userID","Withdrawal Rejection", "queryOne")
              
            }}>Follow</button>&nbsp;&nbsp;
            <button className="btn btn-outline-info col-4">Message</button>
            </div>
       
        </div>
        </div>
    </div>
     
      <div className="col-lg-8">
      <div className="card" style={{background:colorScheme.card_bg_color,color:colorScheme.card_txt_color, boxShadow:colorScheme.box_shadow_one}}>
          <div className="card-body">
              <div className="row">
                  <div className="col-sm-3">
                  <i className="fa-solid fa-user fa-2x"></i>
                  </div>
                  <div className="col-sm-9 d-flex align-self-center">
                  {/* <h5 class=" mb-0">{ mem.username}</h5> */}
                  <h5 class=" mb-0">Admin</h5>

                  </div>
              </div>

              <hr />
              <div className="row">
                  <div className="col-sm-3">
                  <i className="fa-solid fa-envelope fa-2x"></i>
                  </div>
                  <div className="col-sm-9 d-flex align-self-center">
                  {/* <h5 class=" mb-0">{mem.email}</h5> */}
                  <h5 class=" mb-0">admin11@chillcase.com</h5>

                  </div>
              </div>

              <hr style={{color:colorScheme.card_txt_color}}/>

              <div className="row">
                  <div className="col-sm-3">
                  <i className="fa-solid fa-phone fa-2x"></i>
                  </div>
                  <div className="col-sm-9 d-flex align-self-center">
                  <h5 class=" mb-0">091-666116-091</h5>
                  </div>
              </div>

                  <hr />
              <div className="row">
                  <div className="col-sm-3">
                  <i className="fa-solid fa-money-bill-wave fa-2x"></i>
                  </div>
                  <div className="col-sm-9 d-flex align-self-center">
                  <h5 class=" mb-0">25000</h5>
                  </div>
              </div>
              <hr />
              
              <div className="row ">
                <div className="col-sm-3">
              <i className="fa-solid fa-file-signature fa-2x"></i>
                </div>
                <h4>{`Your referral code is PHRNEL`}</h4>
                  
              </div>
          </div>
          
      </div>
  </div>
    
   
    </div>
  </div>
</section>

</div>

    </>
  )
}

export default MemProfile