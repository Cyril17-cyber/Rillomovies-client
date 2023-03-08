import React, {useEffect} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Backdrop, CircularProgress} from '@mui/material';

export default function Recent({userDetails,  setSearchMenu, movies, setPopUp, setUserDetails, setPopMessage}) {
    useEffect(() => {
        redirect();
    }, []);
    const navigate = useNavigate();
    const redirect = ()=> {
        if(JSON.stringify(userDetails) === "{}") {
            navigate('/login');
          }
    }
    const filteredMoviesToReverse = movies.filter(filteredObject=> {
        return userDetails.recents.includes(filteredObject._id);
    });

    const filteredMovies = filteredMoviesToReverse.reverse();

    const handleMovieClick = (item)=> {
        let data = {
            userId: userDetails._id,
            movieId: item
        }
        axios({
          method: 'post', 
          url: 'https://rillo-server.onrender.com/recent',
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
      }
    return (
        <main onClick={()=> {setSearchMenu(false);}}>
            {JSON.stringify(userDetails) === "{}"? <Backdrop
      sx={{color: '#fff', zIndex: 4}}
      open={true}>
        <CircularProgress color="inherit" />
      </Backdrop> :
            <>
            <section className="favourites">
                 {movies.length === 0? <>
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 <Skeleton variant="rectangular" style={{maxWidth: '25rem'}} height={'25rem'} />
                 </> : <>
                 {filteredMovies.length === 0 ? <div className="empty">
                        <h2 style={{textAlign: 'center'}}>You have not seen any movies in here yet... Your last 5 seen movies will show up here</h2>
                    </div> : 
                    <>
                    {filteredMovies.map((favMovie, id)=> {
                        return (
                            <div className="favMovie" key={id}>
                                <Link onClick={()=> {handleMovieClick(favMovie._id)}} style={{backgroundImage: `url('${favMovie.img}')`}} to={`/${favMovie._id}`}>
                        </Link>
                            </div>
                        )
                    })}
                    </>
                    }
                 </>}
            </section></>
            }
        </main>
    )
}
