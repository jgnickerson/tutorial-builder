/*
    Execute code component
*/
import React from 'react';

//Execute Component
function Execute(props) {
  return (
    <div className="execution-body">
      <div className="execution-iframe-div" id="execution-iframe-div">
        <iframe id="execution-iframe"></iframe>
      </div>
      <div classname="execution-console-div" id="execution-console-div"></div>
      <button onClick={()=>executeCode(props.js, props.html, props.css, true)}>Run</button>
    </div>)
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


    let code = consoleLogRewrite + js;
    let html = '<html><head>' + '<style>' + css + '</style></head><body>' + rawHtml + '<script type="text/javascript">' + code + '</script></body></html>';

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
  iframe.setAttribute("id","execution-iframe")
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
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(logEntry));
  consoleLogs.appendChild(div);
}

export default Execute;
