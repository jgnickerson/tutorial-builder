/*
  Article.js

  This provides the implementation for the Article coponent.

  The Article simply displays the contents of an article passed down in the props.

  Since it has no state, we can make this a functional component.
*/

import React from 'react';
import styled from 'styled-components';


const ArticleContainer = styled.div`
  margin:40px;
`;

const ArticleTitle=styled.h3``;

const ArticleText=styled.div``;
const ArticleTimestamp=styled.p`
  font-size: small;
`;

function Article(props){
  const date = new Date(props.article.edited).toString();

  return(
    <ArticleContainer>
    <ArticleTitle>{props.article.title}</ArticleTitle>
    <ArticleText>{props.article.extract}</ArticleText>
    <ArticleTimestamp>{date}</ArticleTimestamp>
    </ArticleContainer>
  );
}

Article.propTypes = {
  article:React.PropTypes.object.isRequired
};


export default Article;
