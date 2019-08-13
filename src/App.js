import React from 'react';
import './App.css';
import EachDataShow from './component/LoginPage/LoginPage';
import ShowReletedData from './component/ShowReletedData/ShowReletedData';
import ShowfriendsList from './component/ShowfriendsList/ShowfriendsList';
import SignUp from './component/SignUp/SignUp';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// import {GetUserData, UpdateLikeArray, UpdateDislikeArray} from './reduce/Action/Action'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: {},
      userData: []
    }
  }
  render(){
    return (
      <BrowserRouter>
        <div className="mainApp">
          <Route path="/" exact render = {() => {return <EachDataShow myDataValue={this.props.myData}/>}} />
          <Route path="/signup" exact render = {() => {return <SignUp />}} />
          <Route path="/friends" exact render = {() => {return <ShowReletedData  data={this.props.allData} myDataValue={this.props.myData}/>}} />
          <Route path="/data" exact render = {() => {return <ShowfriendsList data={this.props.allData}  myDataValue={this.props.myData}/>}} />
        </div>
      </BrowserRouter>
    )
  }
}
const mapStoreToProps = (store) => {
  console.log(store.userDataReducer);
  console.log(store.ourDataReducer);
  return {
    allData : store.userDataReducer,
    myData: store.ourDataReducer
  }
}
export default connect(mapStoreToProps)(App);
