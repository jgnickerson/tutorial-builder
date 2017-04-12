import React from 'react';

import Tutorial from './Tutorial.js';

/**
TutorialList is a component that holds a series of Tutorials for browsing.
**/

function TutorialList(props){
	//the data of all the tutorials, which is sent over in an array, is parsed out into a series of individual tutorials
	let tutorials = props.tutorials.map((tutorial)=>{
		return (<Tutorial 
    		title={tutorial.title}
  			author={tutorial.creator} 
  			created={tutorial.lastUpdate}
    		rating={tutorial.rating}
    		onClick={props.onClick}
    		// setRatingFor={(id, rating)=>this.setRating(id, rating)}
    		/>);
	})
	return (
		<div>
		{tutorials}
		</div>
	);
}

TutorialList.propTypes = {
	tutorials:React.PropTypes.array.isRequired,
	onClick:React.PropTypes.func.isRequired
	// onclick:Reac.PropTypes.func.isRequired
};

export default TutorialList;