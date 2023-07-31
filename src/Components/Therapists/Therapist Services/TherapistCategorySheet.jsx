import therapistCategoryEndPoint from '../../Api/TherapistCateEndPoint.js';
import React,{useState , useEffect} from 'react';
import colorScheme from '../../Colors/Styles.js';
import "react-toastify/dist/ReactToastify.css";
import ReadMoreReact from 'read-more-react';
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import {useQuery} from 'react-query';
import axios from "axios";


const TherapistCategorySheet = () => {
  const {mutate:deleteCategory} = therapistCategoryEndPoint.useDeleteTherapistCategory();

    const [categories , setCategory] = useState([]);
    const[index , setIndex] = useState('');

  // Getting Therapist Category function:
  useQuery('all_categories',therapistCategoryEndPoint.getAllCategories,{
    onSuccess:(data)=>{
      setCategory(data.data.Categorys)
   },
   onError: (err) => {
    return err;
  }
}

 )

 function removeTherapistCategorySheet() {
  setCategory((prevState) => {
    const category = [...prevState];
    category.splice(index, 1);
    return category;
  });
}


//  Deleting Therapist Category:
    function deleteTherapistCategory(id){
      deleteCategory({id,removeTherapistCategorySheet})
    }



  return (
    <>
         <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper p-3" style={{ background: colorScheme.body_bg_color }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: colorScheme.card_txt_color }}>
                  Services
                </h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">

                <div className="card" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color,boxShadow: colorScheme.box_shadow_one,}}>
                  <div className="card-header">
                    <h5>Services Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">
        {
          categories && categories.length >0 ?
          <table className="table  text-nowrap">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Percentage</th>
              <th>End date</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {      
            
            categories.map((items,index)=>{
                return(
                  <tr key={index} style={{ color: colorScheme.card_txt_color }}>
                  <td>{items.id}</td>
                  <td>{items.title}</td>
                  <td>{items.service_price}</td>
                   <td>{items.duration}</td>
                   <td>{items.percentage}</td>
                  <td>{items.end_date}</td>
                  <td>
                  <ReadMoreReact
                                text={
                                 items.description
                                }
                                min={10}
                                ideal={35}
                                max={90}
                                readMoreText="...Read More"
                  />                               
                  </td>
                  <td>{items.Idate}</td>

                  <td>
                   <div className="d-flex justify-content-center">
                   <Link className="btn btn-outline-info btn-sm" to="/UpdateTherapistCategory" state={{ID:items.id}}>
                        <i className="fa fa-pen"></i>
                      </Link>&nbsp;&nbsp;
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>{
                      deleteTherapistCategory(items.id)
                      setIndex(index)
                    }}>
                        <i className="fa fa-trash"></i>
                      </button>
                   
                    </div>   
                  </td>
                  
                </tr>
                )
              })
            
            }

          </tbody>
        </table>
      :
      <div className="text-center">
      <h2>No Service Found</h2>
      </div>
      }

                    
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    </>
  )
}

export default TherapistCategorySheet