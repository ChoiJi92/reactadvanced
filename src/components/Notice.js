import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteNoticeFB} from "../redux/modules/notice";

const Notice = () => {
  const data = useSelector((state) => state.notice.notice_list);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <NoticeList>
      {
        data.map((v) => {
          return (
            <Container >
              <div style={{width:'100%', cursor:'pointer'}} onClick={()=> navigate(`/detail/${v.id}`)}>
              {v.notice}
              </div>
              <button
                onClick={() => {
                  dispatch(deleteNoticeFB(v.noticeId));
                }}
              >
                X
              </button>
            </Container>
          );
        })}
    </NoticeList>
  );
};
const NoticeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 70%;
  height: 50px;
  border: solid 1px;
  border-radius: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  button {
    /* border: none; */
    background-color: transparent;
    font-size: x-large;
    cursor: pointer;
  }
`;
export default Notice;
