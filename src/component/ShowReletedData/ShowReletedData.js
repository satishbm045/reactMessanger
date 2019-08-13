import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import './ShowReletedData.css'
import {loginData, updateMyData} from '../../reduce/Action/Action'
import axios from 'axios';

class ShowReletedData extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addFriendsList:[]
		}
	}
	componentDidMount(){
		if(this.props.myDataValue.name == undefined){
			this.props.history.push('/');
		}
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
		myData.friends.push({fid:userData._id,name:userData.name,message:[]});
		userData.friends.push({fid:myData._id,name:myData.name,message:[]});
		var self = this;
		axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata/'+userData["_id"],
			method: 'PUT',
			data: JSON.stringify(userData),
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
            url: 'https://demomessanger-1032.restdb.io/rest/userdata/'+myData["_id"],
			method: 'PUT',
			data: JSON.stringify(myData),
            headers: {
				'x-apikey' : process.env.REACT_APP_API_KEY,
				'Content-Type' : 'application/json'
            }
        }).then(function (response) {
			// console.log(response.data);
			self.props.dispatch(updateMyData(myData));
			self.props.history.push('/data');            
        }).catch(function(response){
            console.log(response.data);
        })	
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