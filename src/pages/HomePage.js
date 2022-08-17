import { useEffect } from "react";
import "../styles/HomePage.css";
import AdFab from "../components/AdFab";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
// import QuestionCard from "../components/QuestionCard";
import CreatePost from "../components/Post/forms/CreatePost";
import PostCard from "../components/Post/PostCard";
import { useStateContex } from "../store/StateProvider";
import SkeLoadash from "../components/loadash/Skeleton";
import ErrorMsg from "../components/connectivity/ErrorMsg";
import Spinner from "../components/loadash/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../actions/posts";


function Homepage() {
  // const dd = window.matchMedia('(prefers-color-scheme: light)').matches
  // console.log(dd)
  const dispatch = useDispatch();

  const { darkMode } = useStateContex();
  const user = JSON.parse(localStorage.getItem('profile'))

  const { posts, isLoading, error} = useSelector((state) => state.posts);
  // const {user } = useSelector((state) => state.auth);
  const feeds = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    <div className={`homepage ${isLoading && 'overflowHidden'} ${darkMode && "homepage__dark"}`}>
      <Appbar />

      {/* <div className="createPost">{!isLoading && <CreatePost />}</div> */}
      {/* <Upload /> */}
      <div className={`homepage__feed `}>
      
       
      {/* { (!isLoading && error ) &&  <ErrorMsg error={error} />} */}
        {error && !posts.length ? (
          // <div className='loadash'>{<Spin className="spin"/>}</div>
          <div className='loadash'>
            
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
            <SkeLoadash />
          </div>
        ) : (
          
          feeds.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              image={post?.imageData}
              link={post.link}
              text={post?.text}
              username={post.username}
              creatorName={post?.creatorName}
              creatorImage={post?.userDp}
              userId={post.userId}
              likes={post.likes}
              reposts={post.reposts}
              group="Tanhans"
              timestamp={post.createdAt}
              comments={post.comments}
              noOfShares={0}
              description={post.description}
              reposted={post.repost}
              linkData={post?.linkData}
            />
          ))
        )}

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
