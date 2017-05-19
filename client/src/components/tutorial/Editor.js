/*
  Editor.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import CodeMirror from 'react-codemirror';

const CodeContainer = styled.li`
  width: 100%;
  height: 490px;
  display: inline-block;
  vertical-align: top;
`;


class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {activeKey: '1'}

    this.handleSelect = this.handleSelect.bind(this);
  }

  // this fixes the weird codeMirror issue...
  // https://github.com/JedWatson/react-codemirror/issues/6
  componentDidMount() {
    this.refs.editor.getCodeMirror().refresh();
    this.refs.editor1.getCodeMirror().refresh();
    this.refs.editor2.getCodeMirror().refresh();
    this.refs.editor3.getCodeMirror().refresh();
    this.refs.editor4.getCodeMirror().refresh();
    this.refs.editor5.getCodeMirror().refresh();
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const jsOptions = {
      mode: 'javascript',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      fixedGutter: false
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
      <PanelGroup style={{height: "490px"}} activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
        <Panel header="My Code" eventKey="1">
          <CodeContainer>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example1">
              <Tab eventKey={1} title="JS">
                <CodeMirror ref="editor" value={this.props.starterCode.js} onChange={(value) => this.props.onCodeChange(value, 'starter', 'js')} options={jsOptions} />
              </Tab>
              <Tab eventKey={2} title="HTML">
                <CodeMirror ref="editor1" value={this.props.starterCode.html} onChange={(value) => this.props.onCodeChange(value, 'starter', 'html')} options={htmlOptions} />
              </Tab>
              <Tab eventKey={3} title="CSS">
                <CodeMirror ref="editor2" value={this.props.starterCode.css} onChange={(value) => this.props.onCodeChange(value, 'starter', 'css')} options={cssOptions} />
              </Tab>
            </Tabs>
          </CodeContainer>
        </Panel>
        <Panel header="Solution Code" eventKey="2">
          <CodeContainer>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example2">
              <Tab eventKey={1} title="JS">
                <CodeMirror ref="editor3" value={this.props.solutionCode.js} onChange={(value) => this.props.onCodeChange(value, 'solution', 'js')} options={Object.assign({readOnly: true}, jsOptions)} />
              </Tab>
              <Tab eventKey={2} title="HTML">
                <CodeMirror ref="editor4" value={this.props.solutionCode.html} onChange={(value) => this.props.onCodeChange(value, 'solution', 'html')} options={Object.assign({readOnly: true}, htmlOptions)} />
              </Tab>
              <Tab eventKey={3} title="CSS">
                <CodeMirror ref="editor5" value={this.props.solutionCode.css} onChange={(value) => this.props.onCodeChange(value, 'solution', 'css')} options={Object.assign({readOnly: true}, cssOptions)} />
              </Tab>
            </Tabs>
          </CodeContainer>
        </Panel>
      </PanelGroup>
    );
  }
}

// Editor.propTypes = {
//   onExit: React.PropTypes.func.isRequired
// }

export default Editor;
