/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';

function Tutorial(props) {
    return (
      <div>
        <button onClick={props.onExit}>Exit</button>
        <ul>
          <Instructions />
          <Editor />
        </ul>
      </div>
    )
}

Tutorial.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default Tutorial;
