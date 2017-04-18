/*
    Execute code component
*/
import React, { Component } from 'react';

//Execute Component
class Execute extends Component {
  constructor() {
    super();
  }

  componentWillUnmount() {
    let iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.parentNode.removeChild(iframe);
    }


    let consoleLogs = document.getElementById('console-logs');
    if (consoleLogs) {
      consoleLogs.parentNode.removeChild(consoleLogs);
    }
  }

  render () {
    return <div><button onClick={()=>executeCode(this.props.js, this.props.html, this.props.css, true)}>Run</button></div>
  }
}


function executeCode(js, rawHtml, css, showIframe) {
    //if an iFrame already exists, remove it
    if (document.getElementById("iframe")) {
        let iframe = document.getElementById("iframe");
        iframe.parentNode.removeChild(iframe);
    }

    //create a new iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute("id","iframe")
    document.body.appendChild(iframe);

    if (!showIframe) {
      iframe.style.display = 'none';
    }

    refreshLogs();

    //this code redirects all console.log in user code to a function of ours (logEntry)
    let consoleLogRewrite = `
      if (''+baseLogFunction !== ''+parent.console.log) {
        var baseLogFunction = console.log;
      }

      console.log = function(){
        baseLogFunction.apply(console, arguments);

        var args = Array.prototype.slice.call(arguments);
        parent.logEntry([...args]);
      }\n`


    let code = consoleLogRewrite + js;
    let html = '<html><head>' + '<style>' + css + '</style></head><body>' + rawHtml + '<script type="text/javascript">' + code + '</script></body></html>';

    //writing file in the iframe and compiling
    iframe.contentDocument.open();
    iframe.contentDocument.write(html);
    iframe.contentDocument.close();
}

function refreshLogs() {
  //if the consoleLogs node already exists, remove it
  let consoleLogs = document.getElementById('console-logs');
  if (consoleLogs) {
    consoleLogs.parentNode.removeChild(consoleLogs);
  }

  //(re)create the node
  consoleLogs = document.createElement('div');
  consoleLogs.setAttribute('id', 'console-logs');
  document.body.appendChild(consoleLogs);

  return consoleLogs;
}

window.logEntry = function(logEntries) {
  const consoleLogs = document.getElementById('console-logs');

  let logEntry = logEntries[0];
  for (let i = 1; i < logEntries.length; i++) {
    logEntry = logEntry + " " + logEntries[i];
  }
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(logEntry));
  consoleLogs.appendChild(div);
  document.body.appendChild(consoleLogs);
}

export default Execute;
