import { configureStore } from '@reduxjs/toolkit';
import authSlice  from '../redux/auth';
import  postsSlice  from '../redux/posts';

export default configureStore({
	reducer: {
		posts: postsSlice,
		auth: authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});