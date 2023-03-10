import { useEffect, useState } from "react";
import axios from "axios";

//Redux
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

//Components
import Post from "../components/helpingComponents/Post";
import styled from "styled-components";

import settings from "../settings.json"


const MainSite = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    getData(limit);
  }, [userData, limit]);

  const getData = async (limit: number) => {
    const sendObj = {
      array: userData.followed_persons,
      limit: limit,
    };

    const result = await axios.get(`${settings.address}/getPosts`, {
      params: sendObj,
    });
    const array = [...posts];
    result.data.map((ele: PostInterface) => array.push(ele));
    setPosts(array);
  };

  return (
    <div>
      <TitleText>Your board</TitleText>
      <PostsContainer>
        {posts.length === 0 ? (
          <p>No posts. Add more friends</p>
        ) : (
          posts.map((ele, index) => (
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
              index={index}
              limit={limit}
              setLimit={setLimit}
            />
          ))
        )}
      </PostsContainer>
    </div>
  );
};

const TitleText = styled.h1`
  text-align: center;
`;

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
