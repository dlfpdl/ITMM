import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import LikeleftButton from '../../LikeleftButton';
import LikerightButton from '../../LikerightButton';
import { imageShow, videoShow } from '../../../utils/mediaShow';
import { useSelector, useDispatch } from 'react-redux';
import {
	likePost,
	likeleftPost,
	likerightPost,
	savePost,
	unLikeleftPost,
	unLikerightPost,
	unSavePost,
	likeleftAll,
	likerightAll,
	unLikeleftAll,
	unLikerightAll
} from '../../../redux/actions/postAction';
import ShareModal from '../../ShareModal';
import Carousel from '../../Carousel';
import { postDataAPI } from '../../../utils/fetchData';

const CardBody = ({ post }) => {
	function DoDisplay() {
		var con = document.getElementById('myDIV');
		if ((con.style.display = 'none')) {
		} else {
			con.style.display = 'none';
		}
	}

	const imageShow = src => {
		return (
			<img
				src={src}
				alt={src}
				style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
			/>
		);
	};

	const videoShow = src => {
		return (
			<video
				controls
				src={src}
				alt={src}
				style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
			/>
		);
	};

	const [isLike, setIsLike] = useState(false);
	const [isLikeleft, setIsLikeleft] = useState(false);
	const [isLikeright, setIsLikeright] = useState(false);
	const [saved, setSaved] = useState(false);
	const [loadLike, setLoadLike] = useState(false);
	const [loadLikeleft, setLoadLikeleft] = useState(false);
	const [loadLikeright, setLoadLikeright] = useState(false);
	const [saveLoad, setSaveLoad] = useState(false);
	const [isShare, setIsShare] = useState(false);

	const dispatch = useDispatch();
	const { auth, theme, socket } = useSelector(state => state);
	const a1 = `contentbox Lefted ${post.trend2}`;
	const a2 = `contentbox Righted ${post.trend3}`;
	useEffect(() => {
		const a = document.querySelectorAll('.countup');
		for (var i = 0; i < a.length; i++) {
			a[i].style.display = 'inline';
		}
		const b = document.querySelectorAll('.par');
		for (var i = 0; i < b.length; i++) {
			b[i].style.display = 'inline';
		}
		if (post.likes.find(like => like._id === auth.user._id)) {
			setIsLike(true);
		} else {
			setIsLike(false);
		}
		if (post.likelefts.find(likeleft => likeleft._id === auth.user._id)) {
			setIsLikeleft(true);
		} else {
			setIsLikeleft(false);
		}
		if (
			post.likerights.find(likeright => likeright._id === auth.user._id)
		) {
			setIsLikeright(true);
		} else {
			setIsLikeright(false);
		}
	}, [post.likes, post.likelefts, post.likerights, auth.user._id]);

	const handleLikeleft = async () => {
		if (loadLikeleft) return;
		setLoadLikeleft(true);
		await dispatch(likeleftAll({ post, auth, socket }));
		const x = document.getElementById(post.trend2);
		const countupEls = x.querySelectorAll('.countup');
		// var con = document.getElementById("myDIV");
		// con.style.display = "block";

		setLoadLikeleft(false);
	};
	const randomrgb = () => {
		document.getElementById(post.trend2).style.backgroundColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
	};
	const randomrgb2 = () => {
		document.getElementById(post.trend3).style.backgroundColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
	};

	const handleLikeright = async () => {
		if (loadLikeright) return;
		setLoadLikeright(true);
		await dispatch(likerightAll({ post, auth, socket }));
		const x = document.getElementById(post.trend3);
		const countupEls = x.querySelectorAll('.countup');

		setLoadLikeright(false);
	};

	const handleUnLikeleft = async () => {
		if (loadLikeleft) return;
		setLoadLikeleft(true);
		await dispatch(unLikeleftAll({ post, auth, socket }));
		setLoadLikeleft(false);
		// var con = document.getElementById("myDIV");
		// con.style.display = "none";
	};
	const handler = async () => {
		if (loadLikeleft) return;
		if (loadLikeright) return;
		setLoadLikeleft(true);
		setLoadLikeright(true);
		await dispatch(unLikerightPost({ post, auth, socket }));
		await dispatch(likeleftPost({ post, auth, socket }));
		setLoadLikeleft(false);
		setLoadLikeright(false);
	};
	// const handlerrr = async () => {
	//   if (loadLikeright) return;
	//   setLoadLikeright(true);
	//   await dispatch(unLikerightPostLikeleftPost({ post, auth, socket }));
	//   setLoadLikeright(false);
	// };

	const handlerr = async () => {
		if (loadLikeleft) return;
		if (loadLikeright) return;
		setLoadLikeleft(true);
		setLoadLikeright(true);
		await dispatch(unLikeleftPost({ post, auth, socket }));
		await dispatch(likerightPost({ post, auth, socket }));

		setLoadLikeleft(false);
		setLoadLikeright(false);
	};

	// const handle = async () => {
	//   if (loadLikeright) return;
	//   setLoadLikeright(true);
	//   await dispatch(unLikerightPost({ post, auth, socket }));
	//   setLoadLikeright(false);

	//   if (loadLikeleft) return;
	//   setLoadLikeleft(true);
	//   await dispatch(likeleftPost({ post, auth, socket }));
	//   setLoadLikeleft(false);
	// };

	const handleUnLikeright = async () => {
		if (loadLikeright) return;
		setLoadLikeright(true);
		await dispatch(unLikerightAll({ post, auth, socket }));
		setLoadLikeright(false);
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

	// useEffect(() => {
	//   document.getElementById(post.trend2).addEventListener("open", randomrgb());
	//   document.getElementById(post.trend3).addEventListener("open", randomrgb2());
	//   if (auth.user.saved.find((id) => id === post._id)) {
	//     setSaved(true);
	//   } else {
	//     setSaved(false);
	//   }
	// }, [post._id, auth.user.saved]);

	const [readMore, setReadMore] = useState();
	const [readMores, setReadMores] = useState();

	// Run the animation on all elements with a class of ‘countup’
	const runAnimations = () => {
		const countupEls = document.querySelectorAll('.countup');
	};
	return (
		<div className='card_body' id={post._id}>
			<div className='cardpad'>
				<div className='title  '>
					{post.images[0] ? (
						<div>
							<img
								className='patient-img'
								src={post.images[0].url}
							/>
						</div>
					) : (
						<div></div>
					)}
					<h3>환자 프로필</h3>
					<a>환자 이름: {post.content}</a>
					<br />
					<a>나이: {post.contentsub}</a>
					<br />
					<a>진료과목: {post.title}</a>
					<br />
					<a>나라ID: {post.titlea}</a>
					<br />
					<a>시간: {post.titleb}</a>
					<br />
					<a>성별: {post.titlec}</a>
					<br />
					<a>결혼여부: {post.titled}</a>
					<br />
					<a>blood pressure: {post.titlee}</a>
					<br />
					<a>pulse rate: {post.titlef}</a>
					<br />
					<a>respiration rate: {post.titleg}</a>
					<br />
					<a>body heat: {post.titleh}</a>
					<br />
					<a>wound treatment: {post.titlei}</a>
					<br />
					<a>prescript 일투수: {post.titlej}</a>
					<br />
					<a>prescript dose: {post.titlek}</a>
					<br />
					<a>prescript period: {post.titlel}</a>
					<br />
					{post.images2[0] ? (
						<div>
							<img
								className='patient-img'
								src={post.images2[0].url}
							/>
						</div>
					) : (
						<div></div>
					)}
					<h3>디테일 사진</h3>
					<a>patient detail: {post.titlem}</a>
					<br />
				</div>
				{/* {isLikeleft || isLikeright ? (
          <div>
            <div className="buttons-box">
              <div>
                {(post.likelefts.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                
              </div>
              <a>%</a>
              <div>
                {(post.likerights.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                
              </div>
              <a>%</a>
              <div>{post.likelefts.length} votes</div>
              <div>{post.likerights.length} votes</div>
            </div>
          </div>
        ) : (
          <></>
        )} */}
			</div>
		</div>
	);
};

export default CardBody;

// isLikeright ? (
//   <>
//     <div>
//       {(post.likelefts.length /
//         (post.likelefts.length + post.likerights.length)) *
//         100}{" "}
//       votes
//     </div>
//     <div>
//       <button onClick={handle}>
//         <img src={img.url} className="" alt={img.url} />
//       </button>
//     </div>
//     <div>{post.likelefts.length} votes</div>
//     <div>
//       <span>
//         {post.content.length < 60
//           ? post.content
//           : readMore
//           ? post.content + " "
//           : post.content.slice(0, 60) + "  ..."}
//       </span>
//     </div>
//   </>
// ) :
