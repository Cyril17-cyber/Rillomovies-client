import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CardHolder({item, userDetails, setUserDetails, setPopUp, setPopMessage}) {

  const navigate = useNavigate();

  const data = {
    userId: userDetails._id,
    movieId: item._id
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

    const handleMovieClick = ()=> {
      navigate(`/${item._id}`);
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
    <Card sx={{ maxWidth: '25rem', height: '100%'}}>
      <CardMedia
       onClick={handleMovieClick}
        sx={{ height: '25rem' }}
        image={item.img}
        title={item.name}
      />
      <CardContent sx={{padding: '16px 16px 0px'}}  onClick={handleMovieClick}>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: '800'}}>
        {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {item.category} | {item.type} | {item.snvl}
        </Typography>
        <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
      </CardContent>
      <CardActions sx={{padding: '0px 8px 8px'}}>
      <IconButton aria-label="add to favorites" onClick={handleFavClick}>
          {userDetails.favourites.includes(item._id)? <FavoriteIcon style={{color: '#ff0202'}} /> : <FavoriteIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}