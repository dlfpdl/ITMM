import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createPost, updatePost } from '../redux/actions/postAction';
import Icons from './Icons';
import { BiMinus, BiTrash, BiImageAdd } from 'react-icons/bi';
import { imageShowModal, videoShowModal } from '../utils/mediaShowModal';

const StatusModal = () => {
	const { auth, theme, status, socket } = useSelector(state => state);
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

	const [content, setContent] = useState('');
	const [contentsub, setContentsub] = useState('');
	const [community, setCommunity] = useState('');

	const [title, settitle] = useState('');
	const [titlea, settitlea] = useState('');
	const [titleb, settitleb] = useState('');
	const [titlec, settitlec] = useState('');
	const [titled, settitled] = useState('');
	const [titlee, settitlee] = useState('');
	const [titlef, settitlef] = useState('');
	const [titleg, settitleg] = useState('');
	const [titleh, settitleh] = useState('');
	const [titlei, settitlei] = useState('');
	const [titlej, settitlej] = useState('');
	const [titlek, settitlek] = useState('');
	const [titlel, settitlel] = useState('');
	const [titlem, settitlem] = useState('');

	const [images, setImages] = useState([]);
	const [images2, setImages2] = useState([]);
	const [stream, setStream] = useState(false);
	const videoRef = useRef();
	const refCanvas = useRef();
	const [tracks, setTracks] = useState('');
	const [trend1, settrend1] = useState('');

	const [trend2, settrend2] = useState(random);
	const [trend3, settrend3] = useState(random2);

	const handleChangeImages = e => {
		const files = [...e.target.files];
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
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
		}
		setImages([...images, ...newImages]);
	};
	const handleChangeImages2 = e => {
		const files = [...e.target.files];
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
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
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
				.getUserMedia({ video: true })
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
		setImages([...images, { camera: URL }]);
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
		setImages2([...images2, { camera: URL2 }]);
	};

	const handleStopStream = () => {
		tracks.stop();
		setStream(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// if (images.length === 0) {
		//   return dispatch({
		//     type: GLOBALTYPES.ALERT,
		//     payload: { error: "Add image(s)." },
		//   });
		// }

		if (status.onEdit) {
			dispatch(
				updatePost({
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
					status
				})
			);
		} else {
			dispatch(
				createPost({
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
					socket
				})
			);
		}

		setContent('');
		setContentsub('');
		setCommunity('');
		settitle('');

		settitlea('');
		settitleb('');
		settitlec('');
		settitled('');
		settitlee('');
		settitlef('');
		settitleg('');
		settitleh('');
		settitlei('');
		settitlej('');
		settitlek('');
		settitlel('');
		settitlem('');

		setImages([]);
		setImages2([]);
		settrend1('');
		settrend2('');
		settrend3('');
		if (tracks) {
			tracks.stop();
		}
		dispatch({
			type: GLOBALTYPES.STATUS,
			payload: false
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
		<div className='status_modal'>
			<form onSubmit={handleSubmit}>
				<div className='status_header'>
					<a className='m-0 default'>Feel Out The Form</a>
					<span
						onClick={() =>
							dispatch({
								type: GLOBALTYPES.STATUS,
								payload: false
							})
						}
					>
						<BiMinus />
					</span>
				</div>
				<div className='status_body'>
					<div>
						<a className=''>
							/* 포스팅 후에는 수정이 불가능 합니다 */
						</a>
					</div>
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
						<input
							onChange={e => setContent(e.target.value)}
							value={content}
							type='text'
							placeholder='환자 이름을 적어주세요'
						></input>
						<a>환자 사진을 찍거나 삽입하세요</a>
						{images.map((img, index) => (
							<div key={index}>
								{index == 0 ? (
									<>
										<span onClick={() => deleteImages(0)}>
											<div>
												{img.type.match(/video/i)
													? videoShowModal(
															URL.createObjectURL(
																img,
																theme
															)
													  )
													: imageShowModal(
															URL.createObjectURL(
																img,
																theme
															)
													  )}
											</div>
										</span>
									</>
								) : (
									<></>
								)}
							</div>
						))}
						{images[0] ? (
							<></>
						) : (
							<div className='input_images'>
								{stream ? (
									<i
										className='fas fa-camera'
										onClick={handleCapture}
									/>
								) : (
									<>
										<div className='file_upload'>
											<BiImageAdd />
											<input
												onChange={handleChangeImages}
												type='file'
												name='file'
												id='file'
												multiple
												accept='image/*,video/*'
											/>
											{/* {images ? <a>{images[0].name}</a> : <></>} */}
										</div>
									</>
								)}
							</div>
						)}
					</div>
					<div className='patient-block'>
						<input
							onChange={e => setContentsub(e.target.value)}
							value={contentsub}
							type='text'
							id='blood-pressure'
							name='blood-pressure'
							placeholder='환자 나이를 적어주세요'
						></input>
					</div>
					<h1>Patient Profile</h1>
					<div className='patient-block'>
						<h3>Medical Field</h3>
						<select
							name='medical-field'
							id='fields'
							onChange={e => settitle(e.target.value)}
							value={title}
							name='title'
							placeholder='포스트 제목'
							required
						>
							<option value=''>Choose Among Those</option>
							<option value='GS 일반외과'>일반외과</option>
							<option value='OB-GY 산부인과'>산부인과</option>
							<option value='PD 소아과'>소아과</option>
							<option value='OS 정형외과'>정형외과</option>
							<option value='DR 피부과'>피부과</option>
							<option value='ENT 이비인후과'>이비인후과</option>
							<option value='EY 안과'>안과</option>
							<option value='ICU 응급환자'>응급환자</option>
							<option value='Can Not Identify 특정불가'>
								Can Not Identify
							</option>
						</select>
					</div>

					<div className='patient-block'>
						<h3>Country ID</h3>
						<select
							name='country-id'
							id='fields'
							onChange={e => settitlea(e.target.value)}
							value={titlea}
							required
						>
							<option value=''>Choose Among Those</option>
							<option value='Africa-Brundi'>
								아프리카브룬디 (#01)
							</option>
							<option value='India-Gru'>인도 (#02)</option>
							<option value='Indonesia-siam'>
								인도네시아-A (#03)
							</option>
							<option value='Indonesia-B'>
								인도네시아-B (#04)
							</option>
						</select>
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
					<div className='patient-block'>
						<h3>Gender</h3>
						<select
							onChange={e => settitlec(e.target.value)}
							value={titlec}
						>
							<option value=''>Choose Male/Female</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
					</div>
					<div className='patient-block'>
						<h3>Marriage</h3>
						<select
							onChange={e => settitled(e.target.value)}
							value={titled}
						>
							<option value=''>Choose Marriage</option>
							<option value='Married'>Married</option>
							<option value='Single'>Single</option>
							<option value='Divorced'>Divorced</option>
						</select>
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
							{images2.map((img, index) => (
								<div key={index}>
									{index == 0 ? (
										<>
											<span
												onClick={() => deleteImages2(0)}
											>
												<div>
													{img.type.match(/video/i)
														? videoShowModal(
																URL.createObjectURL(
																	img,
																	theme
																)
														  )
														: imageShowModal(
																URL.createObjectURL(
																	img,
																	theme
																)
														  )}
												</div>
											</span>
										</>
									) : (
										<></>
									)}
								</div>
							))}
							{images2[0] ? (
								<></>
							) : (
								<div className='input_images'>
									{stream ? (
										<i
											className='fas fa-camera'
											onClick={handleCapture2}
										/>
									) : (
										<>
											<div className='file_upload'>
												<BiImageAdd />
												<input
													onChange={
														handleChangeImages2
													}
													type='file'
													name='file'
													id='file'
													multiple
													accept='image/*,video/*'
												/>
												{/* {images ? <a>{images[0].name}</a> : <></>} */}
											</div>
										</>
									)}
								</div>
							)}
						</div>
					</div>

					<div className='status_body-block'>
						{/* <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="file_img">
                {img.camera ? (
                  imageShowModal(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShowModal(img.url)
                      : imageShowModal(img.url)}
                  </>
                ) : img[0] ? (
                  <>yes</>
                ) : img[1] ? (
                  <>no</>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShowModal(URL.createObjectURL(img, theme))
                      : imageShowModal(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div> */}
						{/* {stream && (
            <div className="stream position-relative">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                autoPlay
                muted
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )} */}
						{/* <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>
              </>
            )}
          </div> */}
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
						포스팅 하기
					</button>
					<div></div>
				</div>
			</form>
		</div>
	);
};

export default StatusModal;
