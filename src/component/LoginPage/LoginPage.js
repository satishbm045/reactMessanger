import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getAllData, loginData} from '../../reduce/Action/Action'
import mainLogo from '../../img/app-logo.jpg';
import loadingLogo from '../../img/loading.svg';
import {GetData} from '../../reduce/Action/Action';
import axios from 'axios';
import './LoginPage.css'
import '../ShowReletedData/ShowReletedData.css'

class EachDataShow extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: '',
			passWord: '',
			loading: false
		}
	}
	componentDidMount(){        
    	// this.props.dispatch(GetData());
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
		self.setState({
			loading: true
		})
		axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata?q={"userName":"'+this.state.userName.toLowerCase()+'","passWord":"'+this.state.passWord.toLowerCase()+'"}',
            method: 'GET',
            headers: {
                'x-apikey' : process.env.REACT_APP_API_KEY,
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
			if(response.data.length > 0){
				self.fnToUpdateDispatch(response.data[0]);
			}else{
				self.setState({
					loading: false
				})
				alert("Please Enter Valid UserName/Password");
			}
            console.log(response);
        })
        .catch((err) => {
			self.setState({
				loading: false
			})
			console.log(err);
			alert("Something went wrong");
        })
		// let ourData = [];
		// self.props.allData.forEach(function(e){
		// 	if(e.userName.toLowerCase() == dumyUsername.toLowerCase() && e.passWord.toLowerCase() == dumyPassword.toLowerCase()){
		// 		ourData = e;			
		// 		flagshow = 1;
		// 	}
		// })
		// if(flagshow == 0){
		// 	alert("Please Enter Valid UserName/Password");
		// }else{
		// 	self.fnToUpdateDispatch(ourData);
		// }
	}
	fnToUpdateDispatch = (loggedData) =>{
		this.setState({
			loading: false
		})
		this.props.dispatch(getAllData(loggedData));
		this.props.dispatch(loginData(loggedData));
		this.state.userName = '';
		this.state.passWord = '';
		this.props.history.push('/data');
	}
	render(){
	    return (
	    	<div className="LoginPage">
				{ this.state.loading &&
				<div style={{position:'absolute'}}><img style={{width:'100%', height:'100%'}} src={loadingLogo} alt="header logo"/></div> }
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