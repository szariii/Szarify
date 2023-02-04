import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

//Fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

//Redux
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import useOnScreen from "../hooks/useOnScreen";

const Post = ({
  id,
  author,
  timestamp,
  likes,
  text,
  authorId,
  posts,
  setPosts,
  limit,
  setLimit,
  index,
}: PostInterface) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  console.log(isVisible);
  const logedUserData = useSelector((state: RootState) => state.userData);
  const [liked, setLiked] = useState(likes.includes(logedUserData.id));
  const date = new Date(timestamp);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const minutes = date.getMinutes();

  let showeddd = dd.toString();
  let showedmm = mm.toString();

  if (dd < 10) showeddd = "0" + dd;
  if (mm < 10) showedmm = "0" + mm;

  const formatedDate = `${showeddd}.${showedmm}.${yyyy} ${hh}:${minutes}`;

  const countLikes = likes.length;

  useEffect(() => {
    if (limit - 1 === index && isVisible === true) {
      setLimit(limit + 5);
    }
  }, [isVisible]);

  const likeHandler = () => {
    const sendObj = {
      id: logedUserData.id,
      postId: id,
    };

    axios.put("http://127.0.0.1:3000/likePost", sendObj);
    setLiked(true);
    setPosts(
      posts.map((ele) =>
        ele.id === id
          ? { ...ele, likes: [...ele.likes, logedUserData.id] }
          : { ...ele }
      )
    );
  };

  const disLikeHandler = () => {
    setLiked(false);

    const newArray = posts.map((ele) =>
      ele.id === id
        ? {
            ...ele,
            likes: [...ele.likes.filter((num) => num !== logedUserData.id)],
          }
        : { ...ele }
    );

    setPosts(newArray);

    let str = "";
    newArray.map((ele) =>
      ele.id === id ? ele.likes.map((num) => (str += `,${num}`)) : {}
    );

    console.log(str);

    const sendObj = {
      postId: id,
      array: str,
    };

    axios.put("http://127.0.0.1:3000/dislikePost", sendObj);
  };

  return (
    <PostStyled ref={ref}>
      <div>
        <LinkStyled to={`/user/${authorId}`}>
          <h3>{author}</h3>
        </LinkStyled>
        <DataStyled>{formatedDate}</DataStyled>
      </div>
      <TextDivStyle>
        <p style={{ overflowWrap: "break-word" }}>{text}</p>
      </TextDivStyle>

      <LikeDivStyled>
        {liked ? (
          <IconStyle onClick={disLikeHandler} icon={faHeart} />
        ) : (
          <IconStyle onClick={likeHandler} icon={emptyHeart} />
        )}
        <h3>:{countLikes}</h3>
      </LikeDivStyled>
    </PostStyled>
  );
};

const IconStyle = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;

const LikeDivStyled = styled.div`
  display: flex;
  flex-direction: row;
`;

const DataStyled = styled.h4`
  font-size: 1rem;
  color: gray;
`;

const TextDivStyle = styled.div`
  border-width: 2px 0;
  border-style: solid;
  border-color: gray;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const PostStyled = styled.div`
  border: 2px solid gray;
  padding: 1rem;
  border-radius: 20px;
  max-width: 50%;
`;

interface Post {
  id: number;
  timestamp: string;
  text: string;
  likes: Array<number>;
  nick: string;
  author_id: number;
}

interface PostInterface {
  id: number;
  author: string;
  timestamp: string;
  text: string;
  likes: Array<number>;
  authorId: number;
  posts: Array<Post>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export default Post;
