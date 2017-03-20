/*
  Editor.js

  This provides the implementation for the Editor coponent.

  The Editor allows us to either create a new article or edit an existing one.

  props:
    article - the article to be edited [optional]
    complete - a callback to call when editing is complete

  The complete callback should have two arguments (newArticle, oldArticle). if called with no arguemnts, this cancels the operation. With one, it creates a new article, with two, it replaces the second with the first.


*/

import React, {Component} from 'react';
import styled from 'styled-components';


const EditorContainer=styled.div`
  margin: 40px;
`;

const TitleInput = styled.input`
  display: block;
`;

const ContentsInput = styled.textarea`
  margin: 10px 0px;
  display: block;
`;

class Editor extends Component{
  constructor(props){
    super(props);
  
    const title = props.article ? props.article.title : '';
    const contents = props.article? props.article.extract : '';

    this.state = {
      title: title,
      contents:contents
    };

  }

  handleTextUpdate(event, field){
    this.setState({[field]: event.target.value});
  }

  saveArticle(){
    const now = new Date();
    const newArticle = {
      title: this.state.title,
      extract: this.state.contents,
      edited: now.toISOString()
    }

    this.props.complete(newArticle);
  }

  render(){
  const title = (<TitleInput
    type="text"
    size="45"
    value={this.state.title}
    placeholder="Title must be set" onChange={(event)=>this.handleTextUpdate(event, 'title')}/>);

  const body = (<ContentsInput
    cols="100"
    rows="10"
    value={this.state.contents}
    placeholder="Contents"
    onChange={(event)=>this.handleTextUpdate(event, 'contents')}/>)

    return(
      <EditorContainer>
      {title}
      {body}
      <div>
      <input type="button" disabled={this.state.title === ''} onClick={()=>this.saveArticle()} value="Save" />
      <input type="button" onClick={()=>this.props.complete()} value="Cancel" />
      </div>
      </EditorContainer>
    );
  }
}


Editor.propTypes = {
  article: React.PropTypes.object,
  complete: React.PropTypes.func.isRequired
}

export default Editor;
