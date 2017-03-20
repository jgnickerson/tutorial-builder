/*
  ContentArea.js

  This governs the actual content displayed by the App. I pushed this down just to further illustrate the use of a container component.

  We have now given this component responsibility for managing the data and coordianting the views.
*/

import React, { Component } from 'react';

import Article from './Article.js';
import IndexBar from './IndexBar.js';
import Editor from './Editor.js';

import data from '../../public/seed.json';


class ContentArea extends Component{
  constructor(props){
    super(props);
    this.state={
      mode: 'view',
      currentArticle: null
    };

    // collate the data into a map divided up into sections
    this.collection = new Map();

    data.forEach((item)=>{
      let label = item.title[0];
      if (this.collection.has(label)){
        this.collection.get(label).push(item);
      }else{
        this.collection.set(label, [item]);
      }
    });

  }

  /*
  This function handles the result of the editor resigning control.
  */
  handleEditorReturn(newArticle){
    if (newArticle){ // not a cancel
      if (this.state.currentArticle){ // this is a replacement, remove the old article
        const oldArticle = this.state.currentArticle;
        const section = this.collection.get(oldArticle.title[0]);
        const index = section.findIndex((item)=>item.title === oldArticle.title);
        if (index > -1){
          section.splice(index,1);
        }
      }

      // Add the new article
      const label = newArticle.title[0];
      if (this.collection.has(label)){
        this.collection.get(label).push(newArticle);
      }else{
        this.collection.set(label, [newArticle]);
      }

      // load the new article as the current one
      this.setState({currentArticle: newArticle});
    }

    // switch to the browsing view
    this.setState({mode:'view'});
  }

  render(){
    if (this.state.mode === 'view'){
      // create the IndexBar
      let indexBar = (<IndexBar collection={this.collection} currentArticle={this.state.currentArticle} select={(article)=>this.setState({currentArticle:article})}/>);

      // create the article
      // Note that the insertion of Article is conditional on our having
      // a current article available
      let article ;
      if (this.state.currentArticle){
        article = (<div>
          <Article article={this.state.currentArticle}/>
          <input type="button" value="Edit article" onClick={()=>this.setState({mode:'edit'})} />
        </div>);
      }else{
        article = (<div></div>);
      }


      return (
        <div >
        <input type="button" value="Add article" onClick={()=>this.setState({mode:'edit', currentArticle:null})} />
          {indexBar}
          {article}
        </div>
      );

    }else{
      return (
        <Editor article={this.state.currentArticle} complete={(newArticle)=>{this.handleEditorReturn(newArticle)}}/>
      )
    }


  }
}


export default ContentArea;
