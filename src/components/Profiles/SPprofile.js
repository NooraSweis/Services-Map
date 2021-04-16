import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import ServiceDetailsDialog from './ServiceDetailsDialog';
import { CustomDialog } from 'react-st-modal';
import EditServiceDetails from './EditServiceDetails';
import fire from '../config';

class SPprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled:'disabled',read:true,name:'',email:'',password:'',phone:'',serviceType:'',description:'',
        newName:'',newpassword:'',newConf:'',newPhone:'',newType:'',newDescription:''};
        this.changeName=this.changeName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changepassword=this.changepassword.bind(this);
        this.changeConfirmpassword=this.changeConfirmpassword.bind(this);
        this.edit=this.edit.bind(this);   
        this.save=this.save.bind(this);
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
    edit=()=>{
        this.setState({...this.state,read:false,enabled: ''})
    }
    componentDidMount(){
        const user=fire.auth().currentUser;
        if(user){
             fire.firestore().collection('User').where('email','==',user.email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                
                this.setState({name:doc.data().name,email:doc.data().email,password:doc.data().password,
                phone:doc.data().phone,serviceType:doc.data().serviceType,description:doc.data().description}) 
            })
        })}
       }
       componentWillUnmount(){
        this.setState( { name:'', email:'',password:'',phone:'',serviceType:'',description:''});
       }
       save=(e)=>{
        e.preventDefault();
        const newName=this.state.newName;
        const newpass= this.state.newpassword;
        const newconf=this.state.newConf;
        const newPhone=this.state.newPhone;
        const newType=this.state.newType;
        const newDesc=this.state.newDescription;

        var x;
        if(newName!=='')
       {    if(newName.length<2)
                alert('name field is required and must be 3 or more characters long!')
          else{ fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
        {
            snap.forEach((doc)=>{
                 x=doc.id;
                 fire.firestore().collection('User').doc(x).update({name:newName});
                 this.setState({...this.state,read:true,newName:'',enabled: ''})
                 console.log('name updated')
            })
        })
        .catch((err)=>{
            console.log("err "+err.toString())
        })}}
        /**********************************************/
         if((newpass!==''||newconf!=='')){
            if(newpass===newconf){
                if (!(newpass.match(/[0-9]/g)) || !(newpass.match(/[a-z]/g)) || !(newpass.match(/[A-Z]/g)) || newpass.length < 8) {
                    alert('password must be at least 8 characters , at least one capital and one small letter')
                }
                else{fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
                {
                    snap.forEach((doc)=>{
                        x=doc.id;
                        fire.firestore().collection('User').doc(x).update({password:newpass});
                        var user=fire.auth().currentUser;
                        user.updatePassword(newpass);
                        this.setState({...this.state,read:true,newpassword:'',newConf:'',enabled: ''})
                        console.log('password updated')
                    })
                })
                .catch((err)=>{
                    console.log("err "+err.toString())
                })
            }}
            else{alert("password doesn't match")}
        
       }
        /*************************************************************/
         if(newPhone!==''){
             if(newPhone.length<1){
                 alert('your phone is required')
             }
               else{ fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
                 {
                     snap.forEach((doc)=>{
                         x=doc.id;
                         fire.firestore().collection('User').doc(x).update({phone:newPhone});
                         this.setState({...this.state,read:true,newPhone:'',enabled: ''})
                         console.log('phone updated')
                     })
                 })
                 .catch((err)=>{
                     console.log("err "+err.toString())
                 })
             }}
        /****************************************************************/
         if(newType!==''){
            if(newType.length<1){
                alert('your service type is required')
            }
              else{ fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
                {
                    snap.forEach((doc)=>{
                        x=doc.id;
                        fire.firestore().collection('User').doc(x).update({serviceType:newType});
                        alert('your profile is updated');
                        this.setState({...this.state,read:true,newType:'',enabled: ''})
                        console.log('service type updated')
                    })
                })
                .catch((err)=>{
                    console.log("err "+err.toString())
                }) 
         } }
         /****************************************************************/
         if(newDesc!==''){
            if(newDesc.length<1){
                alert('your description is required')
            }
              else{ fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
                {
                    snap.forEach((doc)=>{
                        x=doc.id;
                        fire.firestore().collection('User').doc(x).update({description:newDesc});
                        alert('your profile is updated');
                        this.setState({...this.state,read:true,newDescription:'',enabled: ''})
                        console.log('description updated')
                    })
                })
                .catch((err)=>{
                    console.log("err "+err.toString())
                }) 
         } }
       }
    render() {
        return (
            <div className='externalDiv' id='scrollDiv'>
                <div className='header'>
                    <img src={logo} alt='logo' className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <a className='edit' onClick={this.edit} style={{ width: '90%' }}>Edit</a>
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='nameSP'>Name :</label>
                        <input type='text' id='nameSP' name='nameSP' defaultValue={this.state.name} onChange={this.changeName} readOnly={this.state.read} />
                        <br />
                        <label htmlFor='emailSP'>Email :</label>
                        <input type='email'  id='emailSP' name='emailSP' defaultValue={this.state.email} onChange={this.changeEmail} readOnly/>
                        <br />
                        <label htmlFor='passwordSP'>Password :</label>
                        <input type='password'  id='passwordSP' name='passwordSP' defaultValue={this.state.password} onChange={this.changepassword} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='confirmSP'>Confirm Password :</label>
                        <input type='password'  id='confirmSP' name='confirmSP' defaultValue={this.state.password} onChange={this.changeConfirmpassword} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='phoneSP'>Phone :</label>
                        <input type='text'  id='phoneSP' name='phoneSP' defaultValue={this.state.phone} onChange={this.changePhone} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='typeSP'>Service type :</label>
                        <input type='text'  id='typeSP' name='typeSP' defaultValue={this.state.serviceType} onChange={this.changeServiceType} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='descSP'>Description :</label>
                        <input type='text'  id='descSP' name='descSP' defaultValue={this.state.description} onChange={this.changeDescription} readOnly={this.state.read}/>
                        <br />
                        <button type='submit' className='Save-Changes' disabled={this.state.enabled} id='formSP' name='formSP' onClick={this.save}>Save Changes</button>
                    </form>
                </div>
                <hr />
                <a href='/Profile' className='Delete' onClick={async () => {
                    await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</a>
                <hr />
                <div className='serviceDiv'>
                    <h3 className='part2'>Services :</h3>
                    <button className='plus' onClick={async () => {
                        await CustomDialog(<ServiceDetailsDialog />, {
                            title: 'Add Service Details',
                            showCloseIcon: true,
                        });
                    }}>&#43;</button>
                    <input type='search' placeholder='Search' className='search' />
                    <div className='showServices'>
                        <div className='sepcService' onClick={async () => {
                            await CustomDialog(<EditServiceDetails />, {
                                title: 'Service Details',
                                showCloseIcon: true,
                            });
                        }}></div>
                        <div className='sepcService'></div>
                        <div className='sepcService'></div>
                        <div className='sepcService'></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SPprofile;