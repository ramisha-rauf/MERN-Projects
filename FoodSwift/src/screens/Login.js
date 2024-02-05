import React,{useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import "../Login.css";

export default function Login(){
    const bg='#fec47f';
    let navigate = useNavigate();

    const [credentials, setcredentials] = useState({email:"",password:""})

    const handleSubmit = async(e)=>{
         e.preventDefault();
         const response = await fetch("http://localhost:4000/api/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
         })
         const json = await response.json()
         console.log(json)

         if(!json.success){
            alert("Enter valid credentials")
         }
         if(json.success){
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem("authToken",json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate("/");
         }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return(
        <>
        <div className="background">
            <div><NavBar/></div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-5">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name = "email"
                value = {credentials.email}
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name = "password"
                value = {credentials.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="m-3 btn text-white" style={{backgroundColor:bg}}>
              Login
            </button>
            <Link to="/signup" className='m-3 btn text-white' style={{backgroundColor:'brown'}} > Doesn't have an Account?</Link>
          </form>
          </div>
          <div className="text-white" style={{marginTop:"320px"}}><Footer/></div>
          </div>

          
        </>
    )
}