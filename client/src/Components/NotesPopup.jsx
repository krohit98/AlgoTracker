import * as React from 'react';

const NotesPopup = (props) => {
    return(
        <div className='modal' id="notes-modal">
            <div className='modal-dialog modal-dialog-scrollable'>
                <div className='modal-content'>
                    <div className='modal-header'>Notes</div>
                    <div className='modal-body'>
                        <p>{props.noteContent}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesPopup;