import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import ServiceDetailsDialog from './ServiceDetailsDialog';
import { CustomDialog, StaticDialog } from 'react-st-modal';
import EditServiceDetails from './EditServiceDetails';
import fire, { auth, firestore } from '../config';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { connect } from "react-redux";

const MySwal = withReactContent(Swal);
var urlser = '';

class SPprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [], urlImage: '', enabled: 'disabled', read: true, id: '', name: '',
            email: '', password: '', phone: '', serviceType: '', description: '',
            newName: '', newpassword: '', newConf: '', newPhone: '', newType: '',
            newDescription: '', arr: [], numberOfServices: 0, search: '',
            open: false
        };
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.changeConfirmpassword = this.changeConfirmpassword.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.showData = this.showData.bind(this);
        this.searching = this.searching.bind(this);
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
    changePhone = (e) => {
        this.setState({ ...this.state, newPhone: e.target.value })
    }
    changeServiceType = (e) => {
        this.setState({ ...this.state, newType: e.target.value })
    }
    changeDescription = (e) => {
        this.setState({ ...this.state, newDescription: e.target.value })
    }
    edit = () => {
        this.setState({ ...this.state, read: false, enabled: '' })
    }
    showData = () => {
        fire.firestore().collection('services').where('email', '==', auth.currentUser.email)
            .get().then((snap) => {
                snap.forEach((doc) => {
                    return (<div className='sepcService' >
                        {doc.data().name}
                    </div>)

                })
            })
    }
    searching = (e) => {
        this.setState({ ...this.state, search: e.target.value.toString() });
    }
    componentDidMount() {
        this.getServicesData();
    }

    getServicesData() {
        const user = auth.currentUser;
        if (user) {
            firestore.collection('User').where('email', '==', user.email).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        id: doc.id,
                        name: doc.data().name, email: doc.data().email, password: doc.data().password,
                        phone: doc.data().phone, serviceType: doc.data().serviceType, description: doc.data().description,
                        newName: doc.data().name, newpassword: doc.data().password, newConf: doc.data().password,
                        newPhone: doc.data().phone, newType: doc.data().serviceType, newDescription: doc.data().description,
                        numberOfServices: doc.data().numberOfServices
                    })
                })
            })

            if (this.state.serviceList.length === 0) {
                firestore.collection('services').where('email', '==', user.email).get().then((snap) => {
                    snap.forEach((doc) => {
                        urlser = '';
                        fire.storage().ref().child(doc.data().serviceImg).getDownloadURL().then(url => {
                            urlser = doc.data().serviceImg === 'servicesDefault.png' ? 'https://i.ibb.co/kh3k0Zw/services-Default.jpg' : url;
                        }).then(() => {
                            this.setState({
                                ...this.state,
                                serviceList: [...this.state.serviceList,
                                {
                                    id: doc.id.toString(),
                                    name: doc.data().name.toString(),
                                    email: doc.data().email.toString(),
                                    phone: doc.data().phone.toString(),
                                    serviceImg: doc.data().serviceImg,
                                    status: doc.data().status.toString(),
                                    url: urlser,
                                    address: doc.data().address.toString(),
                                    description: doc.data().description.toString()
                                }
                                ]
                            });
                        })
                    })
                })
            }
        }
    }

    componentWillUnmount() {
        this.setState({ name: '', email: '', password: '', phone: '', serviceType: '', description: '' });
    }

    save = (e) => {
        e.preventDefault();
        const newName = this.state.newName;
        const newpass = this.state.newpassword;
        const newconf = this.state.newConf;
        const newPhone = this.state.newPhone;
        const newType = this.state.newType;
        const newDesc = this.state.newDescription;
        var x;
        if (newName.length < 2)
            this.alertError('name field is required and must be 3 or more characters long!')
        else if (!(newpass.match(/[0-9]/g)) || !(newpass.match(/[a-z]/g)) || !(newpass.match(/[A-Z]/g)) || newpass.length < 8) {
            this.alertError('password must be at least 8 characters , at least one capital and one small letter')
        }
        else if (newPhone.length < 1 || newType.length < 1 || newDesc.length < 1)
            this.alertError('all fields are required')
        else if (newpass === newconf) {
            fire.firestore().collection("User").where('email', '==', this.state.email).get().then((snap) => {
                snap.forEach((doc) => {
                    x = doc.id;
                    fire.firestore().collection('User').doc(x).update({
                        name: newName, password: newpass, phone: newPhone,
                        serviceType: newType, description: newDesc
                    }).then(()=>{
                        localStorage.setItem('user name', newName);
                        this.props.edit({type :'editName'});

                    });
                    var user = fire.auth().currentUser;
                    user.updatePassword(newpass);
                    this.setState({ ...this.state, read: true, newpassword: '', newConf: '', enabled: '' })
                    MySwal.fire({
                        position: 'center',
                        imageUrl: 'https://i.ibb.co/8PMsjTS/check-circle.gif',
                        imageWidth: 50,
                        imageHeight: 50,
                        text: 'Updated!',
                        width: 400,
                        showConfirmButton: false,
                        timer: 1200
                    })
                })
            })
                .catch((err) => {
                    console.log("err " + err.toString())
                })
        }
        else { this.alertError("password doesn't match") }
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

    render() {
        return (
            <div className='externalDiv' id='scrollDiv'>
                <div className='header'>
                    <img src={logo} alt='logo' className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <div className='edit' onClick={this.edit} style={{ width: '90%' }}>Edit</div>
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='nameSP'>Name :</label>
                        <input type='text' id='nameSP' name='nameSP' defaultValue={this.state.name} onChange={this.changeName} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='emailSP'>Email :</label>
                        <input type='email' id='emailSP' name='emailSP' defaultValue={this.state.email} onChange={this.changeEmail} readOnly />
                        <br />
                        <label htmlFor='passwordSP'>Password :</label>
                        <input type='password' id='passwordSP' name='passwordSP' defaultValue={this.state.password} onChange={this.changepassword} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='confirmSP'>Confirm Password :</label>
                        <input type='password' id='confirmSP' name='confirmSP' defaultValue={this.state.password} onChange={this.changeConfirmpassword} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='phoneSP'>Phone :</label>
                        <input type='text' id='phoneSP' name='phoneSP' defaultValue={this.state.phone} onChange={this.changePhone} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='typeSP'>Service type :</label>
                        <input type='text' id='typeSP' name='typeSP' defaultValue={this.state.serviceType} onChange={this.changeServiceType} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='descSP'>Description :</label>
                        <input type='text' id='descSP' name='descSP' defaultValue={this.state.description} onChange={this.changeDescription} readOnly={this.state.read} />
                        <br />
                        <button type='submit' className='Save-Changes' disabled={this.state.enabled} id='formSP' name='formSP' onClick={this.save}>Save Changes</button>
                    </form>
                </div>
                <hr />
                <div className='Delete' onClick={async () => {
                    await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</div>
                <hr />
                <div className='serviceDiv'>
                    <div className="sp-profile-search-row">
                        <h3 className='part2'>Services :</h3>
                        <StaticDialog
                            isOpen={this.state.open}
                            title="Add Service Details"
                            showCloseIcon={true}
                            onAfterClose={(result) => {
                                if (result) {
                                    this.setState({
                                        ...this.state,
                                        open: false,
                                        serviceList: [...this.state.serviceList, result]
                                    });
                                } else {
                                    this.setState({
                                        ...this.state,
                                        open: false
                                    });
                                }
                            }}
                        >
                            <ServiceDetailsDialog numberOfServices={this.state.numberOfServices + 1}
                                userID={this.state.id} userEmail={this.state.email}
                                userPhone={this.state.phone} />
                        </StaticDialog>
                        <button className='plus' onClick={() => {
                            this.setState({ ...this.state, open: true })
                        }}>&#43;</button>
                        <input type='search' placeholder='Search' className='search' id='search' name='search' onChange={this.searching} />
                    </div>

                    <div className="sp-profile-display-all-services">
                        {
                            this.state.serviceList !== 0 ?
                                this.state.serviceList.map((item, index) => (
                                    (this.state.search === '' || item.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) || item.description.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())) ?
                                        (<div className='showServices' key={index}
                                            onClick={async () => {
                                                await CustomDialog(<EditServiceDetails item={item} userID={this.state.id} numberOfServices={this.state.numberOfServices + 1} 
                                                     />, {
                                                    title: 'Service Details',
                                                    showCloseIcon: true,
                                                });
                                            }}
                                            style={{
                                                backgroundImage: "url(" + item.url + ")", backgroundSize: '100% 100%',
                                                backgroundRepeat: "no-repeat"
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </div>) : (
                                            console.log('nothing')
                                        )
                                ))
                                :
                                <div>Add New Services to see!</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
	return {
		edit: (item) => dispatch(item)
	};
}
export default (connect(null, mapDispatchToProps)(SPprofile));