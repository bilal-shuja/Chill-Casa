import React from 'react';
import {useNavigate} from 'react-router-dom';
import colorScheme from '../Colors/Styles.js';

const Navbar = () => {
 const navigate = useNavigate();
  
 // Logout functionality from admin dashboard:
   
  const logOut = async ()=>{
    let login = await  localStorage.setItem('login',false);
    if(login === false){
      navigate('/')
      setInterval(() => {
        window.location.reload(true)
    }, 1500);
    } 

  }
 
  return (
    <>
{/* Navbar */}
<nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{background:colorScheme.nav_side_footer_bg, borderBottom:"1px solid #fff"}}>
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item"  >
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" style={{color:colorScheme.card_txt_color}} /></a>
    </li>
    {/* <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link" style={{color:colorScheme.card_txt_color}}>Home</a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link" style={{color:colorScheme.card_txt_color}}>Contact</a>
    </li> */}
  </ul>
  <ul className="navbar-nav ml-auto">

    {/* <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
 */}
{/* 
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-comments" />
        <span className="badge badge-danger navbar-badge">3</span>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <a href="#" className="dropdown-item">
          
          <div className="media">
            <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Brad Diesel
                <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">Call me whenever you can...</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <div className="media">
            <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                John Pierce
                <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">I got your message bro</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <div className="media">
            <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
            <div className="media-body">
              <h3 className="dropdown-item-title">
                Nora Silvester
                <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
              </h3>
              <p className="text-sm">The subject goes here</p>
              <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
            </div>
          </div>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
      </div>
    </li>
     */}
    <li className="nav-item dropdown" >
      <a className="nav-link" data-toggle="dropdown" href="#" style={{color:colorScheme.card_txt_color}}>
        <i className="fa-solid fa-power-off "  style={{fontSize:"1.3em"}}/>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <div className="dropdown-divider"style={{background: colorScheme.card_bg_color, }}  />
        <a href="/"  className="dropdown-item" style={{background: colorScheme.card_bg_color,color: colorScheme.card_txt_color, cursor:"pointer"}}  onClick={logOut}>
          <i className="fas fa-lock mr-2" />logout </a>
      </div>
    </li>

    {/* <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li> */}


    {/* <li className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" href="/" data-slide="true"  role="button" onClick={logOut} style={{color:colorScheme.card_txt_color}}>
        <i className="fas fa-lock " style={{fontSize:"1.4em"}}  />
      </a>
    </li> */}
  </ul> 
</nav>
{/* /.navbar */}

    </>
  )
}

export default Navbar