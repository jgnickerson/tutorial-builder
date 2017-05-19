/*
    Execute code component
*/
import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const Console = styled.div`
  height: 300px;
  width: 304px;
  background-color: #f7f7f7;
  margin-bottom: 2px;
  border: 1px black solid;
`;

const ExecuteDiv = styled.div `
  width: 304px;
  height: 300px;
`;

//Execute Component
function Execute(props) {
  const onShow = (()=>{
    executeCode(props.solutionCode.js, props.solutionCode.html, props.solutionCode.css, true);
  });
  return (
    <ExecuteDiv className="execution-body">
      <div className="execution-iframe-div" id="execution-iframe-div" width="100%" height="300px">
        <iframe width="100%" height="300px" id="execution-iframe" ></iframe>
      </div>
      <Console className="execution-console-div" id="execution-console-div"></Console>
      <p />
      <ButtonGroup>
        <Button onClick={()=>executeCode(props.userCode.js, props.userCode.html, props.userCode.css, true)}>Run My Code</Button>
        <Button onClick={onShow}>Run Solution Code</Button>
      </ButtonGroup>
    </ExecuteDiv>)
}

function executeCode(js, rawHtml, css, showIframe) {

    const iframe = refreshIframe(showIframe);
    clearExistingLogs();

    //this code redirects all console.log in user code to a function of ours (logEntry)
    let consoleLogRewrite = `
      if (''+baseLogFunction !== ''+parent.console.log) {
        var baseLogFunction = console.log;
      }

      console.log = function(){
        baseLogFunction.apply(console, arguments);

        var args = Array.prototype.slice.call(arguments);
        parent.logEntry([...args]);
      }

      window.onerror = function(message, url, linenumber) {
        linenumber = linenumber - 16;
        console.log("JavaScript error - line " + linenumber + ": " + message);
      }\n`

    let endBufferCode = `parent.formatConsole(); parent.formatConsole();`;


    let code = consoleLogRewrite + js + endBufferCode;
    let html = '<html><head><style>' + css + '</style></head><body>' + rawHtml + '<script type="text/javascript">' + code + '</script></body></html>';

    //writing file in the iframe and compiling
    iframe.contentDocument.open();
    iframe.contentDocument.write(html);
    iframe.contentDocument.close();
}

function refreshIframe(showIframe) {
  //remove already existing iFrame
  if (document.getElementById("execution-iframe")) {
      let iframe = document.getElementById("execution-iframe");
      iframe.parentNode.removeChild(iframe);
  }

  //create a new iframe
  const iframeNode = document.getElementById("execution-iframe-div");
  const iframe = document.createElement('iframe');
  iframe.setAttribute("id","execution-iframe");
  iframe.setAttribute("width","100%");
  iframe.setAttribute("height","300px");
  iframeNode.appendChild(iframe);

  if (!showIframe) {
    iframe.style.display = 'none';
  }

  return iframe;
}

function clearExistingLogs() {
  //remove all existing console logs from the div
  let consoleLogs = document.getElementById('execution-console-div');
  while (consoleLogs.hasChildNodes()) {
    consoleLogs.removeChild(consoleLogs.lastChild);
  }

  return consoleLogs;
}

window.logEntry = function(logEntries) {
  const consoleLogs = document.getElementById('execution-console-div');

  let logEntry = logEntries[0];
  for (let i = 1; i < logEntries.length; i++) {
    logEntry = logEntry + " " + logEntries[i];
  }

  //const div = <div><p>{logEntry}</p></div>;
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(logEntry));
  consoleLogs.appendChild(div);
}

window.formatConsole = function() {
  const consoleLogs = document.getElementById('execution-console-div');
  consoleLogs.appendChild(document.createElement('br'));
}

export default Execute;
