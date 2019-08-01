import React from 'react';
import './App.css';
import EachDataShow from './component/LoginPage/LoginPage';
import ShowReletedData from './component/ShowReletedData/ShowReletedData';
import ShowfriendsList from './component/ShowfriendsList/ShowfriendsList';
import SignUp from './component/SignUp/SignUp';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
// import firebase from 'firebase';
// import {GetUserData, UpdateLikeArray, UpdateDislikeArray} from './reduce/Action/Action'



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: {}
    }
  }
  componentDidMount(){
    // base.fetch('name', {
    //   context: this,
    //   asArray: true,
    //   then(data){
    //     console.log(data);
    //   }
    // });
    if(localStorage.getItem("loginDetail") === null){
      localStorage.loginDetail = JSON.stringify(
        [{id:0,name:'satish',user:'satish123',password:'check',friends:[{fid:1,name:'neelam',message:[{value:'hi',sentId:0},{value:'hello',sentId:1},{value:'how are you',sentId:0}]},{fid:3,name:'praveen',message:[{value:'msg1',sentId:0},{value:'msg2',sentId:3},{value:'msg3',sentId:0},{value:'msg4',sentId:3}]},{fid:2,name:'darshan',message:[{value:'check1',sentId:0},{value:'check2',sentId:2},{value:'check3',sentId:0}]}]}
        ,{id:1,name:'neelam',user:'neelam123',password:'check',friends:[{fid:0,name:'satish',message:[{value:'hi',sentId:0},{value:'hello',sentId:1},{value:'how are you',sentId:0}]}]}
        ,{id:2,name:'darshan',user:'darshan123',password:'check',friends:[{fid:0,name:'satish',message:[{value:'check1',sentId:0},{value:'check2',sentId:2},{value:'check3',sentId:0}]}]}
        ,{id:3,name:'praveen',user:'praveen123',password:'checkpraveen',friends:[{fid:0,name:'satish',message:[{value:'msg1',sentId:0},{value:'msg2',sentId:3},{value:'msg3',sentId:0},{value:'msg4',sentId:3}]}]}
        ,{id:4,name:"dummy1",user:"dummy123",password:"dummycheck",friends:[]}]
        )
    }
  }
  render(){
    console.log(this.state.name)
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
  // console.log(store.userDataReducer);
  return {
    allData : store.userDataReducer,
    myData: store.ourDataReducer
  }
}
export default connect(mapStoreToProps)(App);
