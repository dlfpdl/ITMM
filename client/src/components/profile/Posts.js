import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const Posts = ({ auth, profile, dispatch, id }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {

        const docData = data.posts
        const res = docData.filter((elem1, idx1)=>{
          return docData.findIndex((elem2, idx2)=>{
            return elem1.content === elem2.content
          }) === idx1
        })
        setPosts(res);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);

    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });

    setLoad(false);
  };
  window.onscroll = function (ev) {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight + 100
    ) {
      handleLoadMore();
    }
  };
  return (
    <div>
      <PostThumb posts={posts} result={result} />
      <div className="margintop100px">
        {load && (
          <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
        )}
      </div>

      {/* <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      /> */}
    </div>
  );
};

export default Posts;
