import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

//Components
import UserInformations from "../components/userProfilComponents/UserInformations";
import UsersPosts from "../components/userProfilComponents/UsersPosts";

import settings from "../settings.json"


const UserProfilSite = () => {
  const [limit, setLimit] = useState<number>(5);
  const [userInfo, setUserInfo] = useState<ShortedInfo>({
    id: -1,
    name: "",
    surname: "",
    nick: "",
    register_date: "",
    followed_persons: [],
    followers: 0,
  });
  const [posts, setPosts] = useState<Array<Post>>([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPosts(limit);
  }, [limit]);

  const getData = async () => {
    const obj = {
      id: id,
    };

    const result = await axios.get(`${settings.address}/findUser`, {params:obj});

    setUserInfo(result.data);
  };

  const getPosts = async (limit: number) => {
    let sendPostData = {
      id: id,
      limit: limit,
    };

    const postsResult = await axios.get(`${settings.address}/getUserPosts`, {
      params: sendPostData,
    });

    const array = [...posts];
    postsResult.data.map((ele: Post) => array.push(ele));
    setPosts(array);
  };

  return (
    <UserProfilSiteStyle>
      {userInfo.id === -1 ? (
        <WaitingDiv>
          <Icon icon={faCircleNotch} className="fa-spin" />
        </WaitingDiv>
      ) : (
        <>
          <UserInformations userInfo={userInfo} setUserInfo={setUserInfo} />
          <UsersPosts
            posts={posts}
            setPosts={setPosts}
            authorName={userInfo.nick}
            authorId={userInfo.id}
            limit={limit}
            setLimit={setLimit}
          />
        </>
      )}
    </UserProfilSiteStyle>
  );
};

const WaitingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfilSiteStyle = styled.div`
  width: 100%;
  height: 92%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
`;

export default UserProfilSite;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
  register_date: string;
  followed_persons: Array<number>;
  followers: number;
}

interface Post {
  id: number;
  timestamp: string;
  text: string;
  likes: Array<number>;
  nick: string;
  author_id: number;
}
