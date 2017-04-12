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
Tutorial creates the basic structure of an individual tutorial
**/

function Tutorial(props){
  return (
    <Summary>
    <Title onClick={(event)=>props.onClick(props.id)}>{props.title}</Title>
    <Author>{props.author}</Author>
    <StarRating rating={props.rating} setRating={(rating)=>{props.setRatingFor(props.id, rating)}}/>
    <Created>({props.created})</Created>
    </Summary>
  );
}

Tutorial.propTypes = {
  title:React.PropTypes.string.isRequired,
  author:React.PropTypes.string.isRequired,
  created:React.PropTypes.string.isRequired,
  rating:React.PropTypes.number,
  onClick:React.PropTypes.func.isRequired,
};

export default Tutorial;
