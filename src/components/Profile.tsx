import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { UserModel } from "../utilities/allModels";
import "../css/Profile.css";

import DisplayImage from "../images/display-picture.png";
import { ProfileEdit } from "../store/Profile/ProfileActions";
import { ShowNotification } from "../store/Notification/NotificationActions";

const Profile = () =>{

    const user : UserModel = useSelector((state:AppState)=>state.ProfileReducer);
    const dispatch = useDispatch();

    const [userState, setUserState] = useState<UserModel>(user);

    const [formValid, setFormValid] = useState<boolean>(false);

    const experiences = [
        {
            "id": "1",
            "value": "0-5"
        },
        {
            "id": "2",
            "value": "5-10"
        },
        {
            "id": "3",
            "value": "> 10"
        }
    ];

    const expertises =  [
        {
            "id": "1",
            "value": "Frontend"
        },
        {
            "id": "2",
            "value": "Backend"
        }
    ]

    const interests = [   
        {
            "id": "1",
            "value": "Designer"
        },
        {
            "id": "2",
            "value": "Developer"
        },
        {
            "id": "3",
            "value": "Manager"
        },
        {
            "id": "4",
            "value": "Sales"
        }
    ]

    useEffect(()=>{
        if(isNaN(Number(userState.roleText))){
            setFormValid(true);
        }else{
            setFormValid(false);
        }
    },[userState])

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setUserState((prev)=>({...prev, [e.target.name] : e.target.value}));
        if(isNaN(Number(userState.roleText))){
            setFormValid(true);
        }else{
            setFormValid(false);
        }
    }

    const saveChanges = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        dispatch(ProfileEdit(userState));
        dispatch(ShowNotification({
            type: true,
            message: "Your Profile is Saved",
            errMessage: "",
            show: true
        }));
    }

    return (
        <>
            <main className="profile-main">
                {/*  Profile Picture Section  */}

                <section className="display-picture">
                    <img src={DisplayImage} alt=""/>
                </section>

                {/*  Details Section  */}

                <section className="details">
                    <form onSubmit={saveChanges}>
                    <div className="name">
                        <div>
                            <p>Display Name</p> 
                            <input type="text" value={userState.displayName} onChange={handleInputChange} name="displayName" placeholder="User Name"/>
                        </div>
                        <div>
                            <p>First Name</p>
                            <input type="text" value={userState.firstName} onChange={handleInputChange} name="firstName" placeholder="First Name"/>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <input type="text" value={userState.lastName} onChange={handleInputChange} name="lastName" placeholder="Last Name"/>
                        </div>
                    </div>
                    <div className="about">
                        <p>About Yourself</p>
                        <textarea name="aboutYourself" value={userState.aboutYourself} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="interest">
                        <p>Your Area of Interest</p>
                        {
                            interests.map(interest=>{
                                return (
                                    <label key={interest.id} className="checkbox-container">
                                        {interest.value}
                                        <input 
                                            type="checkbox"
                                            checked={userState.areasOfInterest.includes(interest.id)}
                                            value={interest.id}
                                            name="interests"
                                            onChange={()=>{
                                                if(userState.areasOfInterest.includes(interest.id)){
                                                    setUserState((prev)=>({
                                                        ...prev,['areasOfInterest']:userState.areasOfInterest.filter(id=>interest.id!=id)
                                                    }));
                                                }
                                                else{
                                                    let myInterests = userState.areasOfInterest;
                                                    myInterests.push(interest.id);
                                                    setUserState((prev)=>({
                                                        ...prev,['areasOfInterest']:myInterests
                                                    }));
                                                }
                                            }}/>
                                        <span></span>
                                    </label>
                                )
                            })
                        }
                    </div>
                    <div className="desig">
                        <p>Are you a student or Professional</p>
                        <label 
                            className="radio-container">
                            Student
                            <input 
                                type="radio" 
                                name="role"
                                value="Student" 
                                checked = {!userState.isProfessional}
                                className="radio-prof"
                                onChange={()=>setUserState((prev)=>({...prev,["isProfessional"]:false}))}/>
                            <span></span>
                        </label>
                        <label 
                            className="radio-container">
                            Professional
                            <input 
                                type="radio" 
                                name="role"
                                value="Professional" 
                                checked = {userState.isProfessional}
                                className="radio-prof"
                                onChange={()=>setUserState((prev)=>({...prev,["isProfessional"]:true}))}/>
                            <span></span>
                        </label>
                    </div>

                    {/*  Professional Section  */}

                    {
                        userState.isProfessional?
                        <div className="professional">
                            <div className="experience">
                                <p>How much experince you have?</p>
                                <div>
                                    {
                                        experiences.map(experience=>{
                                            return (
                                                <label key={experience.id} className="radio-container">
                                                    {experience.value}
                                                    <input 
                                                        type="radio"
                                                        name="exp"
                                                        checked={experience.id==userState.experience}
                                                        value={experience.id}
                                                        onChange={()=>setUserState(
                                                            (prev)=>({...prev,['experience']:experience.id})
                                                        )}/>
                                                    <span></span>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="speciality">
                                <p>What is your expertise?</p>
                                <div>
                                    {
                                        expertises.map(expertise=>{
                                            return (
                                                <label key={expertise.id} className="radio-container">
                                                    {expertise.value}
                                                    <input 
                                                        type="radio" 
                                                        name="spec"
                                                        checked={expertise.id==userState.expertise}
                                                        value={expertise.id}
                                                        onChange={()=>setUserState(
                                                            (prev)=>({...prev,['expertise']:expertise.id})
                                                        )}/>
                                                    <span></span>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="role">
                                <p>Mention your role</p>
                                <input className={`${isNaN(Number(userState.roleText))?'':'red-border'}`} type="text" value={userState.roleText} name="roleText" onChange={handleInputChange} id="prof-role" placeholder="Role"/>
                                <br/>{isNaN(Number(userState.roleText))?'':<span>Enter Characters only</span>}
                            </div>
                        </div>:''
                    } 
                    <div className="desktop save">
                        <input disabled={!formValid} type="submit" value="SAVE"/>
                    </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;