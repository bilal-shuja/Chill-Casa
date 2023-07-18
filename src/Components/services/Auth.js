import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authPost = createApi({
    reducerPath:"authPost",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_BASE_URL
    }),
    
    endpoints:(builder)=>({
        regPost: builder.mutation({
            query:(regUserObj)=>{    
             return{
                url:`register`,
                method:'POST',
                body:regUserObj
                }
            }

        }),
        loginPost: builder.mutation({
            query:(loginObj)=>{
                             return{
                url:`login`,
                method:'POST',
                body:loginObj
                }

            }

        }),
        getAllUsers:builder.query({
            query:()=>({
                url:`fetchallusers`,
                method:`POST`,
            })
        })



    })
})

export const { useRegPostMutation, useLoginPostMutation , useGetAllUsersQuery } = authPost;