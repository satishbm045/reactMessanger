import React from 'react';
import '../LoginPage/LoginPage.css';
import { Router , Link, withRouter } from 'react-router-dom';
import {UpdateAllData, loginData} from '../../reduce/Action/Action';
import mainLogo from '../../img/app-logo.jpg';
import firebase from 'firebase';

class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			userName: '',
			password: ''
		}
	}
	componentDidMount(){
		

		// const rootRef = firebase.database().ref().child('messanger');
		// const speedRef = rootRef.child('name');
		// speedRef.on('value', snap =>{
		// 	this.setState({
		// 		name: snap.val()
		// 	})
		// })
	}
	nameUpdate = (event) => {
		this.setState({
			name: event.target.value
		})
	}
	userNameUpdate = (event) => {
		this.setState({
			userName: event.target.value
		})
	}
	passwordUpdate = (event) => {
		this.setState({
			password: event.target.value
		})		
	}
	submitBtn =() =>{
		if(this.state.name == '' || this.state.userName == '' || this.state.password == '' ){
			alert("Please Enter all fields");
			return;
		}
		let AllData = JSON.parse(localStorage.loginDetail);
		AllData.push({id:Math.floor(Math.random() * 20000),name:this.state.name,user:this.state.userName,password:this.state.password,friends:[]});
	
		localStorage.loginDetail = JSON.stringify(AllData);
		this.props.history.push('/');

	}
	render(){
		return(

			<div className="LoginPage">
				<div className="loginContent">
					<div style={{width:'200px',margin:'0 auto'}}>
						<img style={{width:'100%', height:'100%'}} src={mainLogo} alt="header logo"/>
					</div>
					<input className="userName" placeholder="Name" type="text" name="name" onChange={this.nameUpdate} value={this.state.name}/>
					<input className="userName" placeholder="User Name" type="text" name="name" onChange={this.userNameUpdate} value={this.state.userName} />
					<input className="userName" placeholder="Password" type="text" name="name" onChange={this.passwordUpdate} value={this.state.password} />
					<div className="btn">
						<Link to='/' className="loginBtn">Back</Link>
						<div className="loginBtn" onClick={this.submitBtn}>Submit</div>
					</div>
				</div>
			</div>

			)
	}
}

export default withRouter(SignUp);