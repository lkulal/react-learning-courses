import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { HIDE } from "../store/Notification/models/actions";
import { NotificationModel } from "../utilities/allModels"
import '../css/Notification.css';

//images
import SuccessImage from '../images/sucess-symbol.jpg';
import ErrorImage from '../images/error-warning.png';

const Notification = () =>{

    const notificationStore:NotificationModel = useSelector((state:AppState)=> state.NotificationReducer);
    const dispatch = useDispatch();

    const onClose = () =>{
        dispatch({
            type:HIDE
        });
    }

    return (
        <>
        {
            notificationStore.show==true?
            <div className="dark-overlay">
                <div className="modal">
                    <div className="top-bar">
                        <p onClick={onClose}>X</p>
                    </div>
                    {
                        notificationStore.type?
                        <div className="content">
                            <p>
                                <img src={SuccessImage}/>
                                <span>{notificationStore.message}</span>
                            </p>
                        </div>:
                        <div className="content">
                            <p>
                                <img src={ErrorImage}/>
                                <span>{notificationStore.message}</span>
                            </p>
                            <p>
                                <span>{notificationStore.errMessage}</span>
                            </p>
                        </div>
                    }
                    
                    <div className="confirm">
                        <input onClick={onClose} type="button" value="OK"/>
                    </div>
                </div>
            </div>:''
        }
        </>
    );
}

export default Notification;