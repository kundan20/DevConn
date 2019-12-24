import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
  
const Education = ({ education, deleteEducation }) => {
    const classes = useStyles();
    const educations = education.map(edu => (
        <Fragment>    
              <ListItem key = {edu._id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                    <i className="fas fa-graduation-cap"></i>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant="h5">{edu.school}</Typography>}
                    secondary={
                        <Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >{edu.degree}{' '}
                            </Typography>
                            <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}{
                                edu.to === null ? ('Present') : (
                                    <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                                )
                            }
                        </Fragment>
                    } />

                <ListItemSecondaryAction>
                    <Fab color="secondary" aria-label="delete" size="small">
                        <DeleteIcon  onClick={() => deleteEducation(edu._id)}/>
                    </Fab>                   
                </ListItemSecondaryAction>                
            </ListItem>
            {education.length > 1 && <Divider variant="inset" component="li" /> }            
        </Fragment>

            
    ));
    return (
       <Fragment>
           <h2 className="my-2">Education</h2>
           <List className={classes.root}>       

               {educations}
               
           </List>

       </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
