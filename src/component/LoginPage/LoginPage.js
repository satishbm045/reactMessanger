import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {UpdateAllData, loginData} from '../../reduce/Action/Action'
import mainLogo from '../../img/app-logo.jpg';
import './LoginPage.css'

import '../ShowReletedData/ShowReletedData.css'

class EachDataShow extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: '',
			passWord: ''
		}
	}
	componentDidMount(){
		if(this.props.myDataValue.name != undefined)
			this.props.history.push('/data');
	}
	updateUserName =(event) =>{
		this.setState({
			userName: event.target.value
		})
	}
	passWordUpdate = (event) =>{
		this.setState({
			passWord: event.target.value
		})
	}
	submitBtn = () =>{
		var flagshow = 0;
		var dumyUsername = this.state.userName;
		var dumyPassword = this.state.passWord;
		let userData = JSON.parse(localStorage.loginDetail);
		let ourData = [];
		console.log(userData);
		userData.forEach(function(e){
			if(e.user.toLowerCase() == dumyUsername.toLowerCase() && e.password.toLowerCase() == dumyPassword.toLowerCase()){
				// alert('hey u did');
				ourData = e;			
				flagshow = 1;
			}
		})
		if(flagshow == 0){
			alert("Please Enter Valid UserName/Password");
		}else{
			this.fnToUpdateDispatch(userData,ourData)
		}
	}
	fnToUpdateDispatch = (para1, para2) =>{
		var userDataValue = []
		para1.forEach(function(ele) {
			if(ele.name == para2.name){

			}else{
				userDataValue.push(ele);
			}
		})
		this.props.dispatch(UpdateAllData(userDataValue));
		this.props.dispatch(loginData(para2));
		this.state.userName = '';
		this.state.passWord = '';
		this.props.history.push('/data');
	}
	render(){
	    return (
	    	<div className="LoginPage">
				<div className="loginContent">
					<div style={{width:'200px',margin:'0 auto'}}>
						<img style={{width:'100%', height:'100%'}} src={mainLogo} alt="header logo"/>
					</div>
					<input type="text" className="userName" placeholder="User Name" type="text" onChange={this.updateUserName} value={this.state.userName} />
					<input type="password" className="passWord" placeholder="Password" type="password" onChange={this.passWordUpdate} value={this.state.passWord} />
					<div className="btn">
						<div className="loginBtn" onClick={this.submitBtn}>Login</div>
						<Link to='/signup' className="loginBtn">Sign Up</Link>
					</div>
				</div>
	    	</div>
	    )
	}
}


export default connect()(withRouter(EachDataShow));