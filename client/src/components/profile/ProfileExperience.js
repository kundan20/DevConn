import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
    return (
        <div>
            <h3 className="text-dark">{experience.company}</h3>
            <Moment format='MMM YYYY'>{experience.from}</Moment> -{' '}{
                                experience.to === null ? ('Present') : (
                                    <Moment format='MMM YYYY'>{experience.to}</Moment>
                                )
                            }
            <p><strong>Position: </strong>{experience.title}</p>
            <p>
              <strong>Description: </strong>{experience.description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
