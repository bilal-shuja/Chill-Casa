import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getBlogs = createApi({

    reducerPath:"getBlogs",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_BASE_URL
    }),

    endpoints:(builder)=>({
        getAllBlogs:builder.query({
            query:()=>({
                url:`fetchblog`,
                method:'GET'
            })
        }),
        createPost: builder.mutation({
            query:(formdata)=>{    
                console.log(formdata)       
             return{
                url:`login`,
                method:'POST',
                body:formdata
                // headers: {
                //     'Content-type': 'application/json; charset=UTF-8',
                //   }
                }
            }
        }),



    })
})

export const {useGetAllBlogsQuery, useCreatePostMutation} = getBlogs;