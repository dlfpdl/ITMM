import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createPost, getPost, updatePost} from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import PostCardOne from "../../components/PostCardOne";
import PostEditCardOne from "../../components/PostEditCardOne";
import EditStatusModal from "../../components/EditStatusModal";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import {BiImageAdd, BiMinus} from "react-icons/bi";
import {imageShowModal, videoShowModal} from "../../utils/mediaShowModal";
import {convertURLtoFile} from "../../utils/convertUrlImgToFile";
import {postDataAPI} from "../../utils/fetchData";

const Edit = ({history, location, match}) => {
    const patientUserData = location.state.item;
    const {auth, theme, status, socket} = useSelector(state => state);
    const dispatch = useDispatch();

    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function random_item2(items2) {
        return items2[Math.floor(Math.random() * items2.length)];
    }

    var timestamp = new Date().getTime();
    var r = timestamp + 'r';
    var l = timestamp + 'l';
    var random = r;
    var random2 = l;

    const [content, setContent] = useState(patientUserData.content);
    const [contentsub, setContentsub] = useState(patientUserData.contentsub);
    const [community, setCommunity] = useState('');

    const [title, settitle] = useState(patientUserData.title);
    const [titlea, settitlea] = useState(patientUserData.titlea);
    const [titleb, settitleb] = useState(patientUserData.titleb);
    const [titlec, settitlec] = useState(patientUserData.titlec);
    const [titled, settitled] = useState(patientUserData.titled);
    const [titlee, settitlee] = useState(patientUserData.titlee);
    const [titlef, settitlef] = useState(patientUserData.titlef);
    const [titleg, settitleg] = useState(patientUserData.titleg);
    const [titleh, settitleh] = useState(patientUserData.titleh);
    const [titlei, settitlei] = useState(patientUserData.titlei);
    const [titlej, settitlej] = useState(patientUserData.titlej);
    const [titlek, settitlek] = useState(patientUserData.titlek);
    const [titlel, settitlel] = useState(patientUserData.titlel);
    const [titlem, settitlem] = useState(patientUserData.titlem);

    const [images, setImages] = useState(patientUserData.images);
    const [images2, setImages2] = useState(patientUserData.images2);
    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState('');
    const [trend1, settrend1] = useState('');

    const [trend2, settrend2] = useState(random);
    const [trend3, settrend3] = useState(random2);

    const handleChangeImages = e => {
        console.log(e)
        const files = [e];
        let err = '';
        let newImages = [];

        files.forEach(file => {
            if (!file) {
                return (err = 'File does not exist.');
            }
            if (file.size > 1024 * 1024 * 5) {
                return (err = 'Image size must be less than 5 mb.');
            }
            return newImages.push(file);
        });
        if (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}});
        }
        setImages([...images, ...newImages]);
    };
    const handleChangeImages2 = e => {
        const files = [e];
        let err = '';
        let newImages = [];

        files.forEach(file => {
            if (!file) {
                return (err = 'File does not exist.');
            }
            if (file.size > 1024 * 1024 * 5) {
                return (err = 'Image size must be less than 5 mb.');
            }
            return newImages.push(file);
        });
        if (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}});
        }
        setImages2([...images2, ...newImages]);
    };

    const deleteImages = index => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const deleteImages2 = index => {
        const newArr = [...images2];
        newArr.splice(index, 1);
        setImages2(newArr);
    };

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({video: true})
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch(err => console.log(err));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);

        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        let URL = refCanvas.current.toDataURL();
        setImages([...images, {camera: URL}]);
        console.log(URL);
    };
    const handleCapture2 = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);

        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        let URL2 = refCanvas.current.toDataURL();
        setImages2([...images2, {camera: URL2}]);
    };

    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updatePost({
            content,
            contentsub,
            community,
            images,
            images2,
            trend1,
            trend2,
            trend3,
            title,
            titlea,
            titleb,
            titlec,
            titled,
            titlee,
            titlef,
            titleg,
            titleh,
            titlei,
            titlej,
            titlek,
            titlel,
            titlem,
            auth,
            status: patientUserData
        }))

        postDataAPI('/posts',patientUserData,auth.token)

        if (tracks) {
            tracks.stop();
        }
        dispatch({
            type: GLOBALTYPES.STATUS, payload: false
        });
    };

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setContentsub(status.contentsub);
            setCommunity(status.community);
            setImages(status.images);
            setImages2(status.images2);
            settitle(status.title);

            settitlea(status.titlea);
            settitleb(status.titleb);
            settitlec(status.titlec);
            settitled(status.titled);
            settitlee(status.titlee);
            settitlef(status.titlef);
            settitleg(status.titleg);
            settitleh(status.titleh);
            settitlei(status.titlei);
            settitlej(status.titlej);
            settitlek(status.titlek);
            settitlel(status.titlel);
            settitlem(status.titlem);

            settrend1(status.trend1);
            settrend2(status.trend2);
            settrend3(status.trend3);
        }
    }, [status]);

    return (
    <form onSubmit={handleSubmit} className={'editStatus_Modal'}>
        <div className='status_header'>
            <a className='m-0 default'>재진 : {patientUserData.content} / {patientUserData._id}</a>
        </div>
        <div className='status_body'>
            <div className='d-none'>
                <div>#</div>
                <a>{}</a>
                <div>
							<textarea
                                className='hashtag-textarea'
                                onChange={e => settrend2(e.target.value)}
                                value={trend2}
                                name='trend2'
                                placeholder='trend2'
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? 'white' : '#111',
                                    background: theme ? 'rgb(0,0,0,0.3)' : ''
                                }}
                            />
                </div>
            </div>
            <div className='d-none'>
                <div>#</div>
                <a>{}</a>
                <div>
                    <textarea
                        className='hashtag-textarea'
                        onChange={e => settrend3(e.target.value)}
                        value={trend3}
                        name='trend3'
                        placeholder='trend3'
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgb(0,0,0,0.3)' : ''
                        }}
                    />
                </div>
            </div>
            <div className='patient-block'>
                <p>
                    환자분 성함 : {content}<br/>
                    환자분 나이 : {contentsub}<br/>
                </p>
                {patientUserData.images.map((img, index) => (
                    <img key={index} src={img.url} />
                ))}
            </div>
            <h1>Patient Profile</h1>
            <div className='patient-block'>
                <p>Medical Field : {title}</p>
                <p>country-id : {titlea}</p>
                <p>Gender : {titlec}</p>
                <p>Marriage : {titled}</p>

            </div>

            <div className='patient-block'>
                <h3>Current Time</h3>
                <input
                    className='time'
                    type='datetime-local'
                    id='current-time'
                    className='time'
                    onChange={e => settitleb(e.target.value)}
                    value={titleb}
                ></input>
            </div>

            <h1>Vital Check</h1>
            <div className='patient-block'>
                <h3>Blood Pressure (혈압)</h3>
                <input
                    onChange={e => settitlee(e.target.value)}
                    value={titlee}
                    type='text'
                    id='blood-pressure'
                    name='blood-pressure'
                    placeholder='Type a blood pressure of patient'
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Pulse Rate (심박수)</h3>
                <input
                    onChange={e => settitlef(e.target.value)}
                    value={titlef}
                    type='text'
                    id='pulse-rate'
                    name='pulse-rate'
                    placeholder='Type a Pulse Rate of patient'
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Respiration Rate</h3>
                <input
                    onChange={e => settitleg(e.target.value)}
                    value={titleg}
                    type='text'
                    id='respiration-rate'
                    name='respiration-rate'
                    placeholder='Type a Respiration Rate of patient'
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Body Heat (체온)</h3>
                <input
                    onChange={e => settitleh(e.target.value)}
                    value={titleh}
                    type='text'
                    id='body-heat'
                    name='body-heat'
                    placeholder='Type a Body Heat of patient'
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Wound Treatment (treatment stage #)</h3>
                <label>Wound Treatment (# Stage): </label>{' '}
                <select
                    name='treatment-stage'
                    id='fields'
                    onChange={e => settitlei(e.target.value)}
                    value={titlei}
                    required
                >
                    <option value=''>Choose Among Those</option>
                    <option value='stag-1'>
                        treatment stag. 1 (#01)
                    </option>
                    <option value='stag-2'>
                        treatment stag. 2 ($02)
                    </option>
                    <option value='stag-3'>
                        treatment stag. 3 (#03)
                    </option>
                    <option value='stag-4'>
                        treatment stag. 4 (#04)
                    </option>
                    <option value='stag-5'>
                        treatment stag. 5 (#05)
                    </option>
                </select>
            </div>
            <h1>Treatment Detail</h1>
            <h2>Prescript</h2>
            <div className='patient-block'>
                <h3>일투수</h3>
                <input
                    type='text'
                    id='daily-prescripted'
                    name='daily-prescripted'
                    placeholder='Type # of daily prescription'
                    onChange={e => settitlej(e.target.value)}
                    value={titlej}
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Dose</h3>
                <input
                    type='text'
                    id='daily-prescripted'
                    name='daily-prescripted'
                    placeholder='Type # of daily prescription'
                    onChange={e => settitlek(e.target.value)}
                    value={titlek}
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Period</h3>
                <input
                    type='text'
                    id='daily-prescripted'
                    name='daily-prescripted'
                    placeholder='Type # of daily prescription'
                    onChange={e => settitlel(e.target.value)}
                    value={titlel}
                ></input>
            </div>
            <div className='patient-block'>
                <h3>Patient Detail</h3>
                <textarea
                    onChange={e => settitlem(e.target.value)}
                    value={titlem}
                    name='titlem'
                    placeholder='환자 기타 고려사항을 적어주세요'
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        color: theme ? 'white' : '#111',
                        background: theme ? 'rgb(0,0,0,0.3)' : ''
                    }}
                />
                <div className='patient-block'>
                    {images2.map((img, index) => (<div key={index}>
                        {index == 0 ? (<>
											<span
                                                onClick={() => deleteImages2(0)}
                                            >
												<div>
													{img.type.match(/video/i) ? videoShowModal(URL.createObjectURL(img, theme)) : imageShowModal(URL.createObjectURL(img, theme))}
												</div>
											</span>
                        </>) : (<></>)}
                    </div>))}
                    {images2[0] ? (<></>) : (<div className='input_images'>
                        {stream ? (<i
                            className='fas fa-camera'
                            onClick={handleCapture2}
                        />) : (<>
                            <div className='file_upload'>
                                <BiImageAdd/>
                                <input
                                    onChange={handleChangeImages2}
                                    type='file'
                                    name='file'
                                    id='file'
                                    multiple
                                    accept='image/*,video/*'
                                />
                                {/* {images ? <a>{images[0].name}</a> : <></>} */}
                            </div>
                        </>)}
                    </div>)}
                </div>
            </div>
            <div className='hashtag'>
                <div>#</div>
                <div>
							<textarea
                                className='hashtag-textarea'
                                onChange={e => settrend1(e.target.value)}
                                value={trend1}
                                name='trend'
                                placeholder='해쉬태그'
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? 'white' : '#111',
                                    background: theme ? 'rgb(0,0,0,0.3)' : ''
                                }}
                            />
                </div>
            </div>
        </div>
        <div className='status_footer'>
            <button type='submit' className='create-button'>
                수정 하기
            </button>
            <div></div>
        </div>
    </form>);
};

export default Edit;
