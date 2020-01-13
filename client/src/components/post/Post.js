import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommnentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return (
        <Fragment>
            { loading || post === null  ? <i class="fa fa-spinner fa-spin fa-4x"
            style = {{ width: '5rem', height: '7rem', margin:'auto', marginTop:'10rem', display: 'block'}}
            > </i> : (
            <Fragment>
                <Link to='/posts' className="btn btn-light my-1"><i class="fas fa-arrow-circle-left"></i>{' '}
                    <span className = "hide-sm">Go Back
                    </span>
                </Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className="comments">
                    { post.comments.map(comment => (
                        <CommnentItem key={comment._id} comment = {comment} postId = {post._id} />
                    ))}
                </div>
            </Fragment>
            )}
        </Fragment>
        )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post)
