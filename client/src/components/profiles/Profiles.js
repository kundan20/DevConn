import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';



const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {

    useEffect(() =>{
        getProfiles();
    }, []);

    return <Fragment>
        { loading ?  <i class="fa fa-spinner fa-spin fa-4x"
    style = {{ width: '5rem', height: '7rem', margin:'auto', marginTop:'10rem', display: 'block'}}
    ></i> : <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles">
            { profiles.length > 0 ? (
                profiles.map(profile => (
                    <ProfileItem key={profile._id} profile = {profile} />
                ))
            ) : <h4>No profiles found...</h4> }

        </div>

       
    

    </Fragment> }
</Fragment>;
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles)

