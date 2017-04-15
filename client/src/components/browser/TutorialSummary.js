import React, { Component } from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.js';


const Summary = styled.div`
margin: 20px;
`;

const Title = styled.p`
font-weight:bold;
margin:0px;
`;

const Description = styled.p`
margin:10px;
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

class TutorialSummary extends Component{
  constructor(props){
    super(props);
    this.state ={
      showDescription:false
    }
  }
  render(){
    const tutorialSummary = this.state.showDescription === true ? (
      <Summary onClick={() => {this.setState({showDescription:false})}}>
      <Title>{this.props.title}</Title>
      <button type="button" onClick={() => {this.props.onClick(this.props.id)}}>Open Tutorial</button>
      <Description>{this.props.description}</Description>
      <Author>{this.props.author}</Author>
      <StarRating rating={this.props.rating} setRating={(rating)=>{this.props.setRatingFor(this.props.id, rating)}}/>
      <Created>({this.props.lastUpdate})</Created>
      </Summary>
    ):
    (<Summary onClick={() => {this.setState({showDescription:true})}}>
    <Title>{this.props.title}</Title>
    <Author>{this.props.author}</Author>
    <StarRating rating={this.props.rating} setRating={(rating)=>{this.props.setRatingFor(this.props.id, rating)}}/>
    <Created>({this.props.lastUpdate})</Created>
    </Summary>)
    return tutorialSummary;
  }
}

TutorialSummary.propTypes = {
  id:React.PropTypes.string.isRequired,
  title:React.PropTypes.string.isRequired,
  description:React.PropTypes.string,
  author:React.PropTypes.string.isRequired,
  lastUpdate:React.PropTypes.string.isRequired,
  rating:React.PropTypes.number.isRequired,
  onClick:React.PropTypes.func.isRequired,
};

export default TutorialSummary;
