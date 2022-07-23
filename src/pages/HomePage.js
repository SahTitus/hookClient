import { useEffect, useState } from "react";
import "../styles/HomePage.css";
// import QuestionCard from "./QuestionCard";
// import { collection, query, onSnapshot } from "@firebase/firestore";
// import { db, auth } from "./firebase";
// import { onAuthStateChanged } from "@firebase/auth";
import AdFab from "../components/AdFab";
import Spin from "react-cssfx-loading/lib/Spin";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
// import QuestionCard from "../components/QuestionCard";
import CreatePost from "../components/Post/forms/CreatePost";
import PostCard from "../components/Post/PostCard";
import { useStateContex } from "../store/StateProvider";
import SkeLoadash from "../components/loadash/Skeleton";
import ErrorMsg from "../components/connectivity/ErrorMsg";
import axios from "axios";
import Hook from "../images/Hook.jpg"
import Spinner from "../components/loadash/Spinner";
// import Upload from "../utils/UploadImage";

function Homepage({ posts, isLoading, error }) {
  // const dd = window.matchMedia('(prefers-color-scheme: light)').matches
  // console.log(dd)

  const { darkMode } = useStateContex();
  const user = JSON.parse(localStorage.getItem('profile'))?.data
  // if (!posts) return null;
  // if (!user) 

  return (
    <div className={`homepage ${isLoading && 'overflowHidden'} ${darkMode && "homepage__dark"}`}>
      <Appbar />

      <div className="createPost">{!isLoading && <CreatePost />}</div>
      {/* <Upload /> */}
      <div className={`homepage__feed `}>
      
       
      {/* { (!isLoading && error ) &&  <ErrorMsg error={error} />} */}
        {isLoading ? (
          // <div className='loadash'>{<Spin className="spin"/>}</div>
          <div className='loadash'>
            
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
          </div>
        ) : (
          
          posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              image={post?.imageData}
              link={post.link}
              text={post?.text}
              username={post.username}
              creatorName={post?.username}
              creatorImage={post?.userImage}
              userId={post.userId}
              likes={0}
              dislikes={0}
              group="Tanhans"
              timestamp={post.createdAt}
              noOfComments={0}
              noOfShares={0}
              description={post.description}
              reposted={post.repost}
              linkData={post?.linkData}
            />
          ))
        )}

{/* <PostCard

              image={Hook}
              link=''
              text=''
              username='Samuel'
              userId='9'
              likes={0}
              dislikes={0}
              group="Tanhans"
              timestamp='2d'
              noOfComments={0}
              noOfShares={0}
              description='lllll'

            /> */}

        {/*
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        /> */}
      </div>
      <AdFab user={user}/>
      <BottomNavigation />
    </div>
  );
}

export default Homepage;
