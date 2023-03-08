import React, {useRef, useState, useEffect} from 'react';
import {VisibilityOffTwoTone, VisibilityTwoTone} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  
  export default function Register({setUserDetails}) {
      const [image, setImage] = useState();
      const [preview, setPreview] = useState();
      const [visibility, setVisibility] = useState(false);
      const [progress, setProgress] = useState(false);
      const [items, setItems] = useState('');
      const fileInputRef = useRef();
      const [data, setData] = useState({
          firstName: "", 
          lastName: "",
          email: "",
          password: ""
      });

      const navigate = useNavigate();
  
      useEffect(() => {
          if(image) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreview(reader.result);  
              }
              reader.readAsDataURL(image);
          } else {
              setPreview(null);
          }
      }, [image]);
  
      const handleChange = ({currentTarget: input}) => {
          setData({...data, [input.name]: input.value});
      };
  
      const toogleVisible = () => {
          setVisibility((preValue)=> {
              return !preValue
          });
      };
  
      const handleSubmit = (e)=> {
          setProgress(true);
          e.preventDefault();
          let form = new FormData();
          form.append("image", image);
          form.set("firstName", data.firstName);
          form.set("lastName", data.lastName);
          form.set("email", data.email);
          form.set("password", data.password);
          axios({
              method: 'post',
              url: 'https://rillo-server.onrender.com/register',
              data: form
          })
          .then((res)=> {
              if(res.data.message === "Success!!") {
                setUserDetails(res.data.user);
                navigate('/verifyuser');
              } else {
                setItems(res.data.message);
                setProgress(false);
              }
          })
          .catch((error)=> {
              console.log(error);
              setItems("Could not communicate with server... Please Try Again");
              setProgress(false);
  
          });
      }
  
      return (
          <div className="register" onSubmit={handleSubmit}>
              <div className="intro">
      {items === ''? <h3>Welcome {data.firstName} {data.lastName}</h3>: <h3>{items}</h3>}
              </div>
              <form encType="multipart/form-data">
                  {preview ? <img src={preview} alt="profile" style={{objectFit: "cover"}} onClick={()=> {
                      setImage(null);
                      fileInputRef.current.click();
                  }}/> : 
                  <button className="imgAttahcment" onClick={(event)=> {
                      event.preventDefault();
                      fileInputRef.current.click();
                  }}>Add Image</button> }
                  <input type="file" name="image" style={{display: "none"}} required ref={fileInputRef} accept="image/*" onChange={(event)=> {
                      const file = event.target.files[0];
                      if(file && file.type.substr(0, 5) === "image") {
                          setImage(file);
                      } else {
                          setImage(null);
                      }
                  }}/>
  
                  <div className="main">
                      <div className="input">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" name="firstName" required value={data.firstName} onChange={handleChange} id="fName"/>
                      </div>
  
                      <div className="input">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" name="lastName" required value={data.lastName} onChange={handleChange} id="lName"/>
                      </div>
  
                      <div className="input">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" required value={data.email} onChange={handleChange} id="email"/>
                      </div>
  
                      <div className="input">
                          <label htmlFor="password">Password</label>
                          <main>
                          <div className="inputPassword">
                              <input type={visibility? "text" : "password"} name="password" required value={data.password} onChange={handleChange}/>
  
                              {
                      visibility ?
  
                      <VisibilityOffTwoTone onClick={toogleVisible} />
                      :
                      <VisibilityTwoTone onClick={toogleVisible} />
  
                  }
                          </div>
                          </main>
                              {data.password.length > 0 && <aside>{data.password.length < 8? <b style={{color: "rgb(255 0 0)"}}>Password is weak</b>: <b style={{color: "rgb(0 255 0)"}}>Password is strong</b>}</aside>}
                      </div>
  
                      <div className="checkbox">
                          <label>
                              <input type="checkbox" name="remember" className="check" value="agree" required/> I agree to all <Link to={"/terms"}>Terms and Conditions</Link>
                          </label>
                      </div>
                  </div>
  
                  {
                      !progress ? 
                      <button type="submit" className="submit">
                      Signup
                      </button> :
                      <CircularProgress />
                  }
  
              <p className="alt">Already have an account? <Link to={"/login"}>Login here.</Link></p>
              </form>
          </div>
      )
  }