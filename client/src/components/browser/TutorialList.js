/**
TutorialList is a component that holds a series of Tutorials for browsing.
**/

import React from 'react';
import TutorialSummary from './TutorialSummary.js';
import { Col, Grid, Row } from 'react-bootstrap';

function TutorialList(props){
	//the data of all the tutorials, which is sent over in an array, is parsed out into a series of individual tutorials

	const rows = [];

	for (let i = 0; i < props.tutorials.length; i += 2) {
		const items = [];

		items.push(
			<Col md={6} key={i}>
				<TutorialSummary
				key={props.tutorials[i]._id}
				id={props.tutorials[i]._id}
				title={props.tutorials[i].title}
				author={props.tutorials[i].creator}
					description={props.tutorials[i].description}
				lastUpdate={props.tutorials[i].lastUpdate}
				rating={props.tutorials[i].rating}
				onClick={props.onSelect}
				// setRatingFor={(id, rating)=>this.setRating(id, rating)}
				/>
			</Col>
		)
		if (props.tutorials[i+1]) {
			items.push(
				<Col md={6} key={i+1}>
					<TutorialSummary
					key={props.tutorials[i+1]._id}
					id={props.tutorials[i+1]._id}
					title={props.tutorials[i+1].title}
					author={props.tutorials[i+1].creator}
						description={props.tutorials[i+1].description}
					lastUpdate={props.tutorials[i+1].lastUpdate}
					rating={props.tutorials[i+1].rating}
					onClick={props.onSelect}
					// setRatingFor={(id, rating)=>this.setRating(id, rating)}
					/>
				</Col>
			)
		}

		rows.push(<Row key={"row" + i}>{items}</Row>);
	}

	return (
		<div>
			<br /><br /><br />
			<Grid>
				{rows}
			</Grid>
		</div>
	);
}

TutorialList.propTypes = {
	tutorials:React.PropTypes.array.isRequired,
	onSelect:React.PropTypes.func.isRequired
};

export default TutorialList;
