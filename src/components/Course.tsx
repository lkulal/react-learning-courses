import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { AppState } from "../store";
import { Course as CourseType } from "../utilities/allModels";
import "../css/Course.css";
import { CourseAddCart } from "../store/Courses/CoursesActions";

interface Props{
    source:string
}

const Course = (props:Props) => {

    const { source, id } = useParams();
    const courses:Array<CourseType> = useSelector((state:AppState)=> state.CoursesReducer);
    const [course,setCourse] = useState<CourseType>();
    const [timeDiffrence, setTimeDifference] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(()=>{
        courses.map((course)=>{
            if(course.id==id){
                setCourse(course);
                var temp = (new Date(course.discountValidTill).getTime() - new Date().getTime())/(1000*60*60);
                if(temp>24)
                    setTimeDifference(Number.parseInt((temp/24).toString()) +' days');
                else
                    setTimeDifference(Number.parseInt(temp.toString())+' hours');
            }
        });
    },[]);

    const calcDiscount = () =>{
        if(course){
            let dis:number = (course.discount/100)*course.price;
            return course.price-dis;
        }
    }

    const addToCart = () => {
        if(course)
            dispatch(CourseAddCart(course.id));
    }

    const switchWishlist = () => {

    }

    return (
        <main>

            {/*  Path from which page will be displayed here  */}

            <div className="secondary-heading">
                {
                    source=='courses'?
                    <p>
                        <Link to='/courses'><strong>All Courses</strong></Link> &gt; {course?.title}
                    </p>
                    :source=='wishlist'?
                    <p>
                        <Link to="/wishlist"><strong>My Wishlist</strong></Link> &gt; {course?.title}
                    </p>
                    :''
                }
            </div>

            {/*  Full Screen banner with course info  */}

            <div className="fullscreen-banner">
                <p className="name">
                    {course?.title}
                </p>
                <p className="desc">
                    {course?.courseDescription}
                </p>
                <p className="author">{course?.courseCreator}</p>
                <div className="tags">
                    {
                        course?.tags?.map(tag=>{
                            return <div className="tag">{tag}</div>
                        })
                    }
                </div>
            </div>

            {/*  Details about the course with the video  */}

            <div className="details">
                <section className="left-content">
                    <p>Course Details</p>
                    <p className="info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, facilis. <br/>
                        Lorem ipsum dolor sit amet. <br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ex libero fugiat veritatis assumenda placeat fugit eius repellendus explicabo facere.
                    </p>
                </section>
                <section className="video">
                    <iframe className="v-source" src="https://www.youtube.com/embed/kuJNVKHHpGk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    <div>
                        <p className="price">Rs {calcDiscount()}-</p>
                        {
                            calcDiscount()!=course?.price?
                            <Fragment>
                                <p className="orig-price"><s>Rs {course?.price}/-</s></p>
                                <p className="time-left">{timeDiffrence} left for this price</p>
                            </Fragment>:
                            <p className="orig-price orig-empty"><s>-</s></p>
                        }
                        <div>
                            <input type="button" onClick={addToCart} value="ADD TO CART" className="add-cart"/>
                            <input type="button" onClick={switchWishlist} value="ADD TO WISHLIST" className="add-wish"/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Course;