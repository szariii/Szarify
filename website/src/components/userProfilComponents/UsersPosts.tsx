import styled from "styled-components";
import Post from "../helpingComponents/Post";

const UsersPosts = ({
  posts,
  setPosts,
  authorName,
  authorId,
  limit,
  setLimit
}: UserPostsInterface) => {
  return (
    <PostsContainer>
      {posts.map((ele,index) => (
        <Post
          key={ele.id}
          id={ele.id}
          author={authorName}
          timestamp={ele.timestamp}
          text={ele.text}
          likes={ele.likes}
          authorId={authorId}
          posts={posts}
          setPosts={setPosts}
          index={index}
          limit={limit}
          setLimit={setLimit}
        />
      ))}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

interface UserPostsInterface {
  posts: Array<PostInterface>;
  setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>;
  authorName: string;
  authorId: number;
  limit:number
  setLimit:React.Dispatch<React.SetStateAction<number>>
}

interface PostInterface {
    id:number
    timestamp:string
    text:string
    likes:Array<number>
    nick:string
    author_id:number
}

export default UsersPosts;
