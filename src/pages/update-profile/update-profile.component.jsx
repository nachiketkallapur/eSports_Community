import React, { Component } from 'react'

class UpdateProfile extends Component {
    render() {
        const {username} = this.props.match.params;
        return (
            <div>
                <h1>Update Profile Page</h1>
            </div>
        )
    }
}

export default UpdateProfile;
