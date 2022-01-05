import React, {useEffect, useState} from "react";
import {getDataAPI} from "../../utils/fetchData";
import {useDispatch, useSelector} from "react-redux";
import {getProfileUsers} from "../../redux/actions/profileAction";
import UserCardSuggest from "../UserCardSuggest";
import FollowBtn from "../FollowBtn";
import {Link} from "react-router-dom";

const ReTreatment = () => {

    const { profile, auth, suggestions } = useSelector((state) => state);
    const [isData , setData] = useState([]);


    const id = auth.user._id
    useEffect(() => {
        getDataAPI(`user_posts/${id}?limit=${9}`, auth.token)
            .then(doc => {
                setData(doc.data.posts);
            })
    }, []);

    return <React.Fragment>
        <div> 재진 환자 리스트 </div>
        {
            isData.map((item, key) => {
                return <ReTreatmentCard key={key} item={item} />
            })
        }
    </React.Fragment>
}

const ReTreatmentCard = ({item}) => {
    useEffect(()=>{
        console.log(item)
    },[])
    return <Link to={{
        pathname : `/postEdit/${item._id}`,
        state :{
            item
        }
    }}>
        <p>{item.content}</p>
        <p>Region :  {item.titlea}</p>
        <p>Field :  {item.title}</p>
    </Link>
}

export default ReTreatment;