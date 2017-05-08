import React, { Component } from 'react';

class InstructionWriter extends Component {
  constructor() {
    super()

    this.state = {
      mode: 'text',
      text: ''
    }

    this.handleAddInstruction = this.handleAddInstruction.bind(this);
  }

  handleAddInstruction() {
    this.props.addInstruction({type: this.state.mode, data: this.state.text});
    this.setState({text: ''});
  }

  render() {
    return (
    <div>
      <select onChange={(e) => this.setState({mode: e.target.value})} defaultValue={this.state.mode}>
        <option value="text">Text</option>
        <option value="code">Code</option>
      </select>
      <textarea rows="6" cols="15" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}></textarea>
      <button onClick={this.handleAddInstruction}>Add Instruction</button>
    </div>
  )
  }
}

export default InstructionWriter;
