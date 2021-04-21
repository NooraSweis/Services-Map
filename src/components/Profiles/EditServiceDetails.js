import React, { Component } from 'react';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';

class EditServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', name: '', description: '', address: '', status: '',
            phone: '', src: img, FileName: 'servicesDefault.png', image: false,
            enabled: 'disabled', read: true 
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    changeHandler = (event) => {
        this.setState({
            ...this.state, src: URL.createObjectURL(event.target.files[0]), image: true, FileName: "" + this.props.userID + this.props.numberOfServices + event.target.files[0].name
            , file: event.target.files[0]
        });
    };
    changeName = (e) => {
        this.setState({ ...this.state, name: e.target.value });
    };
    changeDesc = (e) => {
        this.setState({ ...this.state, description: e.target.value });
    };
    changeAddress = (e) => {
        this.setState({ ...this.state, address: e.target.value });
    };
    changeStatus = (e) => {
        this.setState({ ...this.state, status: e.target.value });
    };

    componentDidMount() {
        this.setState({
            src: this.props.item.serviceImg,
            name: this.props.item.name,
            description: this.props.item.description,
            address: this.props.item.address,
            status: this.props.item.status,
            phone: this.props.item.phone
        })
    }

    render() {
        return (
            <center className='fieldsChange' >
                <img src={this.src} alt="logo" id='ServicePic' style={{ width: '95%', height: '250px' }} />
                <div className='edit' onClick={this.changeState}>Edit</div>
                <form>
                    <label for="img2">Select image:</label>
                    <input type="file" id="img2" name="img2" accept="image/*" onChange={this.changeHandler} />
                    <label htmlFor='editSName'>Service Name :</label>
                    <input type='text' id='editSName' name='editSName' />
                    <br />
                    <label htmlFor='editSDesc'>Description :</label>
                    <input type='text' id='editSDesc' name='editSDesc' />
                    <br />
                    <label htmlFor='editSPhone'>Phone :</label>
                    <input type='text' id='editSPhone' name='editSPhone' />
                    <br />
                    <label htmlFor='editSAddress'>Address :</label>
                    <input type='text' id='editSAddress' name='editSAddress' />
                    <br />
                    <label htmlFor='editSStatus'>Status :</label>
                    <input type='text' id='editSStatus' name='editSStatus' />
                    <br />
                    <button className='continue' onClick={(e) => {
                        //dialog.close(value);
                    }} id='editSForm' name='editSForm'>Save Changes</button>
                    <button className='continue'>Delete</button>
                </form>
            </center>
        );
    }
}
export default EditServiceDetails;