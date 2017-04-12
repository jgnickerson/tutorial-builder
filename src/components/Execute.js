/*
    Execute code component
*/


import React, { Component } from 'react';


function myFunc(props, iframe) {
    var doc;
    //just putting in JS code for now becuase that is the only code editor we have
    var result = '<html><head>' + '<style>' + '</style></head><body>' + '<script type="text/javascript">' + props.code + '</script></body></html>';

    //determining which part of document to grab
    if(iframe.contentDocument) {
        doc = iframe.contentDocument;
    }
    else if(iframe.contentWindow) {
        doc = iframe.contentWindow.document;
    }
    else{
        doc = iframe.document;
    }

    //writing file in the iframe and compiling
    doc.open();
    doc.writeln(result);
    doc.close();
}

function Execute(props){

    //creating iframe with id iframe and appending on document
    var iframe;
    if(document.getElementById("iframe")) {
        iframe = document.getElementById("iframe");
    } else {
        iframe = document.createElement('iframe');
        iframe.setAttribute("id","iframe")
        document.body.appendChild(iframe);
    }
    //running code when press Run
    var butt = <button onClick={()=>myFunc(props, iframe)}>Run</button>;


    return (
            <div>
                {butt}
            </div>

    );

}



export default Execute;

// <Iframe id='Ifrane'></Iframe>

// <HtmlBox id='html'></HtmlBox>
// <CssBox id='css'></CssBox>
// <JsBox id='js'></JsBox>
