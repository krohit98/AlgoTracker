import * as React from 'react';

import { Editor } from '@monaco-editor/react';
import { MoonStars, Sun } from 'react-bootstrap-icons';

const CodeEditor = (props) => {
  return props.disabled ? <CodeEditorDisabled {...props}/> : <CodeEditorEnabled {...props}/>;
}

const CodeEditorEnabled = (props) => {
  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('javascript');
  const [theme, setTheme] = React.useState('light');

  React.useEffect(()=>{
    if(props.disabled || !props.setSolutions) return;

    let title = props?.solutions?.[props.solutions.length - 1]?.title || "Solution #1";
    if(props.problem){
        title = `Solution #${props.problem.Solutions.length + 1}`;
    }
    props.setSolutions([{title, code}]);
  },[code, props.disabled]);

  React.useEffect(()=>{
    setCode(props?.solutions?.[props.solutions.length - 1]?.code || '');
  },[props.solutions]);

  React.useEffect(()=>{
    console.log(language)
  },[language])

  return (
    <div className='codeEditorWrapper'>
      <div className='d-flex justify-content-between mb-2'>
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="cpp">CPP</option>
          <option value="python">Python</option>
        </select>
        <div>
          <Sun size={20} onClick={()=>setTheme('light')}/>
          <MoonStars size={20} className='ms-3' onClick={()=>setTheme('vs-dark')}/>
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage='javascript'
        language={language}
        defaultValue="// write your code here..."
        value={code}
        theme={theme}
        options={{
          readOnly:false,
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
        }}
      />
    </div>
    
  );
};

const CodeEditorDisabled = () => {

};

export default CodeEditor;