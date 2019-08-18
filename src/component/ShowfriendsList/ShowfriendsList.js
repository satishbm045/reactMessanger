import React from 'react';
import {connect} from 'react-redux';
import '../ShowReletedData/ShowReletedData.css';
import './ShowfriendsList.css';
import { Link, withRouter } from 'react-router-dom';
import {updateMyData, loginData, getAllData} from '../../reduce/Action/Action';
import axios from 'axios';

class ShowfriendsList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showFriendsList: true,
			showMessage: false,
			friendData: [],
			messageData: ''
		}
	}
	componentDidMount(){
		if(this.props.myDataValue.name == undefined)
			this.props.history.push('/');
	}
	friendAdd = (value) =>{
		this.props.dispatch(getAllData(this.props.myDataValue));
		this.props.dispatch(updateMyData(this.props.myDataValue));
		this.setState({
			showFriendsList: false,
			showMessage: true,
			friendData: value
		})
	}
	pushTheMessage = (event) =>{
		this.setState({
			messageData: event.target.value
		})
		// console.log(event.target.value);
	}
	showFriendsListValue = () =>{
		this.props.dispatch(getAllData(this.props.myDataValue));
		this.props.dispatch(updateMyData(this.props.myDataValue));
		this.setState({
			showFriendsList: true,
			showMessage: false
		})
	}
	pushValue = () =>{
		if(this.state.messageData != ''){
			let loggedUser = this.props.myDataValue;
			let friendsArray = this.state.friendData;
			let messageValue = this.state.messageData;
			let allData = this.props.data;
			loggedUser.friends.map((e,l) =>{
				if(e.fid == friendsArray.fid){
					e.message.push({value:messageValue,sentId:loggedUser._id})
				}
			})
			let selectedUser = [];
			allData.map((eachUser,index)=>{
				if(friendsArray.fid == eachUser._id){
					selectedUser = eachUser;
				}
			})
			selectedUser.friends.map((e,l) =>{
				if(e.fid == loggedUser._id){
					e.message.push({value:messageValue,sentId:loggedUser._id})
				}
			})
			var self = this;
	        axios({
	            url: 'https://demomessanger-1032.restdb.io/rest/userdata/'+loggedUser["_id"],
				method: 'PUT',
				data: JSON.stringify(loggedUser),
	            headers: {
					'x-apikey' : process.env.REACT_APP_API_KEY,
					'Content-Type' : 'application/json'
	            }
	        }).then(function (response) {
				// console.log(response.data);          
	        }).catch(function(response){
	            console.log(response.data);
	        })
	        axios({
	            url: 'https://demomessanger-1032.restdb.io/rest/userdata/'+selectedUser["_id"],
				method: 'PUT',
				data: JSON.stringify(selectedUser),
	            headers: {
					'x-apikey' : process.env.REACT_APP_API_KEY,
					'Content-Type' : 'application/json'
	            }
	        }).then(function (response) {				
				this.props.dispatch(getAllData(loggedUser));
				this.props.dispatch(updateMyData(loggedUser));
	        }).catch(function(response){
	            console.log(response.data);
	        })
			this.setState({
				messageData: ''
			})
			var elem = document.getElementById('messageData');
			elem.scrollTop = elem.scrollHeight;
		}
	}
	logout = () => {
		let tempArr = []
		this.props.dispatch(loginData(tempArr));
		this.props.history.push('/');
	}
	render(){
		if(this.state.showMessage){

			window.setTimeout(function() {
				var elem = document.getElementById('messageData');
				elem.scrollTop = elem.scrollHeight;
			}, 100);
		}
		return(
			<div className="dataPage">
				{
					this.state.showFriendsList &&
					<div className="btn">
						<Link to='/friends' className="loginBtn">Search for new friends</Link>
					</div>
				}
				<div className="friendsList">
					{	this.props.myDataValue.name != undefined && this.state.showFriendsList && this.props.myDataValue.friends.length > 0 &&
						this.props.myDataValue.friends.map((e,i) =>{
							return <div className="AddList" key={i} onClick={() => this.friendAdd(e)}>{e.name}</div>
						})
					}
				</div>
				<div className="friendsList">
					{	this.props.myDataValue.friends.length == 0 &&
							<div className="errorMsg">You do not have any friends. <br/> Please search for new friends</div>
					}
				</div>
					{
						this.state.showMessage &&
						<div className="btn">
							<div onClick={this.showFriendsListValue} className="loginBtn">Go to Friends List</div>
						</div>
					}
					{ this.state.showMessage && 
						<div>
							<div className="messageBox" id="messageData">
								{
									this.state.showMessage &&
									this.state.friendData.message.map((e,i) =>{
										return <div key={i} className="msg">{ e.sentId == this.props.myDataValue._id && <div className="right-msg">{e.value}</div>}
												{ e.sentId != this.props.myDataValue._id && <div className="left-msg">{e.value}</div>}</div>
									})
								}							
							</div>
							<div className="messageInput">
								{
									this.state.showMessage &&
									<div className="enterData">
										<input type="text" onChange={this.pushTheMessage} value={this.state.messageData}/>
										<button onClick={this.pushValue}>Send</button>
									</div>
								}
							</div>
						</div>

					}
					{
						<div className="btn logOutBtn">
							<div className="loginBtn" onClick={this.logout}>LogOut</div>
						</div>
					}
			</div>
			)
	}
}


export default connect()(withRouter(ShowfriendsList));