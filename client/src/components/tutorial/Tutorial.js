/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';

function Tutorial(props) {
    if (props.tutorial){
    return (
      <div>
        <button onClick={props.onExit}>Exit</button>
        <ul>
          <Instructions instructions={props.tutorial.stages[0].instructions}/>
          <Editor startingCode={props.tutorial.stages[0].code}/>
        </ul>
      </div>
      )
    }
    else{
      return(
      <p>
       Loading...
      </p>
    )}

}

Tutorial.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default Tutorial;
