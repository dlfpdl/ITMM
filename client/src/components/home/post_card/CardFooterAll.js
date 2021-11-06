import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  savePost,
  unLikePost,
  unSavePost,
  likeAll,
  unLikeAll,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";
import { BiConversation, BiShareAlt, BiAnchor } from "react-icons/bi";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(likeAll({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(unLikeAll({ post, auth, socket }));
    setLoadLike(false);
  };
  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);
  const year = post.createdAt.slice(0, 4);
  const month = post.createdAt.slice(5, 7);
  const day = post.createdAt.slice(8, 10);

  return (
    <div className="card_footer">
      <div className="card_icon_menu cardpad">
        <div class="footer_like">
          {/* <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          /> */}
          <a>
            {year}년 {month}월 {day}일
          </a>
        </div>
        <div class="footer_comments">
          {/* <Link to={`/post/${post._id}`} className="text-dark">
            <BiConversation className="icony" />
            <a className="joa default">토론하기</a>
          </Link> */}
          <a>
            담당 의사님:{" "}
            <Link
              className="text-dark font-bold"
              to={`/profile/${post.user._id}`}
            >
              {post.user.username}
            </Link>
          </a>
        </div>
        {/* <div>
          <BiShareAlt
            className="icony"
            alt="Send"
            onClick={() => setIsShare(!isShare)}
          />
        </div> */}
        <div class="footer_anchor">
          {saved ? (
            <BiAnchor className="icony text-savy " onClick={handleUnSavePost} />
          ) : (
            <BiAnchor className="icony" onClick={handleSavePost} />
          )}
        </div>
        <a className="joa default">저장하기</a>
      </div>

      {isShare && (
        <ShareModal
          url={`${BASE_URL}/post/${post._id}`}
          theme={theme}
          setIsShare={setIsShare}
        />
      )}
    </div>
  );
};

export default CardFooter;
