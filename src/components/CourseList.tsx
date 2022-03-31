import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/Basic.css';
import { AppState } from '../store';
import { Course as CourseType } from '../utilities/allModels';
import CourseItem from "./CourseItem";

interface Props{
    source:string,
    page:number,
    allCourses: Array<CourseType>;
}

const CourseList = (props:Props) =>{
    
    const { source, allCourses, page } = props;
    const [pagedCourses, setPagedCourses] = useState<Array<Array<CourseType>>>([]);

    useEffect(()=>{
        paginate();
    },[allCourses]);

    const paginate = () => {
        if(source=="courses" || source=="wishlist"){
          let n = allCourses.length;
          let i=0;
          if(n<=4){
            setPagedCourses([allCourses]);
          }else{
            setPagedCourses([]);
            while(i<=n){
              let tempArray:Array<CourseType> = allCourses.slice(i,i+4)
              setPagedCourses((prev)=>{
                return [...prev, tempArray];
              });
              i+=4;
            }
          }
        }
        else{
          setPagedCourses([allCourses]);
        }
    }

    return (
        <div className={`course-list-component ${source=="cart/wish"?'height':''}`}>
            {/*  List of Courses  */}
            {
                pagedCourses[page]?.map(course=>{
                    return <CourseItem key={course.id} course={course} source={source}/>
                })
            }

            {/*  If List is Empty show below element  */}
            {
              allCourses.length==0?
              <div className="not-found">
                {source=='courses'||source=='wishlist'||source=='cart/wish'?<em>No Course Found here</em>:source=='cart'?<em>Cart is empty</em>:''}
              </div>:''
            }
        </div>
    );
}

export default CourseList;