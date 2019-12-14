import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData ] = useState({      
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();      
        login({ email, password });
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return ( <Fragment>
        <h1 className="large text-primary">Log In</h1>
        <p className="lead"><i className="fas fa-user"></i> Log Into Your Account</p>
        <form className="form" onSubmit={ e => onSubmit(e) }>            
            <div className="form-group">
            <input className="borderRadiusImportant" type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
            <small className="form-text"
                >We uses Gravatar so if you want a profile image, use a
                Gravatar email</small>
            </div>
            <div className="form-group">
            <input
                className="borderRadiusImportant"
                type="password"
                placeholder="Password"
                name="password"
                value={password} 
                onChange={e => onChange(e)}                
                minLength="6"
            />
            </div>           
            <input type="submit" className="btn btn-primary" value="Log In" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
    </Fragment>
    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{ login })(Login);