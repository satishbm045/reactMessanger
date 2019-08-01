import React from 'react';
import {connect} from 'react-redux';
import '../ShowReletedData/ShowReletedData.css';
import './ShowfriendsList.css';
import { Router , Link, withRouter } from 'react-router-dom';
import {UpdateAllData, loginData} from '../../reduce/Action/Action';

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
		console.log(value);
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
		this.setState({
			showFriendsList: true,
			showMessage: false
		})
	}
	pushValue = () =>{
		if(this.state.messageData != ''){
			let tempArray = this.props.myDataValue;
			let friendsArray = this.state.friendData;
			let messageValue = this.state.messageData;
			let wholeData = JSON.parse(localStorage.loginDetail);
			let tempUpdatedData = []
			tempArray.friends.map((e,l) =>{
				if(e.name == friendsArray.name){
					e.message.push({value:messageValue,sentId:tempArray.id})
					tempUpdatedData = e;
				}
			})
			wholeData.forEach(function(eachFrd,index){
				if(eachFrd.id == friendsArray.fid){
					eachFrd.friends.forEach(function(e,i){
						if(e.fid == tempArray.id){
							e.message.push({value:messageValue,sentId:tempArray.id});
						}
					})
				}
			})
			this.setState({
				messageData: ''
			})
			wholeData.map((ele,index)=>{
				if(ele.id == tempArray.id){
					wholeData[index] = tempArray;
				}
			})
			var userDataValue = []
			wholeData.forEach(function(ele) {
				if(ele.id == tempArray.id){

				}else{
					userDataValue.push(ele);
				}
			})
			localStorage.loginDetail = JSON.stringify(wholeData);
			this.props.dispatch(UpdateAllData(userDataValue));
			this.props.dispatch(loginData(tempArray));
		// var elem = document.getElementById('messageData');
		// elem.scrollTop = elem.scrollHeight;
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
					{	this.props.myDataValue.name != undefined && this.state.showFriendsList &&
						this.props.myDataValue.friends.map((e,i) =>{
							return <div className="AddList" key={i} onClick={() => this.friendAdd(e)}>{e.name}</div>
						})
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
										return <div key={i} className="msg">{ e.sentId == this.props.myDataValue.id && <div className="right-msg">{e.value}</div>}
												{ e.sentId != this.props.myDataValue.id && <div className="left-msg">{e.value}</div>}</div>
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