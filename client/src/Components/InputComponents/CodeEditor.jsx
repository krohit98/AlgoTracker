import * as React from 'react';
import * as service from '../../Service/service';
import * as helper from '../../Service/helper';

import { Editor } from '@monaco-editor/react';
import { MoonStars, Sun } from 'react-bootstrap-icons';

import { UserContext } from '../shared/context';
import { ProblemContext } from '../shared/context';

const CodeEditor = (props) => {

  const [user, setUser] = React.useContext(UserContext);

  const [code, setCode] = React.useState('');
  const [language, setLanguage] = React.useState('javascript');
  const [theme, setTheme] = React.useState(user.codeTheme || 'light');
  const [isExistingSolution, setIsExistingSolution] = React.useState(false);
  const [problems, setProblems] = React.useContext(ProblemContext);

  const handleClick = () => isExistingSolution ? updateSolution() : createSolution();
  
  function createSolution(){
    service.addSolutionsByProblemId(props.problemId, [{title: "Solution#1", code, language}])
    .then(response => {
        if(response.success){
            helper.showSuccess("Solution created successfully!");
            const updatedProblems = problems.all.map(p => {
                if(p.id === props.problemId){
                    return {...p, Solutions: [...response.body]}
                }
                else return p;
            });
            setProblems({...problems, all:updatedProblems});
            setIsExistingSolution(true);
        }
        else{
            helper.showError("Note cannot be created! Please try again later");
            console.error(response.body.message)
        }
    })
    .catch(error => {
        helper.showError("Note cannot be created! Please try again later");
        console.error(error);
    });
  }

  function updateSolution(){
    service.updateSolutionById(props?.solutions?.[props.solutions.length - 1]?.id, {code, language})
    .then(response => {
      if(response.success){
        helper.showSuccess("Solution updated successfully!");
        const updatedProblems = problems.all.map(p => {
            if(p.id === props.problemId){
                const updatedSolutions = p.Solutions.map(s => s.id === response.body.id ? {...s, ...response.body} : s)
                return {...p, Solutions: updatedSolutions}
            }
            else return p;
        });
        setProblems({...problems, all:updatedProblems});
      }
      else{
          helper.showError("Failed to update solution! Please try again later");
          console.error(response.body.message)
      }
    })
    .catch(error => {
      helper.showError("Failed to update solution! Please try again later.");
      console.error(error);
    })
  }

  // This will only trigger from the problem form page when creating a new problem and adding solution.
  React.useEffect(()=>{
    if(props.disabled || !props.setSolutions || !code) return;

    let title = props?.solutions?.[props.solutions.length - 1]?.title || "Solution #1";
    if(props.problem){
        title = `Solution #${props.problem.Solutions.length + 1}`;
    }
    props.setSolutions([{title, code, language}]);
  },[code, language]);

  React.useEffect(()=>{
    console.log(props.solutions)
    if(props?.solutions?.length > 0){
      console.log("Existing solution found, loading it into editor");
      setCode(props.solutions[props.solutions.length - 1]?.code || '');
      setLanguage(props.solutions[props.solutions.length - 1]?.language || 'javascript');
      setIsExistingSolution(true);
    }
    else{
      console.log("No existing solution, resetting editor");
      setCode('');
      setLanguage('javascript');
      setIsExistingSolution(false);
    }
  },[props.solutions]);

  React.useEffect(()=>{
    if(user.userId && theme && theme !== user.codeTheme)
      service.updateCodeThemeByUserId(user.userId, theme)
      .then(response => {
        if(response.success){
          setUser({...user, codeTheme:theme})
        }
      })
      .catch(error => {console.error(error)})
  },[theme])

  React.useEffect(()=>{console.log(problems)},[])

  return (
    <>
    <div className={'codeEditorWrapper' + ((!props.disabled && props.showUpdateButton) ? ' codeEditorWrapperCompact' : '')}>
      <div className='d-flex justify-content-between mb-2 p-2'>
        <select id="codeEditorLanguageSelector" value={language} onChange={(e)=>setLanguage(e.target.value)} disabled={props.disabled}>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
        <div id="codeEditorThemeSelector">
          <Sun size={20} onClick={()=>setTheme('light')} opacity={theme === 'light' ? 1 : 0.5} cursor="pointer"/>
          <MoonStars size={20} className='ms-2' onClick={()=>setTheme('vs-dark')} opacity={theme === 'vs-dark' ? 1 : 0.5} cursor="pointer"/>
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        language={language}
        defaultValue="// write your code here..."
        value={code}
        theme={theme}
        onChange={setCode}
        options={{
          readOnly:props.disabled,
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
        }}
      />
    </div>
    {!props.disabled && props.showUpdateButton && <button id="editorUpdateButton" className='btn btn-primary w-25' onClick={handleClick}>{isExistingSolution ? 'Update Solution' : 'Create Solution'}</button>}
    </>
  );
};

export default CodeEditor;