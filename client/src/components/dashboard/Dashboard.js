import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUserProfile, deleteAccount } from '../../actions/profile';
import Experience from './Experience';
import DashboardAction from './DashboardAction';
import Education from './Education';
import ProfileGithub from '../profile/ProfileGithub';

const Dashboard = ({ getCurrentUserProfile, deleteAccount, profile: { profile, loading }, auth: { user } }) => {
   useEffect(() =>{
       getCurrentUserProfile();
   }, []);
//    <i class="fa fa-spinner fa-spin fa-4x"></i>
   return loading && profile === null ? <i class="fa fa-spinner fa-spin fa-4x"
    style = {{ width: '5rem', height: '7rem', margin:'auto', marginTop:'10rem', display: 'block'}}
    ></i> :
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        { profile !== null ? 
        <Fragment>

            <DashboardAction />           

            {profile.experience.length !=0 && <Fragment>
                <Experience experience = {profile.experience} />
                </Fragment>}

            {profile.education.length !=0 && <Fragment>
            <Education education = {profile.education} />
            </Fragment>} 

            {profile.githubusername && (
                <ProfileGithub username = {profile.githubusername} />
            )}               
            
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>{' '}Delete Account
                </button>
            </div>
        </Fragment> :

        <Fragment>
            <p>You have not yet setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-l">
                Create Profile
            </Link>
        </Fragment>
        }
    </Fragment>
    
}

Dashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    experience: PropTypes.array.isRequired,
    deleteAccount:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});


export default connect(mapStateToProps, { getCurrentUserProfile, deleteAccount })(Dashboard)
