import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const ProfileItem = ({profile: {
    user: { _id, name, avatar },
    company,
    status,
    location,
    skills
}}) => {
    return <div className = "profile bg-light">
        <img src={avatar} className="round-img" />
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p className="my-l">{location && <span> {location}</span>}</p>
            <Link to={`/profile/${name}/${_id}`} className="btn btn-primary">View Profile
            </Link>
        </div>
        <ul>
            {skills.slice(0,4).map((skill, index) => (
                <li key={index} className="text-secondary">
                <i className="fas fa-check-circle"></i>{' '}{skill}
                </li>
            ))}
        </ul>

    </div>
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
