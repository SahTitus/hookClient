import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeFeed from "./pages/HomePage";
import Videos from "./pages/Questions";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Auth from "./components/auth/Auth";
import SearchPage from "./pages/Search";
import AddPost from "./components/Post/AddPost";
import {useTheme }from "./utils/useTheme";
import { ThemeProvider } from "styled-components";
import  ThemeStyle  from "./styles/ThemeStyle";
import useNetwork from './utils/useNetwork'
import OfflineMsg from "./components/connectivity/OfflineMsg"

function App() {
  const theme = useTheme();
  const { online } = useNetwork();

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
                />
              } 
               />
            </Routes>
          </div>
          {/* <BottomNavigation />			 */}
         
         {(!online ) && 
         <div className='errorM'><OfflineMsg offline={!online} /></div>
         }
        </BrowserRouter>
      </div>

	  </>
    </ThemeProvider>
  );
}

export default App;
