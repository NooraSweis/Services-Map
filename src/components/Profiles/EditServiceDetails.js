import React, { Component } from 'react';
import fire,{ firestore } from '../config';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';

class EditServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', name: '', description: '', address: '', status: '',url:'',
            phone: '', src: img, FileName: 'servicesDefault.png', image: false,
            enabled: 'disabled', read: true, newName: '', newDescription: '',
            newAddress: '',newStatus: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.edit = this.edit.bind(this);
        this.saveChanges=this.saveChanges.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }
    changeHandler = (event) => {
        this.setState({
            ...this.state, url: URL.createObjectURL(event.target.files[0]), image: true, FileName: "" + this.props.userID + this.props.numberOfServices + event.target.files[0].name
            , file: event.target.files[0]
        });
    };
    changeName = (e) => {
        this.setState({ ...this.state, newName: e.target.value });
    };
    changeDesc = (e) => {
        this.setState({ ...this.state, newDescription: e.target.value });
    };
    changeAddress = (e) => {
        this.setState({ ...this.state, newAddress: e.target.value });
    };
    changeStatus = (e) => {
        this.setState({ ...this.state, newStatus: e.target.value });
    };
    edit = () => {
        this.setState({ ...this.state, read: false, enabled: '' })
    }
    saveChanges = (e) => {
        e.preventDefault();
        if (this.state.newName !== '' && this.state.newDescription !== '' && this.state.newStatus !== '' && this.state.newAddress !== '') {
            firestore.collection("services").doc(this.props.item.id).update({
                name: this.state.newName,
                description: this.state.newDescription,
                address: this.state.newAddress,
                status: this.state.newStatus
            }).then(() => {
                if(this.state.image){
                    const storageRef = fire.storage().ref().child(this.state.FileName);
                storageRef.put(this.state.file).then(()=>{
                    firestore.collection("services").doc(this.props.item.id).update({
                        serviceImg:this.state.FileName
                    })
                })
                }
                this.setState({ ...this.state, read: true, enabled: 'disabled' })
                alert("Changed successfully")
            })
        }else{
            alert("All fields are required!")
        }
    }
    deleteItem = (e) => {
        e.preventDefault();
        firestore.collection("services").doc(this.props.item.id).delete().then(() => {
            alert("Service successfully deleted!");
        }).catch((error) => {
            alert("Error removing service: ", error);
        });
    }
    componentDidMount() {
        this.setState({
            src: this.props.item.serviceImg,
            name: this.props.item.name,
            description: this.props.item.description,
            address: this.props.item.address,
            status: this.props.item.status,
            phone: this.props.item.phone,
            newName: this.props.item.name,
            newDescription: this.props.item.description,
            newAddress: this.props.item.address,
            newStatus: this.props.item.status,
            url:this.props.item.url
        }
        )
    }

    render() {
        return (
            <center className='fieldsChange' >
                <img src={this.state.url} alt="logo" id='ServicePic' style={{ width: '95%', height: '250px' }} />
                <div className='edit' onClick={this.edit}>Edit</div>
                <form>
                    <label htmlFor="img2">Select image:</label>
                    <input type="file" id="img2" name="img2" accept="image/*" onChange={this.changeHandler} readOnly={this.state.read} />
                    <label htmlFor='editSName'>Service Name :</label>
                    <input type='text' id='editSName' name='editSName' defaultValue={this.state.name} onChange={this.changeName} readOnly={this.state.read} />
                    <br />
                    <label htmlFor='editSDesc'>Description :</label>
                    <input type='text' id='editSDesc' name='editSDesc' defaultValue={this.state.description} onChange={this.changeDesc} readOnly={this.state.read} />
                    <br />
                    <label htmlFor='editSPhone'>Phone :</label>
                    <input type='text' id='editSPhone' name='editSPhone' defaultValue={this.state.phone} readOnly />
                    <br />
                    <label htmlFor='editSAddress'>Address :</label>
                    <input type='text' id='editSAddress' name='editSAddress' defaultValue={this.state.address} onChange={this.changeAddress} readOnly={this.state.read} />
                    <br />
                    <label htmlFor='editSStatus'>Status :</label>
                    <input type='text' id='editSStatus' name='editSStatus' defaultValue={this.state.status} onChange={this.changeStatus} readOnly={this.state.read} />
                    <br />
                    <button className='continue' id='editSForm' name='editSForm' disabled={this.state.enabled} onClick={this.saveChanges}>Save Changes</button>
                    <button className='continue' onClick={this.deleteItem}>Delete</button>
                </form>
            </center>
        );
    }
}
export default EditServiceDetails;