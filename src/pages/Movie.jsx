import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Rating, IconButton, Backdrop, CircularProgress} from '@mui/material';
import {Favorite, PlayCircle, LiveTv} from '@mui/icons-material';

export default function Movie({movie, userDetails, setUserDetails, setSearchMenu, setPopUp, setPopMessage}) {
  useEffect(() => {
    axiosGet();
}, []);

const navigate = useNavigate();

  const axiosGet = ()=> {
    if(JSON.stringify(movie) === "{}") {
      navigate('/login');
    }
  }
    const data = {
        userId: userDetails._id,
        movieId: movie._id
      }
        const handleFavClick = ()=> {
          axios({
            method: 'post', 
            url: 'https://rillo-server.onrender.com/fav',
            data
        })
        .then((res)=> {
          if(res.data.message === "Success!!") {
            setUserDetails(res.data.userDetails);
          } else {
            setPopMessage(res.data.message);
            setPopUp(true);
          }
        })
        .catch((error)=> {
          setPopMessage("Could not communicate with server... Please Try Again");
          setPopUp(true);
        });
        };

    return (
        <main onClick={()=> {setSearchMenu(false);}}>
          {JSON.stringify(movie) === "{}" ?
          <Backdrop sx={{color: '#fff', zIndex: 4}} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop> :

<div className='movie' style={{padding: '4rem 0rem'}}>
  <div className="image"  style={{backgroundImage: `url('${movie.img}')`, height: '50%', width: '100%',     backgroundRepeat: 'no-repeat',
backgroundSize: 'cover'}}></div>
    <div class="movie__main" style={{padding: '3rem 2rem'}}>
    <main class="main">
        <h1>{movie.name}</h1>
        <h4>{movie.category} | {movie.type}</h4>
            <h4 style={{display: 'flex',
alignItems: 'center'}}><IconButton aria-label="add to favorites" onClick={handleFavClick}>
        {userDetails.favourites.includes(movie._id)? <Favorite style={{color: '#ff0202'}} /> : <Favorite />}
    </IconButton> | <Rating name="half-rating-read" defaultValue={movie.rating} precision={0.5} readOnly />  |  {movie.snvl}</h4>

        <div class="main__links">
            <a href={movie.trailer} class="watch">
                <PlayCircle />
                <p>Watch Trailer</p>
            </a>
            <a href={movie.download} class="download">
                <LiveTv />
                <p>Stream</p>
            </a>
        </div>
        <p class="describe">
            {movie.description}
        </p>
    </main>
    <div class="empty"></div>
</div>
</div>
        }
        </main>
    )
}
