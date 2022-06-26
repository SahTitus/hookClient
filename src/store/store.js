import { configureStore } from '@reduxjs/toolkit';
import  postsSlice  from '../redux/posts';

export default configureStore({
	reducer: {
		posts: postsSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});