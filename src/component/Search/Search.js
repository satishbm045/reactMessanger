import React from 'react';


class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listOfValue : ['satish','sangmesh','ravi','pavan']
		}
	}
	handleInputChange = (event) =>{
		console.log(event.target.value);
	}
	render(){
		let query = this.state.listOfValue;
		return(
			<div>
				
				<input type='text' value={query} onChange={this.handleInputChange} />	
			</div>
		)
	}
}

export default Search;