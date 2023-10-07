import './App.css';
import React,{useState, useEffect} from 'react' ;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {QueryClientProvider , QueryClient} from 'react-query';
// import {ReactQueryDevtools} from 'react-query/devtools';

// Layout
import Navbar from './Components/Layout/Navbar.jsx';
import Sidebar from './Components/Layout/Sidebar.jsx';
import Footer from './Components/Layout/Footer.jsx';


// Auth
import Login from './Components/Auth/Login.jsx';
// import Register from './Components/Auth/Register.jsx';

// Admin Comment Section
import AdminCommentSheet from './Components/Admin/AdminCommentSheet.jsx';


// Therapists Section:
import TherapistCategoryForm from './Components/Therapists/TherapistServices/TherapistCategoryForm.jsx';
import TherapistCategorySheet from './Components/Therapists/TherapistServices/TherapistCategorySheet.jsx';
import UpdateTherapistCategory from './Components/Therapists/TherapistServices/UpdateTherapistCategory.jsx';


import RegTherapistForm from './Components/Therapists/TherapistFormAndSheets/RegTherapistForm.jsx';
import UpdateTherapist from './Components/Therapists//TherapistFormAndSheets/UpdateTherapist.jsx';
import TherapistSheet from './Components/Therapists//TherapistFormAndSheets/TherapistSheet.jsx';
import AvailableTherapistSheet from './Components/Therapists/TherapistBooking/TherapistBookingSheet.jsx';
import TherapistCommentSheet from './Components/Therapists/TherapistCommentSection/TherapistCommentSheet.jsx';
import UpdateTherapistCommentSheet from './Components/Therapists/TherapistCommentSection/UpdateComments.jsx';

import TherapistProfile from './Components/Therapists/TherapistProfile/TherapistProfile.jsx';
import UpdateReviewAndRating from './Components/Therapists/TherapistProfile/CommentReviewsAndRatings/UpdateReviewAndRating.jsx';
import UpdateAdminComments from './Components/Therapists/TherapistProfile/CommentReviewsAndRatings/UpdateAdminComment.jsx';

// Promos
import PromoCodeForm from './Components/PromoCode/PromoCodeForm.jsx';
import PromoSheet from './Components/PromoCode/PromoCodeSheet.jsx';


// Notifications

import Notifications from './Components/Notifications/SendNotifications.jsx';

// Members
import MemProfile from './Components/Members/MemProfile.jsx';
import MemberSheet from './Components/Members/MemberSheet.jsx';
import UpdateMemberForm from './Components/Members/UpdateMemForm.jsx';
import StaffQuerySheet from './Components/Members/StaffQuerySheet.jsx';
import StaffTicketSheet from './Components/Members/StaffTicketSheet.jsx';



// Users
import UserSheet from './Components/Users/UserSheet.jsx';
import UpdateUserForm from './Components/Users/UpdateUserForm.jsx';
// import TimeLine from './Components/UserTimeline/UserTimelineSheet.jsx';
// import SuspendedUsers from './Components/Users/SuspendedUserSheet.jsx';

import UserProfile from './Components/Users/UserProfile.jsx';

import UpdateTherapistComment from './Components/Users/UsersForm/UpdateTherapistComment.jsx';
import UpdateAdminNote from './Components/Users/UsersForm/UpdateAdminNote.jsx';

import UserBookingSheet from './Components/Users/UserBookingSheet.jsx';
import UpdateBookingDateTime from './Components/Users/UpdateBookingDateTime.jsx';


// Blog Section:

// import BlogsForm from './Components/Blogs/BlogsForm.jsx';
// import BlogSheet from './Components/Blogs/BlogSheet.jsx';




// Promotions:

// import RewardApprovalSheet from './Components/Promotions/RewardApprovalSheet.jsx';
// import StopPromoSheet from './Components/Promotions/StopPromotionSheet.jsx';


// Payment Section:

// import PaymentForm from './Components/Payments/PaymentForm.jsx';
// import PaymentSheet from './Components/Payments/PaymentSheet.jsx';
// import UpdatePaymentSheet from './Components/Payments/UpdatePaymentForm.jsx';





// Statistics:

import ChillCasaExpenseChart from './Components/Statistics/ChillCasaExpenseChart.jsx';
import ChillCaseRevenueChart from './Components/Statistics/ChillCaseRevenueChart.jsx';
import TherapistRevenueChart from './Components/Statistics/TherapistRevenueChart.jsx';
import ExpenseForm from './Components/Statistics/ChillCaseExpenseForm.jsx';



// Tips&Tricks:

// import TipsTricksForm from './Components/Tips&Tricks/TipsTricksForm.jsx';
// import TipsTrickSheet from './Components/Tips&Tricks/TipsTrickSheet.jsx';

