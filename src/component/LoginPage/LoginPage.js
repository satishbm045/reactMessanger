import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getAllData, loginData} from '../../reduce/Action/Action'
import mainLogo from '../../img/app-logo.jpg';
import {GetData} from '../../reduce/Action/Action';
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
    	this.props.dispatch(GetData());
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
		var self = this;
		var flagshow = 0;
		var dumyUsername = this.state.userName;
		var dumyPassword = this.state.passWord;
		let ourData = [];
		self.props.allData.forEach(function(e){
			if(e.userName.toLowerCase() == dumyUsername.toLowerCase() && e.passWord.toLowerCase() == dumyPassword.toLowerCase()){
				ourData = e;			
				flagshow = 1;
			}
		})
		if(flagshow == 0){
			alert("Please Enter Valid UserName/Password");
		}else{
			self.fnToUpdateDispatch(ourData)
		}
	}
	fnToUpdateDispatch = (loggedData) =>{
		this.props.dispatch(getAllData(loggedData));
		this.props.dispatch(loginData(loggedData));
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

const mapStoreToProps = (store) => {
	console.log(store.allUserDataReducer.data);
	return {
	  	allData : store.allUserDataReducer.data
	}
}
export default connect(mapStoreToProps)(withRouter(EachDataShow));