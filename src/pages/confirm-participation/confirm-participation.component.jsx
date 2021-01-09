import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils';
import './confirm-participation.styles.scss'

class ConfirmParticipation extends Component {

    constructor(props) {
        super(props);


        if (!localStorage.getItem('currentUser')) {
            this.props.history.push('/login')
        }
        if (!localStorage.getItem('eventObject')) {
            this.props.history.push('/dashboard')
        }

        this.state = {
            eventObject: JSON.parse(localStorage.getItem('eventObject')),
            anchorE1: null,
            selectedItemIndex: 0,
            error: false,
            message: "",
            userEmailsData: {},
            userEmailsFetch: false,
            confirmedUsers: [],
            confirmedUsersFetch: false
        }
    }

    componentWillUnmount() {
        // localStorage.removeItem("eventObject")
    }

    componentDidMount() {
        fetch("http://localhost:8080/event/getInterestedUsersEmail/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                interestedUsernames: this.state.eventObject.interestedUsers,
            }),
        })
            .then(res => res.json())
            .then(({ error, dataObject, message }) => {
                if (error) {
                    alert(message);
                    this.setState({ error: true, message });
                } else {
                    // alert(message);
                    console.log(message);
                    this.setState({ message, error: false, userEmailsData: dataObject, userEmailsFetch: true });
                }
            })
            .catch(err => {
                alert(err.message);
                this.setState({ error: true, message: err.message, confirmedUsersFetch: true })
            })

        /*Current event name*/
        const eventName = JSON.parse(localStorage.getItem("eventObject")).eventName

        firestore.doc(`events/${eventName}`)
            .get()
            .then((eventSnapshot) => {
                var eventData = eventSnapshot.data();
                this.setState({ confirmedUsers: eventData.confirmedUsers, confirmedUsersFetch: true }, () => console.log(this.state.confirmedUsers))

            })

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
    handleConfirmParticipation = (username, userEmail) => {
        console.log(username, userEmail);
        const { eventName, eventDataTime, eventLocation, eventOrganiser, eventOrganiserEmail } = this.state.eventObject;

        fetch("http://localhost:8080/event/confirmParticipation/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                userEmail,
                eventName,
                eventDataTime,
                eventLocation,
                eventOrganiser,
                eventOrganiserEmail
            }),
        })
            .then(res => res.json())
            .then(({ message, error }) => {
                if (error) {
                    alert(message);
                    this.setState({ error: true, message });
                } else {
                    firestore.doc(`events/${eventName}`).update({
                        confirmedUsers: firebase.firestore.FieldValue.arrayUnion(username)
                    })
                        .then(() => {
                            alert(message + " and firebase updated");
                            this.setState({ error: false, message });
                            window.location.reload();
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("Error Updating confirmed Users\n" + err.message)
                            this.setState({ error: true, message: err.message })

                        })

                }
            })
            .catch(err => {
                alert(err.message);
                this.setState({ error: true, message: err.message })
            })

    }

    render() {
        // const { eventObject } = this.state;
        // console.log(eventObject.interestedUsers);

        if (!(this.state.userEmailsFetch && this.state.confirmedUsersFetch)) {
            return <h1> Loading....</h1>
        }
        else if (this.state.userEmailsFetch && this.state.confirmedUsersFetch) {
            const { userEmailsData } = this.state;
            console.log(this.state.eventObject);

            return (
                <div className='event-participation' style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "50vw" }}>
                        <br /><br />
                        <h1>Confirm Participation</h1>
                        {
                            Object.keys(userEmailsData).map(username => (
                                this.state.confirmedUsers.includes(username) === false ?
                                    <div key={username}>
                                        <Button style={{ color: "#424242" }} onClick={(e) => this.handleConfirmParticipation(username, userEmailsData[username])}>
                                            Confirm {username} participation
                                </Button><br />
                                    </div>
                                    : <></>
                            ))
                        }
                    </div>
                    <div style={{ width: "50vw" }}>
                        <br /><br />
                        <h1>Confirmed Participants</h1>
                        {
                            this.state.confirmedUsers.map(username => (
                                <div key={username}>
                                    <Button disabled style={{ color: "#424242" }} onClick={(e) => this.handleConfirmParticipation(username, userEmailsData[username])}>
                                        {username}
                                    </Button><br />
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }

    }
}

export default ConfirmParticipation;