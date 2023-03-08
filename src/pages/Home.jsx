import React, {useEffect} from 'react';
import CardHolder from '../components/CardHolder';
import SkeletonHolder from '../components/SkeletonHolder';
import { useNavigate } from 'react-router-dom';
import {Backdrop, CircularProgress} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import axios from 'axios';


export default function Home({userDetails, filter, setUserDetails, setPopUp, setPopMessage, setSearchMenu, movies, setMovies}) {
  useEffect(() => {
    axiosGet();
}, []);

    const navigate = useNavigate();

  const axiosGet = ()=> {
    if(JSON.stringify(userDetails) === "{}") {
      navigate('/login');
    } else {
      axios({
        method: 'get',
        url: 'https://rillo-server.onrender.com/home'
      })
      .then((res)=> {
        if(res.data.message === "Success!!") {
          setMovies(res.data.movies);
        } else {
          setPopMessage(res.data.message);
          setPopUp(true);
        }
      })
      .catch((error)=> {
        setPopMessage("Could not communicate with server... Please Try Again");
        setPopUp(true);
      });
    }
  }


  return (
    <main onClick={()=> {setSearchMenu(false);}}>
      {JSON.stringify(userDetails) === "{}" ? 
      <Backdrop
      sx={{color: '#fff', zIndex: 4}}
      open={true}>
        <CircularProgress color="inherit" />
      </Backdrop> :

      <div className='home'>
      {movies.length === 0 ? <section className='skeletonSection'>
        <main>
        <SkeletonHolder />
        <SkeletonHolder />
        <SkeletonHolder />
        <SkeletonHolder />
        <SkeletonHolder />
        <SkeletonHolder />
        </main>
      </section> : 
      <section className='cardSection'>
        <section className="movieCategory">
          <h2>{filter} <ChevronRight /></h2>
          {filter === "All" ? <main>
          {movies.map((movie,id)=> {
          return (
            <CardHolder item={movie} userDetails={userDetails} setUserDetails={setUserDetails} key={id} setPopUp={setPopUp} setPopMessage={setPopMessage} />
          )
        })}
          </main> : 
          <main>
            {movies.filter(filteredMovie => filteredMovie.category === filter).map((movie, id)=> {
            return (
              <CardHolder item={movie}userDetails={userDetails} setUserDetails={setUserDetails} key={id} setPopUp={setPopUp} setPopMessage={setPopMessage}  />
            )
          })}
          </main>
          }
        </section>
      </section>
      }
      </div>
    }
    </main>
  )
}
