/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';
import Execute from './Execute.js';

function Tutorial(props) {
    if (props.instructions){
      return (
        <div>
          <button onClick={props.onExit}>Exit</button>
          <ul>
            <Instructions instructions={props.instructions}/>
            <Editor code={props.code} onChange={props.onCodeChange} mode={"javascript"}/>
            <Execute code={props.code}/>
          </ul>
        </div>
      )
    }else{
      return(
      <p>
       Loading...
      </p>
    )}
}

Tutorial.propTypes = {
  onExit: React.PropTypes.func.isRequired,
  onCodeChange: React.PropTypes.func.isRequired,
  instructions: React.PropTypes.array,
  code: React.PropTypes.string
}

export default Tutorial;
