import React,{useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import '../Login.css';

export default function Signup() {
    const bg='#fec47f';

    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit = async(e)=>{
         e.preventDefault();
         const response = await fetch("http://localhost:4000/api/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
         })
         const json = await response.json()
         console.log(json)
         if(!json.success){
            alert("Enter valid credentials")
         }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className="background">
    <div><NavBar/></div>
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3 mt-5">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name = "name"
            value = {credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Home Address
          </label>
          <input
            type="text"
            className="form-control"
            name = "geolocation"
            value = {credentials.geolocation}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="m-3 btn text-white" style={{backgroundColor:bg}}>
          Signup
        </button>
        <Link to="/login" className='m-3 btn text-white' style={{backgroundColor:'brown'}} > Already a User ?</Link>
      </form>
      </div>
      <div style={{marginTop:"150px"}}><Footer/></div>
      </div>
    </>
  );
}
