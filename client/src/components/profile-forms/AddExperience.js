import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [ formData, setFormData ] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e =>setFormData({...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    }

    const [ toDateDisabled, toggletoDateDisabled ] = useState(false);

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer
                positions that you have had in the past
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" className="borderRadiusImportant" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" className="borderRadiusImportant" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" className="borderRadiusImportant" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input className="borderRadiusImportant" type="date" name="from" value={from} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => { setFormData({...formData, current: !current}); toggletoDateDisabled(!toDateDisabled); }}/> Current Job</p>
                </div>
                { !toDateDisabled && <Fragment>
                    <div className="form-group">
                    <h4>To Date</h4>
                    <input className="borderRadiusImportant" type="date" name="to" value={toDateDisabled ? '': to} onChange={e => onChange(e)}/>
                    </div>
                </Fragment>}
              
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    className="borderRadiusImportant"
                    onChange={e => onChange(e)}
                    value={description}
                ></textarea>
                </div>
                <input  type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard"><i class="fas fa-arrow-circle-left"></i>{' '}
                <span className = "hide-sm">Go Back
                </span>
                </Link>
            </form>
        </Fragment>       
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));

