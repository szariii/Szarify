import { useEffect, useState } from "react";
import axios from "axios";

//Redux
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

//Components
import Post from "../components/helpingComponents/Post";
import styled from "styled-components";

const MainSite = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const [posts, setPosts] = useState<Array<PostInterface>>([]);

  useEffect(() => {
    console.log(userData)
    getData();
  }, [userData]);

  const getData = async () => {
    const sendObj = {
      array: userData.followed_persons,
    };
    console.log(sendObj)

    const result = await axios.get("http://127.0.0.1:3000/getPosts", {
      params: sendObj,
    });
    console.log(result);
    setPosts(result.data);
  };

  return (
    <div>
      <p>main</p>
      <PostsContainer>
        {posts.map((ele) => (
          <Post
            key={ele.id}
            posts={posts}
            setPosts={setPosts}
            id={ele.id}
            author={ele.nick}
            authorId={ele.author_id}
            text={ele.text}
            likes={ele.likes}
            timestamp={ele.timestamp}
          />
        ))}
      </PostsContainer>
    </div>
  );
};

const PostsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface PostInterface {
  id: number;
  timestamp: string;
  text: string;
  likes: Array<number>;
  nick: string;
  author_id: number;
}

export default MainSite;
