import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComments } from '../../actions/post';


const CommentForm = ({ postId, addComments }) => {

    const [ text, setText ] = useState('');

    return (
        <div className="post-form">
        <div className="bg-primary p borderRadiusImportant">
          <h3>Leave a Comment...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addComments( postId,  { text });
            setText('');
        }}>
          <textarea
            className="borderRadiusImportant"
            name="text"
            cols="30"
            rows="5"
            placeholder="Put your thoughts here..."
            value={text}
            onChange={e => setText(e.target.value)}
            required            
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
        
    )
}

CommentForm.propTypes = {
    addComments: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
  }

export default connect(null, { addComments })(CommentForm)
