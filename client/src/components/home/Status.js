import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status d-flex">
      <div className="big-avatar-cover">
        <Avatar src={auth.user.avatar} size="big-avatar" className="" />
      </div>
      <button
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="statusBtn flex-fill "
        style={{ marginLeft: "7px" }}
      >
        {/* ENG */}
        {/* <span>{auth.user.username}, What's on your mind?</span> */}
        <span className="whatstory">환자분 추가하기</span>
      </button>
    </div>
  );
};

export default Status;
