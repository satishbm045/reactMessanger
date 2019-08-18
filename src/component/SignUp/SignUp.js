import React from 'react';
import '../LoginPage/LoginPage.css';
import {Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import mainLogo from '../../img/app-logo.jpg';
import loadingLogo from '../../img/loading.svg';

class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			userName: '',
			password: '',
			loading: false
		}
	}
	onChangeInput = e => {
		const {
            target: { value, name },
        } = e;
        this.setState({
            [name]: value
        });
	}
	submitBtn =() =>{
		var self = this;
		if(this.state.name == '' || this.state.userName == '' || this.state.password == '' ){
			alert("Please Enter all fields");
			return;
		}
		self.setState({
			loading: true
		})
		let userData = [{"id":Math.floor(Math.random() * 20000),"name":this.state.name,"userName":this.state.userName.toLowerCase(),"passWord":this.state.password.toLowerCase(),friends:[]}];
        axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata',
			method: 'POST',
			data: JSON.stringify(userData),
            headers: {
				'x-apikey' : process.env.REACT_APP_API_KEY,
				'Content-Type' : 'application/json'
            }
        }).then(function (response) {
			self.setState({
				loading: false
			})
			// console.log(response.data);
			self.props.history.push('/');
        }).catch(function(response){
			self.setState({
				loading: false
			})
			alert("Something went wrong");
            console.log(response.data);
        })
	}
	render(){
		return(

			<div className="LoginPage">
				{ this.state.loading &&
				<div style={{position:'absolute'}}><img style={{width:'100%', height:'100%'}} src={loadingLogo} alt="header logo"/></div> }
				<div className="loginContent">
					<div style={{width:'200px',margin:'0 auto'}}>
						<img style={{width:'100%', height:'100%'}} src={mainLogo} alt="header logo"/>
					</div>
					<input className="userName" placeholder="Name" type="text" name="name" onChange={this.onChangeInput} value={this.state.name}/>
					<input className="userName" placeholder="User Name" type="text" name="userName" onChange={this.onChangeInput} value={this.state.userName} />
					<input className="userName" placeholder="Password" type="text" name="password" onChange={this.onChangeInput} value={this.state.password} />
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