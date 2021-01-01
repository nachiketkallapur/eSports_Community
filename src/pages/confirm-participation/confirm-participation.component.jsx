import React, { Component } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import './confirm-participation.styles.scss'

class ConfirmParticipation extends Component {

    constructor(props) {
        super(props);

        if (!localStorage.getItem('eventObject')) {
            this.props.history.push('/dashboard')
        }

        this.state = {
            eventObject: JSON.parse(localStorage.getItem('eventObject')),
            anchorE1: null,
            selectedItemIndex: 0
        }
    }

    componentWillUnmount() {
        // localStorage.removeItem("eventObject")
    }

    handleClickListItem = (event) => {
        this.setState({ anchorE1: event.currentTarget }, () => console.log(this.state));
    };
    handleMenuItemClick = (event, index) => {
        this.setState({ selectedItemIndex: index, anchorE1: null });
    };
    handleClose = () => {
        this.setState({ anchorE1: null });
    };

    render() {

        const { eventObject } = this.state;
        console.log(eventObject.interestedUsers);
        return (
            <div className='event-participation' style={{ height: "100vh" }}>
                <br /><br />
                <h1>Confirm Participation</h1>
                <form autoComplete='off' onSubmit={this.handleConfirmParticipation}>
                    <List component="nav" aria-label="Device settings">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            onClick={this.handleClickListItem}
                        >
                            <ListItemText primary={this.state.eventObject.interestedUsers[0]} />
                        </ListItem>
                        <Menu
                            id="lock-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            {
                                this.state.eventObject.interestedUsers.map((username,index) => (
                                    <MenuItem
                                        key={username}
                                        // disabled={index === 0}
                                        selected={index === this.state.selectedItemIndex}
                                        onClick={(event) => this.handleMenuItemClick(event, index)}
                                    >
                                        {username}
                                    </MenuItem>
                                ))
                            }
                        </Menu>

                    </List>
                </form>
            </div>
        )
    }
}

export default ConfirmParticipation
