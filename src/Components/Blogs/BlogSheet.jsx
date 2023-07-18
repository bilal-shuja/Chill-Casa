import ConfirmQuery from '../ConfirmQuery/ConfirmQueryModal';
import blogEndPoints from '../Api/BlogEndPoints.js';
import colorScheme from '../Colors/Styles.js';
import {useQuery} from 'react-query';
import {useState} from 'react';


const BlogSheet = () => {
  const [blogs , setBlogs] = useState([]);
  
  const {mutate:delBlog} = blogEndPoints.useDeleteBlog();

 useQuery('all_blogs',blogEndPoints.getAllBlogs,{
    onSuccess:(data)=>{
      setBlogs(data.data.Blogs)
   },
   onError: (err) => {
    return err;
  }
}

 )

 const deleteBlogs = (id)=>{
  delBlog(id)
  }



  function BlogSheetFun({items , index}){
    const[isShow,setShow] = useState(false);

    function onActionBack (val){
      setShow(false)
      if(val === "Yes"){
    
        deleteBlogs(items.id)
     }
      else{
        
       return null;
      }
    
     }

     return(
      <>
       <tr key={index} style={{ color: colorScheme.card_txt_color }}>
       <td>{items.id}</td>
       <td>{items.auther_name}</td>
       <td>{items.title}</td>
        <td>
         <img className="img-fluid" src={`${process.env.REACT_APP_IMG_URL}${items.blog_image}`} alt="" width={75} />
        </td>
       <td>{items.Idate}</td>
       <td>
        <div className="d-flex justify-content-center">
        {/* <Link className="btn btn-outline-info btn-sm" to="/UpdatePaymentSheet" state={{ID:items.id}}>
             <i className="fa fa-pen"></i>
           </Link>&nbsp;&nbsp; */}
         <button className="btn btn-outline-danger btn-sm" onClick={() => setShow(true)}>
             <i className="fa fa-trash"></i>
           </button>
        
         </div>   
       </td>
         <ConfirmQuery
           isShow={isShow}
           body={`Are you sure you want to delete this "${items.title}" Blog?`}
           action={onActionBack}
         />
        </tr>
      </>
     )
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
                  Blogs
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
                    <h5>Blogs Sheet</h5>   
                  </div>
                  <div className="card-body table-responsive p-2">

                    <table className="table  text-nowrap">
                      <thead className="text-center">
                        <tr>
                            <th>#</th>
                          <th>Auther Name</th>
                          <th>Blog Title</th>
                          <th>Blog Image</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {      


                        blogs.length === 0 ?
                        <tr>
                          <td>
                          <h2 className="text-center fs-6" >No Blog Found</h2>

                          </td>
                        </tr>
                        :
                        
                        blogs.map((items,index)=>{
                            return(
                             <BlogSheetFun items={items} index={index} />
                            )
                          })
                        
                        }

                      </tbody>
                    </table>
            
                    
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

export default BlogSheet