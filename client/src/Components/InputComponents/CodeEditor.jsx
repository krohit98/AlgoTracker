import * as React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

const CodeEditor = (props) => {
  const [code, setCode] = React.useState('');

  React.useEffect(()=>{
    if(props.disabled || !props.setSolutions) return;

    let title = props?.solutions?.[props.solutions.length - 1]?.title || "Solution #1";
    if(props.problem){
        title = `Solution #${props.problem.Solutions.length + 1}`;
    }
    props.setSolutions([{title, code}]);
  },[code, props.disabled]);

  React.useEffect(()=>{
    setCode(props?.solutions?.[props.solutions.length - 1]?.code || 
    `// write code here.`);
  },[props.solutions]);

  return (
    <div className='codeEditorWrapper'>
    <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight:"100%"
        }}
        textareaId = {props.id || ""}
        textareaClassName = {props.className || "codeEditor"}
        />
    </div>
    
  );
}

export default CodeEditor;