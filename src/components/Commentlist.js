import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Commentlist = () => {
  const comment_list = useSelector((state) => state.comment.comment_list);
  console.log(comment_list);
  return (
    <Comment>
      {comment_list.map((v) => (
        <List>
          <p>{v.user_name}</p>
          <p>{v.comment}</p>
          <p>{v.date}</p>
        </List>
      ))}
    </Comment>
  );
};
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
`;
export default Commentlist;
