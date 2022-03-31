import { Course as CourseType } from "../utilities/allModels"

import '../css/CourseItem.css';

//images
import favImage from '../images/stard.svg';
import nonFavImage from '../images/star.svg';
import bookImage from '../images/sample-book.jpeg';
import Arrow from '../images/arrow.svg';
import DeleteImage from '../images/trash-icon.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { CourseAddCart, CourseAddWishlist, CourseRemoveCart, CourseRemoveWishlist } from "../store/Courses/CoursesActions";
import { ShowNotification } from "../store/Notification/NotificationActions";

interface Props{
    course: CourseType,
    source: string
}

const CourseItem = (props:Props) =>{

    const { course, source } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const courses = useSelector((state:AppState)=> state.CoursesReducer);

    const calcDiscount = () =>{
        let dis:number = (course.discount/100)*course.price;
        return course.price-dis;
    }

    const switchWishlist = (removeFromCart:boolean=false) =>{
        if(removeFromCart){
            dispatch(CourseAddWishlist(course.id));
            deleteFromCart();
        }
        else{
            if(course.wishlist){
                dispatch(CourseRemoveWishlist(course.id))
            }
            else{
                dispatch(CourseAddWishlist(course.id));
            }
        }
    }

    const addToCart = () =>{
        if(course.cart==false){
            dispatch(CourseAddCart(course.id));
            dispatch(ShowNotification({
                type: true,
                message: "Course Successfully added to the cart",
                errMessage: "",
                show: true
            }));
        }
        else{
            dispatch(ShowNotification({
                type: false,
                message: "Already Exist in cart",
                errMessage: 'Course '+course.title+' already exist in cart',
                show: true
            }));
        }
    }

    const deleteFromCart = () =>{
        dispatch(CourseRemoveCart(course.id));
    }

    const goToCourse = () =>{
        navigate(`${source=='cart/wish'?"wishlist":source}/${course.id}`);
    }

    if(source=="wishlist" || source=="courses"){
        return (
            <div className="course">
                <img src={bookImage} className="course-image"/>
                <div className="pdh info">
                    <p className="name">
                        {course.title}
                    </p>
                    <div className="tags">
                        {course.tags.map((tag,i)=>{
                            return <div key={i} className="tag">{tag}</div>
                        })}
                    </div>
                </div>
                <p className="pdh author">
                    {course.courseCreator}
                </p>
                {
                    source=='courses'?
                    <div className="pdh fav" onClick={()=>switchWishlist()}>
                        <span className="star"><img src={course.wishlist?favImage:nonFavImage} alt=""/></span>
                    </div>:''
                }
                <div className="prices">
                    <p className="pdh price">
                        Rs {calcDiscount()}/-
                    </p>
                    <p className={`pdh orig-price ${calcDiscount()==course.price?'orig-empty':''}`}>
                        {calcDiscount()==course.price?<s>-</s>:<s>Rs {course.price}/-</s>}
                    </p>
                </div>
                <div className="pdh cart">
                    <input type="button" onClick={addToCart} value="ADD TO CART" className="add-cart"/>
                </div>
                <div className="pdh more" onClick={goToCourse}>
                    <img src={Arrow} alt=""/>
                </div>
            </div>
        );
    }
    else if(source=="cart/wish"){
        return (
            <div className="course">
                <img src={bookImage} className="pdh course-image"/>
                <div className="pdh info">
                    <p className="name">
                        {course.title}
                    </p>
                    <div className="tags">
                        {
                            course.tags.map((tag,i)=>{
                                return <div key={i} className="tag">{tag}</div>
                            })
                        }
                    </div>
                </div>
                <p className="pdh author">
                    {course.courseCreator}
                </p>
                <div className="prices">
                    <p className="pdh price">
                        Rs {calcDiscount()}/-
                    </p>
                    <p className={`pdh orig-price ${calcDiscount()==course.price?'orig-empty':''}`}>
                        {calcDiscount()==course.price?<s>-</s>:<s>Rs {course.price}/-</s>}
                    </p>
                </div>
                <div className="pdh cart">
                    <input type="button" onClick={addToCart} value="ADD TO CART" className="add-cart"/>
                </div>
                <div className="pdh more" onClick={goToCourse}>
                    <img src={Arrow}/>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="course">
                <img src={bookImage} className="pdh course-image"/>
                <div className="pdh info info-cart">
                    <p className="name">
                        {course.title}
                    </p>
                    <div className="author">
                        {course.courseCreator}
                    </div>
                </div>
                <div className="pdh move" onClick={()=>switchWishlist(true)}>
                    Move to Wishlist
                </div>
                <p className="pdh price-cart">
                    Rs {calcDiscount()}/-
                </p>
                <div className="pdh delete" onClick={deleteFromCart}>
                    <img src={DeleteImage} alt=""/>
                </div>
            </div>
        )
    }
}

export default CourseItem;