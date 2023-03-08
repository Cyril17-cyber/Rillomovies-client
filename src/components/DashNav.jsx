import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import MoreIcon from '@mui/icons-material/SettingsOutlined';
import { DarkMode, LightMode, Theaters, Movie, LiveTv, TheaterComedy, PhotoFilter } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ErrorPop from './ErrorPop';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const pages = [{page:'Home', value: 'home'}, {page:'Favorites', value: 'favorites'}, {page:'Recent', value: 'recent'}, {page:'Info', value: 'info'}];


export default function DashNav({user, userImage, setUserImage, darkMode, darkModeSetter, setFilter, setPopUp, popUp, popMessage, setPopMessage, setSearchMenu, searchMenu, setUserDetails, logOut}) {
    useEffect(() => {
        axiosGet();
    }, []);

    const navigate = useNavigate();

    const axiosGet = ()=> {
        axios({

            method: 'get',
            url:`https://rillo-server.onrender.com/user/${user._id}`
          })
          .then((res)=> {
            if(res.data.message === "Success!"){
                setUserImage(res.data.img);
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

    function account() {
      handleCloseUserMenu()
      navigate('/account');
    }

    function logout() {
      handleCloseUserMenu();
      logOut();
    }

    const settings = [{page: 'Account', value: account}, {page: 'Logout', value: logout}];



    const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState({
    search: ""
  });
  const [emptySearch, setEmptySearch] = useState("Empty");


  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
    axiosSearch(input.value);
};

const axiosSearch = (value)=> {
  let valueObj = {
    search: value
  }
  axios({
    method: 'post',
    url: 'https://rillo-server.onrender.com/search',
    data: valueObj
  })
  .then((res)=> {
    if(res.data.message === "found!!") {
      setMovies(res.data.movies);
    } else if(res.data.message === "None") {
      setEmptySearch("emptySearch");
    } else {
      setPopMessage(res.data.message);
      setPopUp(true);
    }
  })
  .catch((error)=> {
    console.log(error);
    setPopMessage("Client Error... Please try refreshing the page");
      setPopUp(true);
  });
}

const handleMovieClick = (item)=> {
  let data = {
      userId: user._id,
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
  
  

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setSearchMenu(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    searchMenu(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setSearchMenu(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setSearchMenu(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setSearchMenu(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    setSearchMenu(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setSearchMenu(false);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=> {handleMenuClose(); setFilter("All")}}>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Theaters />
          All
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=> {handleMenuClose(); setFilter("Action")}}>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Movie />
          Action
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=> {handleMenuClose(); setFilter("Horror")}}>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Movie />
          Horror
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=> {handleMenuClose(); setFilter("Drama")}}>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <TheaterComedy />
          Drama
        </IconButton>
      </MenuItem>
      <MenuItem onClick={()=> {handleMenuClose(); setFilter("Animation")}}>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LiveTv />
          Animation
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PhotoFilter />
        </IconButton>
        <p>Watch Filter</p>
      </MenuItem>
      <MenuItem onClick={darkModeSetter}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {darkMode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
        <p>Dark Mode</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>{JSON.stringify(user) === "{}"? <div></div> :
    <div className="dashNav">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="dashNavBar">
        <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.firstName + " " + user.lastName} src={userImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, id) => (
                <MenuItem key={id} onClick={setting.value}>
                  <Typography textAlign="center">{setting.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Rillo Movies
          </Typography>
          <Search onClick={()=> {setSearchMenu(true)}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              name={"search"}
              onChange={handleChange}
              value={data.search}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, fontStyle:  'Montserrat' }}>
            {pages.map((page, id) => (
              <Button
                key={id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.value}>
                {page.page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PhotoFilter />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={darkModeSetter}
              color="inherit"
            >
              {darkMode? <DarkMode /> : <LightMode />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <ErrorPop open={popUp} close={setPopUp} errorMessage={popMessage} />
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {searchMenu && <section className="searchSection">
        {emptySearch === "Empty" ? <>
        {movies.length === 0 ? <>
          <Skeleton height={'3rem'} width={'100%'} />
          <Skeleton height={'3rem'} width={'100%'} />
          <Skeleton height={'3rem'} width={'100%'} />
          <Skeleton height={'3rem'} width={'100%'} />
        </> : <ul>
          {movies.map((movie, id)=> {
            return <li key ={id} onClick={()=> {setSearchMenu(false); handleMovieClick(movie._id)}}>
              <Link to={`${movie._id}`}>
              <SearchIcon /> 
              <h4>{movie.name}</h4>
              <img src={movie.img} alt={movie.name} />
              </Link>
            </li>
          })}
          </ul>}
        </> : <>
        <h3>No movies Found😥</h3>
        <p>Here are some things you can try:</p>
        <ul>
          <li>Check your spelling</li>
          <li>you can only search by name</li>
          <li>Check your connection</li>
        </ul></>}
        </section>}
    </Box>
    </div>
    }
    </>
  );
}