import * as React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {

    const [value, setValue] = React.useState('');

    return <ReactQuill className="textEditor" theme="snow" value={value} onChange={setValue} />;
}

export default TextEditor;