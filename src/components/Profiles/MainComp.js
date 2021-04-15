import React, { Component } from 'react';
import logo from '../image/Profile.jpg';
import '../style/MainCompProfile.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { CustomDialog } from 'react-st-modal';
import fire from '../config';

class MainComp extends Component {
    constructor(props) {
        super(props);
        this.state = { read:true,name:'',email:'',password:'',newName:'',newpassword:'',newConf:''};
        this.changeName=this.changeName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changepassword=this.changepassword.bind(this);
        this.changeConfirmpassword=this.changeConfirmpassword.bind(this);
        this.edit=this.edit.bind(this);   
        this.save=this.save.bind(this);     
    }
    changeName=(e)=>{
        this.setState({...this.state,newName:e.target.value})
    }
    changeEmail=(e)=>{
        this.setState({...this.state,email:e.target.value})
    }
    changepassword=(e)=>{
        this.setState({...this.state,newpassword:e.target.value})
    }
    changeConfirmpassword=(e)=>{
        this.setState({...this.state,newConf:e.target.value})
    }
   componentDidMount(){
    const user=fire.auth().currentUser;
    if(user){
         fire.firestore().collection('User').where('email','==',user.email).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
            
            this.setState({name:doc.data().name,email:doc.data().email,password:doc.data().password}) 
        })
    })}
   }
   componentWillUnmount(){
    this.setState( { name:'', email:'',password:''});
   }
   edit=()=>{
       this.setState({...this.state,read:false})
   }
   save=(e)=>{
    e.preventDefault();
    const newName=this.state.newName;
    const newpass= this.state.newpassword;
    const newconf=this.state.newConf;
    var x;
    if(newName!=''&&newpass==''&&newconf=='')
   {const docs=fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
    {
        snap.forEach((doc)=>{
             x=doc.id;
             fire.firestore().collection('User').doc(x).update({name:newName});
        })
    })
    .catch((err)=>{
        console.log("err "+err.toString())
    })}
    else if(newName!=''&&(newpass!=''||newconf!='')){
        if(newpass==newconf){
            const docs=fire.firestore().collection("User").where('email','==',this.state.email).get().then((snap)=>
            {
                snap.forEach((doc)=>{
                    x=doc.id;
                    fire.firestore().collection('User').doc(x).update({name:newName,password:newpass});
                    var user=fire.auth().currentUser;
                    user.updatePassword(newpass);
                    console.log('done')
                })
            })
            .catch((err)=>{
                console.log("err "+err.toString())
            })}
        }
    
    this.setState({...this.state,read:true})
    console.log('success edit');
   }
    render() {
       
        return (
            <div className='externalDiv'>
                <div className='header'>
                    <img src={logo} className='Default-img' />
                    <h3>Personal information</h3>
                </div>
                <a className='edit'  style={{ width: '90%' }} onClick={this.edit}>Edit</a>
                <br />
                <div className='fieldsChange'>
                    <form>
                        <label htmlFor='namePerson'>Name :</label>
                        <input type='text'  id='namePerson' name='namePerson' defaultValue={this.state.name} onChange={this.changeName} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='emailPerson'>Email :</label>
                        <input type='email'  id='emailPerson' name='emailPerson' defaultValue={this.state.email} onChange={this.changeEmail} readOnly/>
                        <br />
                        <label htmlFor='passwordPerson'>Password :</label>
                        <input type='password'  id='passwordPerson' name='passwordPerson' defaultValue={this.state.password} onChange={this.changepassword} readOnly={this.state.read}/>
                        <br />
                        <label htmlFor='confirmPerson'>Confirm Password :</label>
                        <input type='password'  id='confirmPerson' name='confirmPerson' defaultValue={this.state.password} onChange={this.changeConfirmpassword} readOnly={this.state.read}/>
                        <br />
                        <button type='submit' className='Save-Changes'  id='formPerson' name='formPerson' readOnly={this.state.read} onClick={this.save}>Save Changes</button>
                    </form>
                </div>
                <hr />
                <a className='Delete' onClick={async () => {
                    const result = await CustomDialog(<DeleteConfirmationDialog />, {
                        title: 'Delete Account',
                        showCloseIcon: true,
                    });
                }}>Delete Account</a>
            </div>
        );
    }
}
export default MainComp;