// Help Center
import HelpCenter from './Components/HelpCenter/HelpCenter.jsx';
import HelpChatCenter from './Components/HelpCenter/HelpChatCenter.jsx';
// import LiveChat from './Components/HelpCenter/LiveChat.jsx';
// import LiveChatCenter from './Components/HelpCenter/LiveChatCenter.jsx';




const queryClient = new QueryClient();

function App() {

  const[login , setLogin] = useState(false)
  const SetLocalLogin= async ()=>{
    try{
      let userLogin = await localStorage.getItem('login');
      let parsed = JSON.parse(userLogin);
      if(parsed !== null){
        setLogin(parsed);
      }
    }catch{
        return null;
    }
  }





  useEffect(() => {
  SetLocalLogin()
  const EventEmitter = require('events');
  EventEmitter.defaultMaxListeners = 1000;
  }, [])


  return (  
  <QueryClientProvider client = {queryClient}>
    <div className="wrapper">
    <React.StrictMode>
      {
        login === false?
            <Router>
            <Routes>
            <Route path="/" element={<Login/>}/>
            {/* <Route path="/Registeration" element={<Register/>}/> */}
          </Routes>
      </Router>

        :

           <Router>
           <Navbar/>
           <Sidebar/>
           <Routes>
           <Route path="/" element={<MemProfile/>}/>

           <Route path="/UserSheet" element={<UserSheet />}/>
           <Route path="/UserProfile/:ID" element={<UserProfile />}/>
          
           
           <Route path="/UpdateAdminNote/:UserID" element={<UpdateAdminNote />}/>
           <Route path="/UpdateTherapistComment/:UserID" element={<UpdateTherapistComment />}/>



           <Route path="/UpdateUserForm" element={<UpdateUserForm/>}/>
           <Route path="/UserBookingSheet" element={<UserBookingSheet/>}/>
           <Route path="/UpdateBookingDateTime" element={<UpdateBookingDateTime/>}/>            

           <Route path="/AdminCommentSheet" element={<AdminCommentSheet/>}/>

         
           <Route path="/TherapistCategoryForm" element={<TherapistCategoryForm/>}/>
           <Route path="/TherapistCategorySheet" element={<TherapistCategorySheet/>}/>
           <Route path="/UpdateTherapistCategory" element={<UpdateTherapistCategory/>}/>

           <Route path="/TherapistCommentSheet" element={<TherapistCommentSheet/>}/>
           <Route path="/UpdateTherapistCommentSheet" element={<UpdateTherapistCommentSheet/>}/>

           <Route path="/TherapistProfile/:ID" element={<TherapistProfile/>}/>
           <Route path="/UpdateReviewAndRating/:TherapistID" element={<UpdateReviewAndRating/>}/>
           <Route path="/UpdateAdminComments/:TherapistID" element={<UpdateAdminComments/>}/>


           <Route path="/RegTherapistForm" element={<RegTherapistForm/>}/>
           <Route path="/TherapistSheet" element={<TherapistSheet/>}/>
           <Route path="/UpdateTherapist" element={<UpdateTherapist/>}/>
           <Route path="/AvailableTherapistSheet" element={<AvailableTherapistSheet/>}/>
          
           <Route path="/PromoSheet" element={<PromoSheet/>}/>
           <Route path="/PromoCodeForm" element={<PromoCodeForm/>}/>
           <Route path="/ExpenseForm" element={<ExpenseForm/>}/>

           <Route path="/Notifications" element={<Notifications/>}/>


           <Route path="/MemberSheet" element={<MemberSheet/>}/>
           <Route path="/UpdateMemberForm" element={<UpdateMemberForm/>}/>
           <Route path="/StaffQuerySheet" element={<StaffQuerySheet/>}/>
           <Route path="/StaffTicketSheet" element={<StaffTicketSheet/>}/>


           <Route path="/ChillCasaExpenseChart" element={<ChillCasaExpenseChart/>}/>
           <Route path="/ChillCaseRevenueChart" element={<ChillCaseRevenueChart/>}/>
           <Route path="/TherapistRevenueChart" element={<TherapistRevenueChart/>}/>   

           
           {/* <Route path="/PaymentForm" element={<PaymentForm/>}/>
           <Route path="/PaymentSheet" element={<PaymentSheet/>}/>
           <Route path="/UpdatePaymentSheet" element={<UpdatePaymentSheet/>}/> */}

           <Route path="/HelpCenter" element={<HelpCenter/>}/>
           <Route path="/HelpChatCenter" element={<HelpChatCenter/>}/>
           
           {/* <Route path="/LiveChat" element={<LiveChat/>}/>
           <Route path="/LiveChatCenter" element={<LiveChatCenter/>}/> */}

           
           </Routes>
           <Footer/>
           </Router>


}
</React.StrictMode>
    </div>
    {/* <ReactQueryDevtools initialIsOpen = {false} position='bottom-right'/> */}
</QueryClientProvider>
  );
}

export default App;
