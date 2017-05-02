/**
TutorialList is a component that holds a series of Tutorials for browsing.
**/

import React from 'react';
import TutorialSummary from './TutorialSummary.js';

function TutorialList(props){
	//the data of all the tutorials, which is sent over in an array, is parsed out into a series of individual tutorials
	//let tutorials = props.tutorials.filter((tutorial) => {tutorial.published});
	const tutorials = props.tutorials.map((tutorial, index)=>{
		return (
			<TutorialSummary
			key={tutorial._id}
			id={tutorial._id}
    		title={tutorial.title}
  			author={tutorial.creator}
				description={tutorial.description}
  			lastUpdate={tutorial.lastUpdate}
    		rating={tutorial.rating}
    		onClick={props.onSelect}
    		// setRatingFor={(id, rating)=>this.setRating(id, rating)}
  		/>
		)
	})

	return (
		<div> {tutorials} </div>
	);
}

TutorialList.propTypes = {
	tutorials:React.PropTypes.array.isRequired,
	onSelect:React.PropTypes.func.isRequired
};

export default TutorialList;
