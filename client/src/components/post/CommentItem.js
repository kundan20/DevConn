import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComments, updateComments } from '../../actions/post';

const CommnentItem = ({
    postId,
    comment: { _id, date, text, name, avatar, user },
    auth,
    deleteComments,
    updateComments
}) => {
    const [ displayUpdateInputs, toggleUpdateInputs ] = useState(false);
    const [ _text, _setText ] = useState('');

    return (
        <div className="post bg-white p-1 my-1 borderRadiusImportant">
          <div>
            <Link to={`/profile/${name}/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
                <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment  format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                    <button      
                        type="button"
                        className="btn btn-dark"
                        // onClick = {e => updateComments(postId, _id)}
                        onClick={() => toggleUpdateInputs(!displayUpdateInputs)}
                    >
                    <i className="fas fa-edit"></i>
                    </button>        
            )}
            { displayUpdateInputs && <Fragment>
                <div className="post-form">                   
                    <form className="form my-1" onSubmit={e=>{
                        e.preventDefault();
                        updateComments( postId, _id, { _text });
                        _setText('');
                    }}>
                    <textarea
                        className="borderRadiusImportant"
                        name="_text"
                        cols="30"
                        rows="5"
                        placeholder="Modify your comments."
                        value={_text}
                        onChange={e => _setText(e.target.value)}
                        required            
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>
                
                </Fragment> }

            {!auth.loading && user === auth.user._id && (
                <button      
                    type="button"
                    className="btn btn-danger"
                    onClick = {e => deleteComments(postId, _id)}
                >
                <i className="fas fa-times"></i>
                </button>
            )}   
          </div>

            

        </div>
    )
}

CommnentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComments: PropTypes.func.isRequired,
    updateComments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ deleteComments, updateComments })(CommnentItem);
