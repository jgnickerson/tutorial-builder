import React, { Component } from 'react';
import style from 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import CodeMirror from 'react-codemirror';

class CreateCode extends Component {

  constructor(props) {
    super(props);
    this.state = {activeKey: '1'}

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const jsOptions = {
      mode: 'js',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      fixedGutter: false
    };

    const options = {
      lineNumbers: true,
      lineWrapping : false,
      autoRefresh:true,
      theme: 'paraiso-light',
      styleActiveLine: true,
      fixedGutter:true,
      lint:true,
      coverGutterNextToScrollbar:false,
      gutters: ['CodeMirror-lint-markers'],
      mode: 'javascript'
    };

    const htmlOptions = {
      mode: 'html',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      fixedGutter: false
    };

    const cssOptions = {
      mode: 'css',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      fixedGutter: false
    };

    return (
      <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
        <Panel header="Starter" eventKey="1">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example1">
            <Tab eventKey={1} title="JS">
              <CodeMirror value={this.props.starterCode.js} onChange={(value) => this.props.onCodeChange(value, 'starter', 'js')} options={jsOptions} />
            </Tab>
            <Tab eventKey={2} title="HTML">
              <CodeMirror value={this.props.starterCode.html} onChange={(value) => this.props.onCodeChange(value, 'starter', 'html')} options={htmlOptions} />
            </Tab>
            <Tab eventKey={3} title="CSS">
              <CodeMirror value={this.props.starterCode.css} onChange={(value) => this.props.onCodeChange(value, 'starter', 'css')} options={cssOptions} />
            </Tab>
          </Tabs>
        </Panel>
        <Panel header="Solution" eventKey="2">
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example2">
            <Tab eventKey={1} title="JS">
              <CodeMirror value={this.props.solutionCode.js} onChange={(value) => this.props.onCodeChange(value, 'solution', 'js')} options={jsOptions} />
            </Tab>
            <Tab eventKey={2} title="HTML">
              <CodeMirror value={this.props.solutionCode.html} onChange={(value) => this.props.onCodeChange(value, 'solution', 'html')} options={htmlOptions} />
            </Tab>
            <Tab eventKey={3} title="CSS">
              <CodeMirror value={this.props.solutionCode.css} onChange={(value) => this.props.onCodeChange(value, 'solution', 'css')} options={cssOptions} />
            </Tab>
          </Tabs>
        </Panel>
      </PanelGroup>
    );
  }
}

// CreateCode.propTypes = {
//   onExit: React.PropTypes.func.isRequired
// }

export default CreateCode;
