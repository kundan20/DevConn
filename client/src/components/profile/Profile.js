import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ getProfileById, auth : { isAuthenticated, user }, profile: { profile, loading }, match}) => {
    useEffect(() => {getProfileById(match.params.id)}, [getProfileById, match.params.id])

    return (
        <Fragment>
            {loading || profile === null ? <i class="fa fa-spinner fa-spin fa-4x"
    style = {{ width: '5rem', height: '7rem', margin:'auto', marginTop:'10rem', display: 'block'}}
    ></i> : (<Fragment>

        <Link className="btn btn-light my-1" to="/dev-profiles"><i class="fas fa-arrow-circle-left"></i>{' '}
            <span className = "hide-sm">Go Back
            </span>
        </Link>
        { isAuthenticated && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
            <i className="fas fa-user"></i>{' '}Edit Profile
            </Link>
        )}

        <div className="profile-grid my-l">
            <ProfileTop profile = {profile} />
            <ProfileAbout profile = {profile} />

            <div className="profile-exp p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (<Fragment>
                    {profile.experience.map(experience => (
                        <ProfileExperience key={experience._id} experience = {experience} />
                    ))}
                </Fragment>) : (<h4> No experiences found... </h4>)}
            </div>

            <div className="profile-edu p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (<Fragment>
                    {profile.education.map(education => (
                        <ProfileEducation key={education._id} education = {education} />
                    ))}
                </Fragment>) : (<h4> No education found... </h4>)}
            </div>

            {profile.githubusername && (
                <ProfileGithub username = {profile.githubusername} />
            )}
        </div>



        
    </Fragment> )}
</Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});


export default connect(mapStateToProps, { getProfileById })(Profile)
