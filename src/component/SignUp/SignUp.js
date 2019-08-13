import React from 'react';
import '../LoginPage/LoginPage.css';
import {Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import mainLogo from '../../img/app-logo.jpg';

class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			userName: '',
			password: ''
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
		if(this.state.name == '' || this.state.userName == '' || this.state.password == '' ){
			alert("Please Enter all fields");
			return;
		}
		let userData = [{"id":Math.floor(Math.random() * 20000),"name":this.state.name,"userName":this.state.userName,"passWord":this.state.password,friends:[]}];
		var self = this;
        axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata',
			method: 'POST',
			data: JSON.stringify(userData),
            headers: {
				'x-apikey' : process.env.REACT_APP_API_KEY,
				'Content-Type' : 'application/json'
            }
        }).then(function (response) {
			console.log(response.data);
			self.props.history.push('/');            
        }).catch(function(response){
			alert("Something went wrong");
            console.log(response.data);
        })
	}
	render(){
		return(

			<div className="LoginPage">
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