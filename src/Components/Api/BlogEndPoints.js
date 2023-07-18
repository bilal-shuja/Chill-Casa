import "react-toastify/dist/ReactToastify.css";
import {useMutation} from 'react-query';
import { toast } from "react-toastify";
import axios from 'axios';

function getAllBlogs(){
    const getBlogs =   axios.post(`${process.env.REACT_APP_BASE_URL}fetch_blog`)
       return getBlogs;
  }


  function delBlogs(id){
    const delBlogs =  axios.post(`${process.env.REACT_APP_BASE_URL}delete_blog/${id}`)
    .then((res)=>{
      toast.error("Blog deleted!" , {theme:"dark"})
      })
  .catch((err)=>{
    toast.warn("Something went wrong" , {theme:"dark"})
  })
    return delBlogs;

  }

  const useDeleteBlog = ()=>{
    return useMutation(delBlogs)
  }


  const blogEndPoints = {
    getAllBlogs,
    useDeleteBlog
  }

  export default blogEndPoints;
