import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { CustomDialog } from 'react-st-modal';
import fire from '../config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { connect } from "react-redux";

const MySwal = withReactContent(Swal);

class MainComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: "",
            password: "",
            confirmPassword: ""
        };
        this.state = { enabled: 'disabled', read: true, name: '', email: '', password: '', newName: '', newpassword: '', newConf: '' };
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.changeConfirmpassword = this.changeConfirmpassword.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
    }
    changeName = (e) => {
        this.setState({ ...this.state, newName: e.target.value })
    }
    changeEmail = (e) => {
        this.setState({ ...this.state, email: e.target.value })
    }
    changepassword = (e) => {
        this.setState({ ...this.state, newpassword: e.target.value })
    }
    changeConfirmpassword = (e) => {
        this.setState({ ...this.state, newConf: e.target.value })
    }
    edit = () => {
        this.setState({ ...this.state, read: false, enabled: '' })
    }
    async componentDidMount() {
        const user = fire.auth().currentUser;
        if (user) {
            fire.firestore().collection('User').where('email', '==', user.email).get().then((snapshot) => {
                snapshot.forEach((doc) => {

                    this.setState({ name: doc.data().name, email: doc.data().email, password: doc.data().password })
                })
            })
        }
    }
    /*componentWillUnmount() {
        this.setState({ name: '', email: '', password: '' });
    }*/
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    alertError = (e) => {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/R06Zrjb/animation-200-ko7omjl5.gif',
            imageWidth: 100,
            imageHeight: 100,
            text: e,
            width: 400,
            showConfirmButton: true
        })
    }

    alertUpdated(e) {
        MySwal.fire({
            position: 'center',
            imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
            imageWidth: 50,
            imageHeight: 50,
            text: e,
            width: 400,
            showConfirmButton: false,
            timer: 2500
        })
    }

    save = (e) => {
        e.preventDefault();
        const newName = this.state.newName;
        const newpass = this.state.newpassword;
        const newconf = this.state.newConf;
        var x;
        if (newName !== '' && newpass === '' && newconf === '') {
            fire.firestore().collection("User").where('email', '==', this.state.email).get().then((snap) => {
                snap.forEach((doc) => {
                    x = doc.id;
                    fire.firestore().collection('User').doc(x).update({ name: newName })
                    .then(()=>{
                        localStorage.setItem('user name', newName);
                        this.props.edit({type :'editName'});
                    })
                    this.alertUpdated('Your profile is updated');
                    this.setState({ ...this.state, read: true, newName: '', newpassword: '', newConf: '', enabled: '' })
                })
            })
                .catch((err) => {
                    console.log("err " + err.toString())
                })
        }
        /**********************************************/
        else if (newName !== '' && (newpass !== '' || newconf !== '')) {
            if (newName.length < 2 || !(newpass.match(/[0-9]/g)) || !(newpass.match(/[a-z]/g)) || !(newpass.match(/[A-Z]/g)) || newpass.length < 8) {
                if (newName.length < 2)
                    this.alertError('name field is required and must be 3 or more characters long!')
                else
                    this.alertError('password must be at least 8 characters , at least one capital and one small letter')
            }
            else if (newpass === newconf) {
                fire.firestore().collection("User").where('email', '==', this.state.email).get().then((snap) => {
                    snap.forEach((doc) => {
                        x = doc.id;
                        fire.firestore().collection('User').doc(x).update({ name: newName, password: newpass });
                        var user = fire.auth().currentUser;
                        user.updatePassword(newpass);
                        this.alertUpdated('your profile is updated');
                        this.setState({ ...this.state, read: true, newName: '', newpassword: '', newConf: '', enabled: '' })
                    })
                })
                    .catch((err) => {
                        console.log("err " + err.toString())
                    })
            }
            else { this.alertError("password doesn't match") }

        }
        /*************************************************************/
        else if (newName === '' && (newpass !== '' || newconf !== '')) {
            if (!(newpass.match(/[0-9]/g)) || !(newpass.match(/[a-z]/g)) || !(newpass.match(/[A-Z]/g)) || newpass.length < 8) {

                this.alertError('password must be at least 8 characters , at least one capital and one small letter')
            }
            else if (newpass === newconf) {
                fire.firestore().collection("User").where('email', '==', this.state.email).get().then((snap) => {
                    snap.forEach((doc) => {
                        x = doc.id;
                        fire.firestore().collection('User').doc(x).update({ password: newpass });
                        var user = fire.auth().currentUser;
                        user.updatePassword(newpass);
                        this.alertUpdated('your profile is updated');
                        this.setState({ ...this.state, read: true, newName: '', newpassword: '', newConf: '', enabled: '' })
                    })
                })
                    .catch((err) => {
                        console.log("err " + err.toString())
                    })
            }
            else { this.alertError("password doesn't match") }
        }
    }

    /******************************* */

    render() {
        return (
            <div className='externalDiv'>
                <div className='header'>
                    <img alt="logo" src={logo} className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <div className='edit' style={{ width: '90%' }} onClick={this.edit}>Edit</div>
                <br />
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='namePerson'>Name :</label>
                        <input type='text' id='namePerson' name='namePerson' defaultValue={this.state.name} onChange={this.changeName} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='emailPerson'>Email :</label>
                        <input type='email' id='emailPerson' name='emailPerson' defaultValue={this.state.email} onChange={this.changeEmail} readOnly />
                        <br />
                        <label htmlFor='passwordPerson'>Password :</label>
                        <input type='password' id='passwordPerson' name='passwordPerson' defaultValue={this.state.password} onChange={this.changepassword} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='confirmPerson'>Confirm Password :</label>
                        <input type='password' id='confirmPerson' name='confirmPerson' defaultValue={this.state.password} onChange={this.changeConfirmpassword} readOnly={this.state.read} />
                        <br />
                        <button type='submit' className='Save-Changes' id='formPerson' name='formPerson' disabled={this.state.enabled} onClick={this.save}>Save Changes</button>
                    </form>
                </div>
                <hr />
                <div className='Delete' onClick={async () => {
                    await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
	return {
		edit: (item) => dispatch(item)
	};
}
export default (connect(null, mapDispatchToProps)(MainComp));