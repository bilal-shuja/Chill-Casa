import React from 'react';
import colorScheme from "../Colors/Styles.js";


const Filter = ({
            PackageData,DepositData, InvestData,BalanceData ,PromotionData,StopPromotionData,
              luckyDrawData,ParticipantData,MemeberData,BalanceSheetData,RetBalanceSheetData,DateFilter,StatusFilter,
              PhoneFilter , PriceStatus, UsernameFilter,PackageTableIdentifier, DepoSheetIdentifier,InvestmentSheetIdentifier,
              BalanceSheetIdentifier,PromotionSheetIdentifier,StopPromoSheetIdentifier,LuckyDrawSheetIdentifier,ParticipantSheetIdentifier,
              MemberSheetIdentifier,ShareBalanceSheetIdentifier,RetBalanceSheetIdentifier
            }) => {



    function searchByDate(e){
      if(PackageTableIdentifier){
        if(e.target.value !== " "){
          const dateFilter = PackageData.filter((items)=> items.Idate === e.target.value)
          DateFilter(dateFilter)      
        }
        else{
          DateFilter(PackageData)
        }
      }
   
      else if(DepoSheetIdentifier){
        if(e.target.value !== " "){
          const dateFilter = DepositData.filter((items)=> items.Idate === e.target.value)
          DateFilter(dateFilter)      
        }
        else{
          DateFilter(DepositData)
        }
      }
    else if(InvestmentSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = InvestData.filter((items)=> items.Created_at === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(InvestData)
      }
    }
    else if(BalanceSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = BalanceData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(BalanceData)
      }

    }
    else if(PromotionSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = PromotionData.filter((items)=> items.Idate === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(PromotionData)
      }
    }
    else if(StopPromoSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = StopPromotionData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(StopPromotionData)
      }
    }
    else if(LuckyDrawSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = luckyDrawData.filter((items)=> items.Idate === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(luckyDrawData)
      }

    }
    else if(ParticipantSheetIdentifier){
      if(e.target.value !== " "){
        const dateFilter = ParticipantData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(ParticipantData)
      }
    }
    else if(MemberSheetIdentifier){

      if(e.target.value !== " "){
        const dateFilter = MemeberData.filter((items)=> items.Idate === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(MemeberData)
      }
    }
    else if(ShareBalanceSheetIdentifier){

      if(e.target.value !== " "){
        const dateFilter = BalanceSheetData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(BalanceSheetData)
      }
    }
    else if(RetBalanceSheetIdentifier){

      if(e.target.value !== " "){
        const dateFilter = RetBalanceSheetData.filter((items)=> items.date === e.target.value)
        DateFilter(dateFilter)      
      }
      else{
        DateFilter(RetBalanceSheetData)
      }
    }
      
      else{
        return null;
      }
    }

    function searchByStatus(e){
      if(PackageTableIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = PackageData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(PackageData)
        }
  
      }
      else if(DepoSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = DepositData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(DepositData)
        }
      }
      else if(PromotionSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = PromotionData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(PromotionData)
        }
      }
      
      else if(InvestmentSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = InvestData.filter((items)=> items.Status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(InvestData)
        }
      }
      else if(BalanceSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = BalanceData.filter((items)=> items.Status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(BalanceData)
        }

      }
      else if(LuckyDrawSheetIdentifier){
        if(e.target.value !== "All"){
          const statusFilter = luckyDrawData.filter((items)=> items.status === e.target.value)
          StatusFilter(statusFilter)
        }
        else{
          StatusFilter(luckyDrawData)
        }

      }
      else{
        return null;
      }
     

    }
    
    function searchByPrice(e){
      if(PackageTableIdentifier){
  
      if(e.target.value === "H-to-L"){

        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.price-a.price)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){

        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.price-b.price)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(DepoSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.amount-a.amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.amount-b.amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }

    }
    else if(InvestmentSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Price-a.Price)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Price-b.Price)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(BalanceSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.amount-a.amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.amount-b.amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(PromotionSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.amount-a.amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.amount-b.amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(StopPromoSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Amount-a.Amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Amount-b.Amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }
    }
    else if(LuckyDrawSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.fees-a.fees)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.fees-b.fees)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.id-a.id)
          return temparr
          
         })
      }

    }
    else if(ParticipantSheetIdentifier){
      if(e.target.value === "H-to-L"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.Amount-a.Amount)
          return temparr
          
         })
      }
      else if(e.target.value === "L-to-H"){
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => a.Amount-b.Amount)
          return temparr
          
         })
      }
      else{
        PriceStatus(p => {
          const temparr = [...p]
          temparr.sort((a,b) => b.mem_id-a.mem_id)
          return temparr
          
         })
      }

    }
    else{
      console.log("")
    }

    }

    function searchByPhone(e){
      if(DepoSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = DepositData.filter((items)=> items.phone === e.target.value)
          PhoneFilter(phoneFilter)      
        }
        else{
          PhoneFilter(DepositData)
        }
  

      }
   
      else if(MemberSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = MemeberData.filter((items)=> items.phone === e.target.value)
          PhoneFilter(phoneFilter)      
        }
        else{
          PhoneFilter(MemeberData)
        }
  
      }
      else if(PromotionSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = PromotionData.filter((items)=> items.phone === e.target.value)
          PhoneFilter(phoneFilter)      
        }
        else{
          PhoneFilter(PromotionData)
        }
  
      }
      else if(ShareBalanceSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = BalanceSheetData.filter((items)=>items.userphone === e.target.value || items.sender_phone === e.target.value)
          PhoneFilter(phoneFilter)      
        }
        else{
          PhoneFilter(BalanceSheetData)
        }
  
      }
      else if(RetBalanceSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = RetBalanceSheetData.filter((items)=>items.userphone === e.target.value || items.sender_phone === e.target.value)
          PhoneFilter(phoneFilter)      
        }
        else{
          PhoneFilter(RetBalanceSheetData)
        }
  
      }

      
       
      else{
        return null;
      }
    }

    
    function searchByUsername(e){
      if(DepoSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = DepositData.filter((items)=> items.username === e.target.value)
          UsernameFilter(phoneFilter)      
        }
        else{
          UsernameFilter(DepositData)
        }
  

      }
   
      else if(MemberSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = MemeberData.filter((items)=> items.username === e.target.value)
          UsernameFilter(phoneFilter)      
        }
        else{
          UsernameFilter(MemeberData)
        }
  
      }
      else if(PromotionSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = PromotionData.filter((items)=>  items.member_name  === e.target.value)
          UsernameFilter(phoneFilter)      
        }
        else{
          UsernameFilter(PromotionData)
        }
  
      }
      else if(ShareBalanceSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = BalanceSheetData.filter((items)=>  items.username  === e.target.value || items.sender_name.toLowerCase()   === e.target.value)
          UsernameFilter(phoneFilter)      
        }
        else{
          UsernameFilter(BalanceSheetData)
        }
  
      }
      else if(RetBalanceSheetIdentifier){
        if(e.target.value !== " "){
          const phoneFilter = RetBalanceSheetData.filter((items)=>  items.username  === e.target.value || items.sender_name.toLowerCase()   === e.target.value)
          UsernameFilter(phoneFilter)      
        }
        else{
          UsernameFilter(RetBalanceSheetData)
        }
  
      }
      else{
        return null;
      }
    }



    
  return (
    <>
    {
      MemberSheetIdentifier || ShareBalanceSheetIdentifier || RetBalanceSheetIdentifier ? null:
        <div className={PromotionSheetIdentifier || StopPromoSheetIdentifier || ParticipantSheetIdentifier?"col-sm-3":"col-sm-3"}>
                    <label htmlFor="" className="form-label">Filter by {LuckyDrawSheetIdentifier || ParticipantSheetIdentifier ? "Fee":"Price"}:</label>
                        <div className="form-group">
                          <select  className="form-control" 
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                              }}
                              onChange={(e)=>searchByPrice(e)}
                              >
                            <option value="All">All</option>
                            <option value="H-to-L">High to Low</option>
                            <option value="L-to-H">Low to High</option>

                          </select>
                        </div>
                    </div>
                    

            }

                    
                    {
                     StopPromoSheetIdentifier || ParticipantSheetIdentifier || MemberSheetIdentifier || ShareBalanceSheetIdentifier || RetBalanceSheetIdentifier? null:
                      <div className="col-sm-3">
                      <label htmlFor="" className="form-label"> Search with Status:</label>
                    <div className="form-group">
                      <select type="text" className="form-control" 
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=>searchByStatus(e)}
                        >
                            <option value="All">All</option>
                            <option value={DepoSheetIdentifier || PromotionSheetIdentifier?"approved":"active"}>{DepoSheetIdentifier || PromotionSheetIdentifier?"approved":"active"}</option>
                            <option value={DepoSheetIdentifier || PromotionSheetIdentifier?"unapproved":"in-active"}>{DepoSheetIdentifier || PromotionSheetIdentifier?"unapproved":"in-active"}</option>
                         </select>
                    </div>
                    </div>
                    }
      
         <div className={PromotionSheetIdentifier || StopPromoSheetIdentifier || ParticipantSheetIdentifier?"col-sm-3":"col-sm-3"}>
                <label htmlFor="" className="form-label "> Search with Date:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Date..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> searchByDate(e)}
                      />
                 </div>
            </div>
{
  DepoSheetIdentifier || MemberSheetIdentifier || PromotionSheetIdentifier || ShareBalanceSheetIdentifier || RetBalanceSheetIdentifier? 
  <div className="col-sm-3">
                <label htmlFor="" className="form-label "> Search with Phone:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Phone..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> searchByPhone(e)}
                      />
                 </div>
            </div>
            :
            null
}

{
  DepoSheetIdentifier || MemberSheetIdentifier || PromotionSheetIdentifier || ShareBalanceSheetIdentifier || RetBalanceSheetIdentifier? 
  <div className="col-sm-3">
                <label htmlFor="" className="form-label "> Search with Username:</label>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search by Username..."
                       style={{
                        background: colorScheme.card_bg_color,
                        color: colorScheme.card_txt_color,
                        }}
                        onChange={(e)=> searchByUsername(e)}
                      />
                 </div>
            </div>
            :
            null
}
            

    </>
  )
}

export default Filter;