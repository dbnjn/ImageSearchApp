import React,{useState,useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import "./navbar.css";
import axios from "axios";
import {API_KEY} from "../apis";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
   
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
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
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function SearchNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const[searchText,setSearchText]=useState("");
  const[searchData,setSearchData]=useState([]);
const[getImgValue,setGetImgValue]=useState(""); 
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  
  
  useEffect(() => {
  
    const searchDataFunc=async()=>{
    try {
      const searchData = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchText}&format=json&nojsoncallback=1`);
      
     if(searchData !=="" && searchData !==null && searchData !==undefined){
      setSearchData(searchData.data.photos)
     }
    } catch (error) {
      return error
    }
    }  
    searchDataFunc()
    }, [searchText])

const getValues=(data)=>{
 
  props.parentCallback(data);
}

const handleChange=(e)=>{
  setSearchText(e.target.value)
}


// console.log("jjj",getImgValue) 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" noWrap>
            Image Searching Application
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e)=>handleChange(e)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className="dropdown-nav">
            <ul>
              {searchData?.photo?.map(value=>{
                
                return(
                  
                  <li key={value.id}>
                    <a href="#" onClick={()=>getValues(value)} >{value.title}</a>
                    </li>
                  
            
                )
               
              })}
            </ul>
          <div className="clear-text">
          <button>Close</button>
          </div>
          
            </div>
          
          </div>
          
          {/* <div className={classes.grow} />  */}
         
        </Toolbar>
       
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
