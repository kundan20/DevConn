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
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',      
      backgroundColor: theme.palette.background.paper          
    },
    inline: {
      display: 'inline',
    },
  }));
  
const Experience = ({ experience, deleteExperience }) => {
    const classes = useStyles();
    //experience = experience.find().sort({datefield:1})
//     experience = experience.find().sort({datefield: -1}.exec(function(err, docs) { }));

    const experiences = experience.map(exp => (
        <Fragment>    
              <ListItem key = {exp._id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant="h5">{exp.company}</Typography>}
                    secondary={
                        <Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >{exp.title}{' '}
                            </Typography>
                            <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}{
                                exp.to === null ? ('Present') : (
                                    <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                                )
                            }
                        </Fragment>
                    } />

                <ListItemSecondaryAction>
                    <Fab color="secondary" aria-label="delete" size="small">
                        <DeleteIcon  onClick={() => deleteExperience(exp._id)}/>
                    </Fab>                   
                </ListItemSecondaryAction>                
            </ListItem>
            {experience.length > 1 && <Divider variant="inset" component="li" /> }            
        </Fragment>

            
    ));
    return (
       <Fragment>
           <h2 className="my-2">Experience</h2>
           <List className={classes.root}>          

               {experiences}
               
           </List>

       </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

//export default Experience;


export default connect(null, { deleteExperience })(Experience)
