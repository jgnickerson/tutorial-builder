import React from 'react';
import styled from 'styled-components';


const FilledStar=styled.span`
  color:blue;
`;

const EmptyStar=styled.span`
  color:rgb(200,200,200);
`;

function StarRating(props){
  let stars = [];
  const rating=props.rating | 0;
  for (let i = 1; i <= rating; i++){
    stars.push(<FilledStar key={i} onClick={()=>{props.setRating(i)}}>★</FilledStar>);
  }

  for (let i = rating+1; i <= 5; i++){
    stars.push(<EmptyStar key={i} onClick={()=>{props.setRating(i)}}>★</EmptyStar>);
  }

  return(<span>{stars}</span>);
}



StarRating.propTypes = {
  rating:React.PropTypes.number,
  setRating:React.PropTypes.func.isRequired
};


export default StarRating;
