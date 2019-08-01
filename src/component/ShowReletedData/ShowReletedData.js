import React from 'react';
import {connect} from 'react-redux';
import { Router , Link, withRouter } from 'react-router-dom'
import './ShowReletedData.css'
import {UpdateAllData, loginData} from '../../reduce/Action/Action'

class ShowReletedData extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addFriendsList:[]
		}
	}
	componentDidMount(){
		if(this.props.myDataValue.name == undefined)
			this.props.history.push('/');
		let myData = this.props.myDataValue
		let wholeData = this.props.data
		let addFriendArray = []
		wholeData.forEach(function(e,i) {
			var i = 0;
			var lengthValue = myData.friends.length;
			myData.friends.forEach(function(ele,index){
				if(e.name != ele.name){
					i++;
				}
			})
			if(i == lengthValue){
				addFriendArray.push(e);
			}
		})
		this.fnToUpdate(addFriendArray);
	}
	fnToUpdate = (addFriendArray) =>{
		this.setState({
			addFriendsList : addFriendArray
		})		
		
	}
 	addFriendList = (userData) =>{
		let myData = this.props.myDataValue;
		let wholeData = JSON.parse(localStorage.loginDetail);
		let AddfriendListData = this.props.data;
		myData.friends.push({fid:userData.id,name:userData.name,message:[]});
		wholeData.forEach(function(value,index){
			if(value.id == userData.id){
				value.friends.push({fid:myData.id,name:myData.name,message:[]});
			}
		})
		AddfriendListData.forEach(function(user,index){
			if(user.id == userData.id){
				user.friends.push({fid:myData.id,name:myData.name,message:[]});
			}
		})
		localStorage.loginDetail = JSON.stringify(wholeData);
		this.props.dispatch(UpdateAllData(AddfriendListData));
		this.props.dispatch(loginData(myData));
		this.props.history.push('/data');
	}
	logout = () => {
		let tempArr = []
		this.props.dispatch(loginData(tempArr));
		this.props.history.push('/');
	}
	render(){
		return(
				<div className="addFriendPage">
					<div>
						New Friends
					</div>
					{	
						this.state.addFriendsList.length > 0 &&
						this.state.addFriendsList.map((ele,index) => {
							return <div className="AddList" key={index}>{ele.name}<div className="AddFriend" onClick={()=>this.addFriendList(ele)}>+</div></div>
						})
					}
					{
						this.state.addFriendsList.length == 0 &&
						<div className="AddList">No Users Found</div>
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

export default connect()(withRouter(ShowReletedData));