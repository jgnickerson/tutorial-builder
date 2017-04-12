import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.js';


const Summary = styled.div`
margin: 20px;
`;

const Title = styled.p`
  font-weight:bold;
  margin:0px;
`;

const Created = styled.p`
margin: 0px;
padding-left: 1em;
color: #999999;
`;
const Author = styled.p`
font-weight:itallic;
margin:0px;
`

/**
TutorialSummary creates the basic structure of an individual tutorial
**/

function TutorialSummary(props){
  return (
    <Summary onClick={() => {props.onClick(props.id)}}>
      <Title>{props.title}</Title>
      <Author>{props.author}</Author>
      <StarRating rating={props.rating} setRating={(rating)=>{props.setRatingFor(props.id, rating)}}/>
      <Created>({props.lastUpdate})</Created>
    </Summary>
  );
}

TutorialSummary.propTypes = {
  id:React.PropTypes.string.isRequired,
  title:React.PropTypes.string.isRequired,
  author:React.PropTypes.string.isRequired,
  lastUpdate:React.PropTypes.string.isRequired,
  rating:React.PropTypes.number.isRequired,
  onClick:React.PropTypes.func.isRequired,
};

export default TutorialSummary;
