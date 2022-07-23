import React from "react";
import "./styles/App.css";
// import GroupPage from "./pages/GroupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFeed from "./pages/HomePage";
// import Myhalls from "./pages/Myhalls";
import Videos from "./pages/Questions";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
// import PostForm from "./pages/PostForm";
import PostDetails from "./pages/PostDetails";
// import CreateGroup from "./pages/CreateGroup";
import Profile from "./pages/Profile";
// import PollLeaf from "./PollLeaf";
// import Explore from "./pages/Explore";
// import PollComponent from "./PollComponent";
import Auth from "./components/auth/Auth";
import SearchPage from "./pages/Search";
// import Halls from "./pages/Halls";
import AddPost from "./components/Post/AddPost";
import {useTheme }from "./utils/useTheme";
import { ThemeProvider } from "styled-components";
import  ThemeStyle  from "./styles/ThemeStyle";
import useNetwork from './utils/useNetwork'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "./actions/posts";
import OfflineMsg from "./components/connectivity/OfflineMsg"
// import { authData } from "./redux/auth";



function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { online } = useNetwork();

  const { posts, isLoading, error} = useSelector((state) => state.posts);
  // const {user } = useSelector((state) => state.auth);
  const feeds = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

// console.log(user)

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    <ThemeProvider theme={theme}>
		<>
      <ThemeStyle />
      
      <div className="app">
        <BrowserRouter>
          <div>{/* <Appbar /> */}</div>

          <div className="app__body">
            
            <Routes className='app__body'>
              
              <Route path="/search" element={<SearchPage />} />
              {/* <Route path="/groupPage" element={<GroupPage />} /> */}
              {/* <Route path="/categories" element={<Halls />} /> */}
              {/* <Route path="/createGroup" element={<CreateGroup />} /> */}
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/PostForm" element={<PostForm />} /> */}
              <Route path="/addPost" element={<AddPost />} />
              <Route path="/chatRoom" element={<ChatRoom />} />
              {/* <Route path="/myhalls" element={<Myhalls />} /> */}
              {/* <Route path="/explore" element={<Explore />} /> */}
              <Route path="/chats" element={<Chats />} />
              <Route path="/questions" element={<Videos />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/postDetails/:id" element={<PostDetails />} />
              <Route path="/"
               element={
               <HomeFeed
                posts ={feeds} 
                error={error}
                isLoading={isLoading}
                />
              } 
               />
            </Routes>
          </div>
          {/* <BottomNavigation />			 */}
         
         {(!online && !isLoading) && 
         <div className='errorM'><OfflineMsg offline={!online} /></div>
         }
        </BrowserRouter>
      </div>

	  </>
    </ThemeProvider>
  );
}

export default App;
