import React from 'react';
import jwt_decode from "jwt-decode";
import {SimpleTable, Avatar} from "@dossier/mithra-ui";
import '../css/profile.css';

const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL


export class Profile extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            userInfo: {},
            loginError: ''
        }
    }

    async getUserInfo(userId: Number) {
        const result: any = await axios(serverUrl + '/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': localStorage.getItem('dossier_session_token')
            },
            data: {userId}
        })
        return result;
    }

    handleEditProfile() {

        // @ts-ignore
        const newPhoneNumber = document.getElementById('tlfnr').innerText
    }


    async componentDidMount() {
        const token: any = localStorage.getItem('dossier_session_token')
        const decoded: any = jwt_decode(token);

        try {
            const userInfoResult: any = await this.getUserInfo(decoded.id);
            if (!userInfoResult) {
                this.setState({
                    loginError: 'Could not find user!'
                })
                return;
            }
            const userInfo = userInfoResult.data
            this.setState({userInfo});
        } catch (error) {
            this.setState({
                loginError: 'Something went wrong!'
            })
            return;
        }
    }

    render() {
        // @ts-ignore
        const user = this.state.userInfo;
        // @ts-ignore
        const {loginError} = this.state
        if (loginError) {
            return <div>{loginError}!</div>
        }
        const profilePicture = user.profile_picture;
        let initials;
        if (user.first_name) {
            initials = user.first_name.slice(0, 1).concat(user.last_name.slice(0, 1))
        }


        return (
            <div className={'profilePageContainer'}>
                <div className={'profileCard'} >
                    <Avatar
                        imageUrl={profilePicture}
                        initials={initials}
                        size="200px"
                        title="Profile picture"
                        className={'profilePicture'}

                    />

                    <SimpleTable>
                        <tbody>
                        <tr>
                            <th>
                                Navn:
                            </th>
                            <td>
                                {user.first_name} {user.last_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                E-post:
                            </th>
                            <td>
                                {user.email}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Telefonnummer:
                            </th>
                            <td>
                                {user.phone_number}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Spesialisering:
                            </th>
                            <td>
                                {user.specialization_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Stilling:
                            </th>
                            <td>
                                {user.position_name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Arbeidssted:
                            </th>
                            <td>
                                {user.location_name}
                            </td>
                        </tr>
                        </tbody>
                    </SimpleTable>
                </div>
            </div>
        );
    }
}