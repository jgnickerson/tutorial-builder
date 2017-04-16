/*
    Execute code component
*/
import React, { Component } from 'react';

function myFunc(code, iframe) {
    let doc;


    let otherCode = `
    if (''+baseLogFunction !== ''+parent.console.log) {
      var baseLogFunction = console.log;
    }

    console.log = function(){
      baseLogFunction.apply(console, arguments);

      var args = Array.prototype.slice.call(arguments);
      for(var i=0;i<args.length;i++){
          parent.logEntry(args[i]);
      }
    }
    `

    code = otherCode + code;
    //just putting in JS code for now becuase that is the only code editor we have
    let result = '<html><head>' + '<style>' + '</style></head><body>' + '<script type="text/javascript">' + code + '</script></body></html>';

    //determining which part of document to grab
    if(iframe.contentDocument) {
        doc = iframe.contentDocument;
    //this is a workaround for Internet Explorer 8
    } else if(iframe.contentWindow) {
        doc = iframe.contentWindow.document;
    } else {
        doc = iframe.document;
    }

    //writing file in the iframe and compiling
    doc.open();
    doc.write(result);
    doc.close();
}

window.logEntry = function(message) {
  let node = document.createElement('div');
  let text = document.createTextNode(message);
  node.appendChild(text);
  document.body.appendChild(node);
}

function Execute(props){
    //creating iframe with id iframe and appending on document
    let iframe;
    if(document.getElementById("iframe")) {
        iframe = document.getElementById("iframe");
    } else {
        iframe = document.createElement('iframe');
        iframe.setAttribute("id","iframe")
        document.body.appendChild(iframe);
    }

    //running code when press Run
    const butt = <button onClick={()=>myFunc(props.code, iframe)}>Run</button>;

    return <div>{butt}</div>
}

export default Execute;

// <Iframe id='Ifrane'></Iframe>

// <HtmlBox id='html'></HtmlBox>
// <CssBox id='css'></CssBox>
// <JsBox id='js'></JsBox>
