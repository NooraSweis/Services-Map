import React from 'react';
import img from '../image/servicesDefault.png';
import '../style/MainCompProfile.css';
import fire from '../config';
import { Component } from 'react';
class ServiceDetailsDialog extends Component {
    constructor(props){
        super(props);
        this.state={file:'',name:'',description:'',address:'',status:'',
        phone:'',src:img,FileName:'servicesDefault.png',image:false}
        this.changeHandler=this.changeHandler.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeDesc=this.changeDesc.bind(this);
        this.changeAddress=this.changeAddress.bind(this);
        this.changeStatus=this.changeStatus.bind(this);
        this.addServices=this.addServices.bind(this);
    }   
    changeHandler = (event) => {
        this.setState({...this.state, src: URL.createObjectURL(event.target.files[0]),image:true,FileName:event.target.files[0].name
            ,file:event.target.files[0]});
    };
    changeName=(e)=>{
        this.setState({...this.state,name:e.target.value});
    };
    changeDesc=(e)=>{
        this.setState({...this.state,description:e.target.value});
    };
    changeAddress=(e)=>{
        this.setState({...this.state,address:e.target.value});
    };
    changeStatus=(e)=>{
        this.setState({...this.state,status:e.target.value});
    };
    addServices=(e)=>{
        e.preventDefault();
        if(this.state.name!==''&&this.state.description!==''&&this.state.address!==''&&this.state.status!==''){
            const user = fire.auth().currentUser;
            const email = user.email;
            if(this.state.image){
                const storageRef=fire.storage().ref().child(this.state.FileName);
                storageRef.put(this.state.file).then((e)=>{
                //this.setState({...this.state,url: storageRef.getDownloadURL()})
                fire.firestore().collection("services")
                        .add({serviceImg:this.state.FileName,email:email,name:this.state.name,phone:this.state.phone,
                            description:this.state.description,address:this.state.address,status:this.state.status})
                            .catch((err)=>{console.log(err)});
                            //console.log(this.state.url)
                })
            }
            else{
                fire.firestore().collection("services").add({serviceImg:this.state.FileName,email:email,name:this.state.name,
                    description:this.state.description,address:this.state.address,status:this.state.status})
            }
        }
        else{alert('all fields are required !');}
    }
    componentDidMount() {
        const user = fire.auth().currentUser;
        const email = user.email;
        //console.log(email)
        fire.firestore().collection("User").where("email", "==", email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => { 
                    this.setState({...this.state,phone:doc.data().phone});
                });

            })
            .catch((error) => {
                console.log("Error getting phone: ", error);
            });
         
    }
    componentWillUnmount(){
        this.state={name:'',description:'',address:'',status:'',url:'',phone:'',src:img}
       }
render(){
    return (
        <center className='fieldsChange'>
            <img src={this.state.src} id='ServicePic' alt='service' style={{ width: '95%', height: '250px' }} />
            <form>
                <label htmlFor="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*" onChange={this.changeHandler}/>
                <label htmlFor='addSname'>Service Name :</label>
                <input type='text' id='addSname' name='addSname' onChange={this.changeName}/>
                <br />
                <label htmlFor='addSDesc'>Description :</label>
                <input type='text' id='addSDesc' name='addSDesc' onChange={this.changeDesc}/>
                <br />
                <label htmlFor='addSAddress'>Address :</label>
                <input type='text' id='addSAddress' name='addSAddress' onChange={this.changeAddress}/>
                <br />
                <label htmlFor='addSStatus'>Status :</label>
                <input type='text' id='addSStatus' name='addSStatus' onChange={this.changeStatus}/>
                <br />
                <button className='continue' id='addSForm' name='addSForm' onClick={this.addServices}>Add Service</button>
            </form>
        </center>
    );
            }
}
export default ServiceDetailsDialog;