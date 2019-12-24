import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createUserProfile, getCurrentUserProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, getCurrentUserProfile, createUserProfile, history }) => {
    const [ formData, setFormData ] = useState({
        company: '',
        website: '',
        location: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    });

    const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

    useEffect(() => {
        getCurrentUserProfile();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            status: loading || !profile.status ? '' : profile.status,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            youtube: loading || !profile.socail ? '' : profile.socail.youtube,
            facebook: loading || !profile.socail ? '' : profile.socail.facebook,
            twitter: loading || !profile.socail ? '' : profile.socail.twitter,
            instagram: loading || !profile.socail ? '' : profile.socail.instagram,
            linkedin: loading || !profile.socail ? '' : profile.socail.linkedin
        });
    },[loading, getCurrentUserProfile]);


    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createUserProfile(formData, history, true);
    }
    return (
       <Fragment>
        <h1 className="large text-primary">
            Edit Profile
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Update your profile to stand out
        </p>
        <form className="form" onSubmit={e=> onSubmit(e)}>
            <div className="form-group">
            <select name="status" className="borderRadiusImportant" value={status} onChange={e=>onChange(e)}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
            </select>
            <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
            <input className="borderRadiusImportant" type="text" placeholder="Company" name="company" value={company} onChange={e=>onChange(e)}/>
            <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
            <input className="borderRadiusImportant" type="text" placeholder="Website" name="website" value={website} onChange={e=>onChange(e)} />
            <small className="form-text">Could be your own or a company website</small >
            </div>
            <div className="form-group">
            <input className="borderRadiusImportant" type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
            <small className="form-text" >City & state suggested (eg. Gorakhpur, UP)</small>
            </div>
            <div className="form-group">
            <input className="borderRadiusImportant" type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>onChange(e)}/>
            <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div className="form-group">
            <input
                className="borderRadiusImportant"
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value={githubusername} onChange={e=>onChange(e)}
            />
            <small className="form-text">If you want your latest repos and a Github link, include your username</small>
            </div>
            <div className="form-group">
            <textarea className="borderRadiusImportant" placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
            <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-dark">
                Add Social Network Links
            </button>            
            </div>
            {displaySocialInputs && <Fragment>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input className="borderRadiusImportant" type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input className="borderRadiusImportant" type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input className="borderRadiusImportant" type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input className="borderRadiusImportant" type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input className="borderRadiusImportant" type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>onChange(e)} />
                </div>                
            </Fragment>
            }      

            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard"><i class="fas fa-arrow-circle-left"></i>{' '}
                <span className = "hide-sm">Go Back
                </span>
            </Link>
        </form>
       </Fragment>
    )
};

EditProfile.propTypes = {
    createUserProfile: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createUserProfile, getCurrentUserProfile })(withRouter(EditProfile));
