import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {authPost} from '../services/Auth';
import{Packages} from '../services/Packages';

import {getBlogs} from '../services/GetBlogs';

export const store = configureStore({
    reducer:{
        [authPost.reducerPath]:authPost.reducer,
        [Packages.reducerPath]:Packages.reducer,
        [getBlogs.reducerPath]:getBlogs.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat
    ([
            authPost.middleware,
            Packages.middleware,
            getBlogs.middleware
        ])
})

setupListeners(store.dispatch)