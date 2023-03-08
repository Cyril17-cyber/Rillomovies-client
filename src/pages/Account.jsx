import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Backdrop, CircularProgress, Fab} from '@mui/material';
import {Verified, Cancel, AddAPhoto, Edit, Delete} from '@mui/icons-material';
import axios from 'axios';

export default function Account({userDetails, setSearchMenu, userImage, setUserImage, setUserDetails, setPopUp, setPopMessage}) {
    useEffect(() => {
        redirect();
    }, []);
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName
    });
    const [progress, setProgress] = useState(false);
    const [pop, setPop] = useState(false);
    const [items, setItems] = useState('');
    const [moreItems, setMoreItems] = useState('');

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
    const fileInputRef = useRef();

    const handleChange = ({currentTarget: input}) => {
        setData({
            ...data,
            [input.name]: input.value
        });
    };

        const navigate = useNavigate();

        const redirect = ()=> {
            if(JSON.stringify(userDetails) === "{}") {
              navigate('/login');
            }
          }

          const onDelete = (e)=> {
            setPop(true);
              e.preventDefault();
          }

          const handleDelete = (e)=> {
              setProgress(true);
              e.preventDefault();
              const formData = {
                  id: userDetails._id
              }
              axios({
                  method: 'post',
                  url: 'https://rillo-server.onrender.com/delete-user',
                  data: formData
              })
              .then((res)=> {
                  if(res.data.message === "Success!!") {
                      setUserDetails({});
                      navigate('/register');
                  } else {
                      setProgress(false);
                      setItems(res.data.message);
                      setMoreItems(res.data.moreInfo);
                  }
              })
              .catch((error)=> {
                setProgress(false);
                setItems("Client Side Error...");
                setMoreItems("Couldn't make a secure connection with server... Please check your connection and try again");
              });
          }


          const onSubmit = (e)=> {
            setProgress(true);
            e.preventDefault();
            let form = new FormData();
            form.append("image", image);
            form.set("id", userDetails._id);
            form.set("firstName", data.firstName);
            form.set("lastName", data.lastName);
            axios({
                method: 'post',
                url: 'https://rillo-server.onrender.com/edit-user',
                data: form
            })
            .then((res)=> {
                if(res.data.message === "Success!!") {
                    setUserDetails(res.data.user);
                    setUserImage(res.data.image);
                    setProgress(false);
                    setEditing(false);
                } else {
                    setPopMessage(res.data.message);
                    setPopUp(true);
                    setProgress(false);
                    setEditing(false);
                  }
                })
                .catch((error)=> {
                  setPopMessage("Could not communicate with server... Please Try Again");
                  setPopUp(true);
                  setProgress(false);
                setEditing(false);
                });
        }
    return (
        <form onClick={()=> {setSearchMenu(false);}} className='account'>
            {JSON.stringify(userDetails) === "{}" ? 
      <Backdrop
      sx={{color: '#fff', zIndex: 4}}
      open={true}>
        <CircularProgress color="inherit" />
      </Backdrop> : <>
      <h2>Account Details</h2>
       <div class='picForm'>
    {preview? <img src={preview} alt={`${userDetails.firstName} ${userDetails.lastName}`} onClick={()=> {
                      setImage(null);
                      fileInputRef.current.click();
                  }}/> : <img src={userImage} alt={`${userDetails.firstName} ${userDetails.lastName}`} onClick={()=> {
                    setImage(null);
                    fileInputRef.current.click();
                    setEditing(true);
                }}/>}
            <span className="icon" onClick={(event)=> {
                      event.preventDefault();
                      fileInputRef.current.click();
                      setEditing(true);
                  }} style={{cursor: 'pointer'}}>
            <AddAPhoto />
            </span>
            <input type="file" name="image" style={{display: "none"}} required ref={fileInputRef} accept="image/*" onChange={(event)=> {
                      const file = event.target.files[0];
                      if(file && file.type.substr(0, 5) === "image") {
                          setImage(file);
                      } else {
                          setImage(null);
                      }
                  }} />
       </div>
       {editing? <div class="detail">
           <div className="input">
               <label htmlFor="firstName">First Name <span style={{color: "#e31414"}}>*</span></label>
               <input type="text" name="firstName" value={data.firstName} onChange={handleChange} id="fName" />
           </div>
           <div className="input">
               <label htmlFor="firstName">Last Name <span style={{color: "#e31414"}}>*</span></label>
               <input type="text" name="lastName" value={data.lastName} onChange={handleChange} id="lName" />
           </div>
           </div> : <div class="detail"><p>Name:</p> <h3>{userDetails.firstName} {userDetails.lastName}</h3> <span className="icon"><Edit onClick={()=> {
           setEditing(true);
       }} /></span></div>}
       <div class="detail"><p>Email:</p> <h3>{userDetails.email}</h3></div>
       <div class="detail"><p>Verification Status:</p> {userDetails.verified? <h3><Verified /></h3> : <Cancel />} </div>
         </>}
    {editing? <>{!progress? 
        <button type='submit' onClick={onSubmit}>Save Changes</button>:
        <CircularProgress className='deleteIcon' />
}</>: <>{!pop && <Fab aria-label="delete"  className='deleteIcon' onClick={onDelete}>
         <Delete />
             </Fab>}
</>}

             {pop && <div className='logout'>
                 <main>
                     <>
                     {items === '' ? <h2>Delete Account?</h2> : <h2>{items}</h2>}
                     </>
                     <>
                     {moreItems === ''? <p>It'll be sad to see you go 😢... Proceed to delete account?</p> : <p>{moreItems}</p>}
                     </>
                 </main>
                 {
                !progress ?
                <div className="logout__links">
                <button onClick={(e)=> {e.preventDefault(); setPop(false);}}>Cancel</button>
                <button onClick={handleDelete} className='proceed'>Proceed</button>
                </div> 
                :
                <CircularProgress />
            }
             </div>}
        </form>
    )
}
