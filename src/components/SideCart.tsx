import { Course } from "../utilities/allModels"
import "../css/SideCart.css";

//images
import BookImage from "../images/sample-book.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props{
    courses:Array<Course>
}

const SideCart = (props:Props) => {

    const {courses} = props;

    const [totalCost,setTotalCost] = useState<number>(0);

    useEffect(()=>{
        let total_cost:number = 0;
        courses.map(course=>{
            total_cost+=calcDiscount(course.discount,course.price);
        })
        setTotalCost(total_cost);
    },[courses])

    const calcDiscount = (discount:number,price:number) => {
        let dis:number = (discount/100)*price;
        return price-dis;
    }

    return (
            <div className="r-cart">
                <p className="cart-heading">YOUR CART DETAILS</p>
                <hr/>
                <div className="items">
                    {
                        courses.length==0?
                        <div className="not-found">
                            <em>Cart is empty</em>
                        </div>:''
                    }
                    {
                        courses.map(course=>{
                            return (
                                <div className="item" key={course.id}>
                                    <div>
                                        <img src={BookImage} className="pdh course-image"/>
                                        <p className="name">
                                            {course.title}
                                        </p>
                                    </div>
                                    <p className="amount">Rs {calcDiscount(course.discount,course.price)}/-</p>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>
                <hr/>
                <div className="total">
                    <div className="value">
                        Total Cart Value <br/>
                        <strong>Rs {totalCost}/-</strong>
                    </div>
                    <p className="checkout">
                        <Link to='/cart'> GO TO CHECKOUT </Link>
                    </p>
                </div>
            </div>
    );
}

export default SideCart;