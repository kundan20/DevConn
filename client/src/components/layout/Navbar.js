import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

 const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
     const authLinks = (
        <ul>
            <li>
                <Link to ="/#!">
                    <i class="fas fa-laptop-code"></i>{' '}Developers</Link>
            </li>
            <li>
                <Link to ="/dashboard">
                    <i class="fas fa-user"></i>{' '}
                    <span className = "hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to = "/">
                    <i className = "fas fa-sign-out-alt"></i>{' '}
                    <span className = "hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
     );

     const guestLinks = (
        <ul>
            <li>
                <Link to ="#!">
                    <i class="fas fa-laptop-code"></i>{' '}Developers
                </Link>
            </li>
            <li>
                <Link to ="/register">
                    <i class="fas fa-user-plus">
                    </i>{' '}
                    <span className = "hide-sm">Sign Up
                    </span>
                </Link>
            </li>
            <li>
                <Link to ="/login">
                    <i class="fas fa-sign-in-alt">
                    </i>{' '}
                    <span className = "hide-sm">Login
                    </span>
                </Link>
            </li>
        </ul>
     );
    //  const authTitle = (        
    //     <Link to="#!">
    //         <i className ="fas fa-terminal">
    //         </i>DevConn
    //     </Link>            
    //  );
    //  const guestTitle = (
    //     <Link to="/">
    //         <i className ="fas fa-terminal">
    //         </i>DevConn
    //     </Link>          
    //  );

    return (
        <nav className ="navbar bg-dark">
            <h1>
            <Link to="/">
                <i className ="fas fa-terminal">
                </i>DevConn
            </Link>  
            </h1>
            {/* {!loading && (<h1>{isAuthenticated ? authTitle : guestTitle }</h1>)}             */}
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks }</Fragment>)}           
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
