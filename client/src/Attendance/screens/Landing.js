import React from 'react';
import { Link } from "react-router-dom"
import StudentIMage from "../Images/student_icon2.jpg"
import AdminIMage from "../Images/admin_icon2.png"
import TeacherImage from "../Images/teacher_icon.png"
import backg from "../Images/ec_bg.jpg"

const Landing = () => {
    return (
        <div className="HomePage" style={{ backgroundImage:`url(${backg})`,
      backgroundSize:"cover", height:"100vh",paddingTop:"100px" }} >
           <div style={{height:"400px",margin:"auto",backgroundColor:"white",width:"60%",opacity:"0.9",paddingTop:"50px", borderRadius:"10px"}}>

         
            <div className=" m-auto" style={{display:"flex",width:"100%",height:"300px",justifyContent:"center" }}>

            <Link className="link_class" to="/adminlogin" style={{textDecoration:"none",fontFamily:"Oswald",color:"black",textAlign:"center"}}>

                <div className="card" >
                   <img src={AdminIMage} alt="StudentIMage" style={{height:"250px",width:"250px", border:"2px solid black"}} />
                   
                    <h3>Signin as  Admin</h3>
                </div>

                </Link>

                <Link className="link_class" to="/stulogin" style={{textDecoration:"none",fontFamily:"Oswald",color:"black",textAlign:"center"}}>
         
                <div className="card" style={{marginLeft:"30px"}}>
                   <img src={StudentIMage} alt="StudentIMage" style={{height:"250px",width:"250px",border:"2px solid black"}} />
               
                   <h3 >Signin as  Student</h3>  
                </div>

                </Link>

                <Link className="link_class" to="/teclogin" style={{textDecoration:"none",fontFamily:"Oswald",color:"black",textAlign:"center"}}>
                
                <div className="card" style={{marginLeft:"30px"}}>
                   <img src={TeacherImage} alt="StudentIMage" style={{height:"250px",width:"250px",border:"2px solid black"}} />
                  
                   <h3 >Signin as  Teacher</h3>  
                </div>

                </Link>
            </div>
            </div>
            
        </div>
    );
};

export default Landing;