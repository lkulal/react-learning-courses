import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import CourseList from "./CourseList";
import Footer from "./Footer"
import "../css/Cart.css";
import { Course } from "../utilities/allModels";
import { ShowNotification } from "../store/Notification/NotificationActions";
import { CourseClearCart } from "../store/Courses/CoursesActions";

const Cart = () =>{

    const allCourses = useSelector((state:AppState)=> state.CoursesReducer);
    const dispatch = useDispatch();

    const [actualPrice, setActualPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [itemsInCart, setItemsInCart] = useState<number>(0);

    const [cartCourses,setCartCourses] = useState<Array<Course>>([]);
    const [wishCourses,setWishCourses] = useState<Array<Course>>([]);
    
    const setVariables = () =>{
        setCartCourses(allCourses.filter(course=>course.cart==true));
        setWishCourses(allCourses.filter(course=>course.wishlist==true));
    }
    
    useEffect(()=>{
        setVariables();
    },[])
    useEffect(()=>{
        setVariables();
    },[allCourses])

    useEffect(()=>{
        setItemsInCart(cartCourses.length);
        let total_price=0,actual_price=0;
        cartCourses.map(course=>{
            total_price+=calcDiscount(course.discount,course.price);
            actual_price+=course.price;
        });
        setTotalPrice(total_price);
        setActualPrice(actual_price);
    },[cartCourses])

    const calcDiscount = (discount:number,price:number) =>{
        let dis:number = (discount/100)*price;
        return price-dis;
    }

    const checkOut = () => {
        dispatch(ShowNotification({
            type: true,
            message: "You have successfully placed your order",
            errMessage: "",
            show: true
        }));
        dispatch(CourseClearCart());
    }

    return (
        <>
            <main>
                <section className={`course-list ${cartCourses.length>2?'height-important-100':''}`}>
                    <div className="secondary-heading">
                        <p>{itemsInCart} Courses in Cart</p>
                    </div>
                    <div className="cart-container">

                        {/*  Below Element is filled with courses in cart  */}
                        <CourseList allCourses={cartCourses} source="cart" page={0} />

                        {/*  Recommended Courses with courses in wishlist  */}
                        <div className="desktop rec-courses">
                            <p className="heading">Recommended Courses</p>
                            <CourseList allCourses={wishCourses} source="cart/wish" page={0}/>
                        </div>

                    </div>
                </section>

                {/*  Checkout */}

                <aside className="desktop total-checkout">
                    <div className="total">
                        <p>Total Amount</p>
                        <strong>Rs {totalPrice}/-</strong>
                    </div>
                    <p className="success">You have saved Rs {actualPrice-totalPrice}</p>
                    <input type="button" onClick={checkOut} value="CHECKOUT" className="checkout"/>
                </aside>
            </main>
            <Footer/>
        </>
    );
    {/* return (<></>); */}
}

export default Cart;