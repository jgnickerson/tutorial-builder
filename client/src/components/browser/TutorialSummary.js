import React, { Component } from 'react';
import styled from 'styled-components';
import StarRating from './StarRating.js';
import {Button} from 'react-bootstrap';


const Summary = styled.div`
margin: 20px;
background-color: #F5F5F5;
border-radius: 15px;
width: Title.width;
height: Title.height;
`;

const Title = styled.p`
font-weight:bold;
margin:0px;
padding-left: 15px;
padding-top: 10px;
color: #000080;
`;

const Description = styled.p`
margin:10px;
padding-left: 15px;
`;

const Created = styled.p`
margin: 0px;
padding-left: 20px;
color: #999999;
padding-bottom: 10px;

`;
const Author = styled.p`
font-weight:itallic;
margin:0px;
padding-left: 20px;

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
      <Button style={{"margin-left": "22px", "margin-top": "5px"}}onClick={() => {this.props.onClick(this.props.id)}}>{this.props.buttonText}</Button>
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
