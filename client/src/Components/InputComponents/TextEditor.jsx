import * as React from 'react';
import * as service from '../../Service/service';
import * as helper from '../../Service/helper';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../utility/textEditorTools';
import { ProblemContext } from '../shared/context';

const initEditor = (readOnly, content, editorRef, holderRef, editorOnChange) => {
    // Clean up previous editor if any
    if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
    }
    const editorData = content ? JSON.parse(content) : ''

    if(editorRef.current) return;

    editorRef.current = new EditorJS({
        holder: holderRef.current,
        data: editorData,
        onChange: async () => {
            let content = await editorRef.current.saver.save();
            if(editorOnChange) editorOnChange(content);
        },
        tools: EDITOR_JS_TOOLS,
        placeholder: "Start writing your note here...",
        readOnly
    });
};

const TextEditor = (props) => {
    return (
        <>
        {props.disabled ? <TextEditorDisabled initEditor={initEditor} {...props} /> : <TextEditorEnabled initEditor={initEditor} {...props}/>}
        </>
    )
};

const TextEditorEnabled = (props) => {
    const [isExistingNote, setIsExistingNote] = React.useState(false);
    const [value, setValue] = React.useState(props?.notes?.[props.notes.length - 1]?.content || '');
    const [problems, setProblems] = React.useContext(ProblemContext);

    const holderRef = React.useRef(null);
    const editorRef = React.useRef(null);

    const editorOnChange = (content) => setValue(content? JSON.stringify(content) : '');

    const handleClick = () => isExistingNote ? updateNote() : createNote();

    function createNote(){
        service.addNotesByProblemId(props.problemId, [{title: "Note#1", content: value}])
        .then(response => {
            if(response.success){
                console.log(response, problems.all)
                helper.showSuccess("Note created successfully!");
                const updatedProblems = problems.all.map(p => {
                    if(p.id === props.problemId){
                        return {...p, Notes: [...response.body]}
                    }
                    else return p;
                });
                setProblems({...problems, all:updatedProblems});
                setIsExistingNote(true);
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

    function updateNote(){
        service.updateNotesById(props?.notes?.[props.notes.length - 1]?.id, {content:value})
        .then(response => {
            if(response.success){
                helper.showSuccess("Note updated successfully!");
                const updatedProblems = problems.all.map(p => {
                    if(p.id === props.problemId){
                        const updatedNotes = p.Notes.map(n => n.id === response.body.id ? {...n, ...response.body} : n)
                        return {...p, Notes: updatedNotes}
                    }
                    else return p;
                });
                setProblems({...problems, all:updatedProblems});
            }
            else{
                helper.showError("Update failed! Please try again later");
                console.error(response.body.message)
            }
        })
        .catch(error => {
            helper.showError("Update failed! Please try again later");
            console.error(error);
        });

    }

    React.useEffect(() => {
        const content = props?.notes?.[props.notes.length - 1]?.content;
        props.initEditor(false, content, editorRef, holderRef, editorOnChange);

        if(content) setIsExistingNote(true);

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    React.useEffect(() => {
        if (props.disabled || !props.setNotes) return;

        let title = props?.notes?.[props.notes.length - 1]?.title || "Note #1";
        if (props.problem) {
            title = `Note #${props.problem.Notes.length + 1}`;
        }
        props.setNotes([{ title, content: value }]);
    }, [value]);

    return (
        <>
        <div id="textEditorEnabled" ref={holderRef}></div>
        {props.showUpdateButton && <button id="textEditorUpdateButton" className='btn btn-primary w-25' onClick={handleClick}>{isExistingNote ? "Update Note" : "Create Note" }</button>}
        </>
    );
};

const TextEditorDisabled = (props) => {
    const holderRef = React.useRef(null);
    const editorRef = React.useRef(null);

    React.useEffect(() => {
        const content = props?.notes?.[props.notes.length - 1]?.content;
        props.initEditor(true, content, editorRef, holderRef);

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return <div id="textEditorDisabled" ref={holderRef}></div>
};

export default TextEditor;