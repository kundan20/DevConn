import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading }}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            { loading || posts === null  ? <i class="fa fa-spinner fa-spin fa-4x"
            style = {{ width: '5rem', height: '7rem', margin:'auto', marginTop:'10rem', display: 'block'}}
            > </i> : (
            <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i class="fas fa-users"></i> Welcome to the Community
                    </p> 
                    <PostForm />
                    <div className="posts">
                        {posts.map(post=>(
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
            </Fragment>
            )}
        </Fragment>
        )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts)
