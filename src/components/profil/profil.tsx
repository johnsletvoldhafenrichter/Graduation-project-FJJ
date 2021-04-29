import React from 'react';

export class Profil extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      user: {}
    }
  }


  componentDidMount() {
    // const user = await getUserByUserName();
    const token = localStorage.getItem('dossier_session_token');
    console.log(token);
    // this.setState({ user });
  }

  render () {
    // const userProfile = this.state.user
    return (
      <div> Hei profil</div>
    )
  }
}