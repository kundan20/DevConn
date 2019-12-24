import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education :{ school, from, to, degree, fieldofstudy } }) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <Moment format='MMM YYYY'>{from}</Moment> -{' '}{
                                to === null ? ('Present') : (
                                    <Moment format='MMM YYYY'>{to}</Moment>
                                )
                            }
            <p><strong>Degree: </strong>{degree}</p>
            <p>
              <strong>Field of Study: </strong>{fieldofstudy}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation
