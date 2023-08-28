import './App.css';
import React,{useState, useEffect} from 'react' ;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {QueryClientProvider , QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

// Layout
import Navbar from './Components/Layout/Navbar.jsx';
import Sidebar from './Components/Layout/Sidebar.jsx';
import Footer from './Components/Layout/Footer.jsx';


// Auth
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';


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
import UpdateReviewAndRating from './Components/Therapists/TherapistProfile/UpdateReviewAndRating.jsx';
import UpdateAdminComments from './Components/Therapists/TherapistProfile/UpdateAdminComment.jsx';

// Promos
import PromoCodeForm from './Components/PromoCode/PromoCodeForm.jsx';
import PromoSheet from './Components/PromoCode/PromoCodeSheet.jsx';


// Expense Section:

import ExpenseForm from './Components/Statistics/ChillCaseExpenseForm.jsx';


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
import TimeLine from './Components/UserTimeline/UserTimelineSheet.jsx';
import SuspendedUsers from './Components/Users/SuspendedUserSheet.jsx';

import UserProfile from './Components/Users/UserProfile.jsx';

import UpdateTherapistComment from './Components/Users/UsersForm/UpdateTherapistComment.jsx';
import UpdateAdminNote from './Components/Users/UsersForm/UpdateAdminNote.jsx';

import UserBookingSheet from './Components/Users/UserBookingSheet.jsx';
import UpdateBookingDateTime from './Components/Users/UpdateBookingDateTime.jsx';


// Admin Comment Section
import AdminCommentSheet from './Components/Admin/AdminCommentSheet.jsx';


// Blog Section
import BlogsForm from './Components/Blogs/BlogsForm.jsx';
import BlogSheet from './Components/Blogs/BlogSheet.jsx';

// Packages 
import AddPackageForm from './Components/Packages/AddPackagesForm.jsx';
import PackageSheet from './Components/Packages/PackagesTable.jsx';
import UpdatePackageForm from './Components/Packages/UpdatePackageForm.jsx';

// Deposits
import AllDepositsSheet from './Components/Deposits/AllDepositsSheet.jsx';
import BalanceSheet from './Components/Deposits/BalanceSheet.jsx';
import RejectDepositSheet from './Components/Deposits/RejectDepositSheet.jsx';

// Investments & Withdrawals
import WithdrawalSheet from './Components/Withdrawals/WithdrawalSheet.jsx';
import WithdrawalRejectSheet from './Components/Withdrawals/WithdrawalRejectionSheet.jsx';

// Promotions
import RewardApprovalSheet from './Components/Promotions/RewardApprovalSheet.jsx';
import StopPromoSheet from './Components/Promotions/StopPromotionSheet.jsx';

// Lucky Draw
import AddLuckyDrawForm from './Components/LuckyDraw/AddLuckyDraw.jsx';
import LuckyDrawSheet from './Components/LuckyDraw/LuckyDrawSheet.jsx';
import ParticipantSheet from './Components/LuckyDraw/ParticipantSheet.jsx';

import PaymentForm from './Components/Payments/PaymentForm.jsx';
import PaymentSheet from './Components/Payments/PaymentSheet.jsx';
import UpdatePaymentSheet from './Components/Payments/UpdatePaymentForm.jsx';

// Levels
import AddLevelForm from './Components/Levels/AddLevelForm.jsx';
import LevelSheet from './Components/Levels/LevelSheet.jsx';
import LevelRewardSheet from './Components/Levels/LevelRewardSheet.jsx';


// Share Balance
import ShareBalanceForm from './Components/ShareBalance/ShareBalanceForm.jsx';
import ShareBalanceSheet from './Components/ShareBalance/ShareBalanceSheet.jsx';
import RetBalanceSheet from './Components/ShareBalance/RetBalance.jsx';

// Deduct Balance Sheet
import DeductBalanceForm from './Components/DeductBalance/DeductBalanceForm.jsx';
import DeductBalanceSheet from './Components/DeductBalance/DeductBalanceSheet.jsx';



// Statistics
import ChillCasaExpenseChart from './Components/Statistics/ChillCasaExpenseChart.jsx';
import ChillCaseRevenueChart from './Components/Statistics/ChillCaseRevenueChart.jsx';
import TherapistRevenueChart from './Components/Statistics/TherapistRevenueChart.jsx';



// Tips&Tricks
import TipsTricksForm from './Components/Tips&Tricks/TipsTricksForm.jsx';
import TipsTrickSheet from './Components/Tips&Tricks/TipsTrickSheet.jsx';

// Help Center
import HelpCenter from './Components/HelpCenter/HelpCenter.jsx';
import HelpChatCenter from './Components/HelpCenter/HelpChatCenter.jsx';
import LiveChat from './Components/HelpCenter/LiveChat.jsx';
import LiveChatCenter from './Components/HelpCenter/LiveChatCenter.jsx';




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
  }, [])
  return (
    
    
      <QueryClientProvider client = {queryClient}>
    <div className="wrapper">
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
           <Route path="/UserProfile" element={<UserProfile />}/>
          
           
           <Route path="/UpdateAdminNote" element={<UpdateAdminNote />}/>
           <Route path="/UpdateTherapistComment" element={<UpdateTherapistComment />}/>



           <Route path="/UpdateUserForm" element={<UpdateUserForm/>}/>
           <Route path="/TimeLine" element={<TimeLine/>}/>
           <Route path="/SuspendedUsers" element={<SuspendedUsers/>}/>
           <Route path="/UserBookingSheet" element={<UserBookingSheet/>}/>
           <Route path="/UpdateBookingDateTime" element={<UpdateBookingDateTime/>}/>            

           <Route path="/AdminCommentSheet" element={<AdminCommentSheet/>}/>


           <Route path="/BlogsForm" element={<BlogsForm/>}/>
           <Route path="/BlogSheet" element={<BlogSheet/>}/>


         
           <Route path="/TherapistCategoryForm" element={<TherapistCategoryForm/>}/>
           <Route path="/TherapistCategorySheet" element={<TherapistCategorySheet/>}/>
           <Route path="/UpdateTherapistCategory" element={<UpdateTherapistCategory/>}/>

           <Route path="/TherapistCommentSheet" element={<TherapistCommentSheet/>}/>
           <Route path="/UpdateTherapistCommentSheet" element={<UpdateTherapistCommentSheet/>}/>

           <Route path="/TherapistProfile" element={<TherapistProfile/>}/>
           <Route path="/UpdateReviewAndRating" element={<UpdateReviewAndRating/>}/>

           <Route path="/UpdateAdminComments" element={<UpdateAdminComments/>}/>


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


           <Route path="/AddPackageForm" element={<AddPackageForm/>}/>
           <Route path="/PackageSheet" element={<PackageSheet/>}/>
           <Route path="/UpdatePackageForm" element={<UpdatePackageForm/>}/>
          
           
           <Route path="/AllDepositsSheet" element={<AllDepositsSheet/>}/>
           <Route path="/BalanceSheet" element={<BalanceSheet/>}/>
           <Route path="/RejectDepositSheet" element={<RejectDepositSheet/>}/>


           <Route path="/WithdrawalSheet" element={<WithdrawalSheet/>}/>
           <Route path="/WithdrawalRejectSheet" element={<WithdrawalRejectSheet/>}/>


           <Route path="/RewardApprovalSheet" element={<RewardApprovalSheet/>}/>
           <Route path="/StopPromotionSheet" element={<StopPromoSheet/>}/>

           <Route path="/AddLuckyDrawForm" element={<AddLuckyDrawForm/>}/>
           <Route path="/LuckyDrawSheet" element={<LuckyDrawSheet/>}/>
           <Route path="/ParticipantSheet" element={<ParticipantSheet/>}/>

           <Route path="/ChillCasaExpenseChart" element={<ChillCasaExpenseChart/>}/>
           <Route path="/ChillCaseRevenueChart" element={<ChillCaseRevenueChart/>}/>
           <Route path="/TherapistRevenueChart" element={<TherapistRevenueChart/>}/>


           <Route path="/AddLevelForm" element={<AddLevelForm/>}/>
           <Route path="/LevelSheet" element={<LevelSheet/>}/>
           <Route path="/LevelRewardSheet" element={<LevelRewardSheet/>}/>    

           <Route path="/ShareBalanceForm" element={<ShareBalanceForm/>}/>
           <Route path="/ShareBalanceSheet" element={<ShareBalanceSheet/>}/> 
           <Route path="/RetBalanceSheet" element={<RetBalanceSheet/>}/> 

           <Route path="/DeductBalanceForm" element={<DeductBalanceForm/>}/>
           <Route path="/DeductBalanceSheet" element={<DeductBalanceSheet/>}/>    


           <Route path="/TipsTricksForm" element={<TipsTricksForm/>}/>
           <Route path="/TipsTrickSheet" element={<TipsTrickSheet/>}/>

           
           <Route path="/PaymentForm" element={<PaymentForm/>}/>
           <Route path="/PaymentSheet" element={<PaymentSheet/>}/>
           <Route path="/UpdatePaymentSheet" element={<UpdatePaymentSheet/>}/>

           <Route path="/HelpCenter" element={<HelpCenter/>}/>
           <Route path="/HelpChatCenter" element={<HelpChatCenter/>}/>
           
           <Route path="/LiveChat" element={<LiveChat/>}/>
           <Route path="/LiveChatCenter" element={<LiveChatCenter/>}/>

           
           </Routes>
           <Footer/>
           </Router>


}
   
    </div>
    {/* <ReactQueryDevtools initialIsOpen = {false} position='bottom-right'/> */}
</QueryClientProvider>
  );
}

export default App;
