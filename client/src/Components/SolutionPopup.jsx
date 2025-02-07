import * as React from 'react';

const SolutionPopup = (props) => {
    const [content, setContent] = React.useState('');
    const [selectedNote, setSelectedNote] = React.useState(0);
    const [selectedSolution, setSelectedSolution] = React.useState(0);

    React.useEffect(()=>{
        setContent(props.data.Clicked);
        setSelectedNote(0);
        setSelectedSolution(0);
    },[props.data.Clicked])

    return(
        <div className='modal' id="solution-modal">
            <div className='modal-dialog modal-xl modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        <div className='modal-side-nav'>
                            <div className={content=="Notes"?"modal-side-nav-active":""} onClick={()=>setContent("Notes")}>Notes</div>
                            <div className={content=="Solutions"?"modal-side-nav-active":""} onClick={()=>setContent("Solutions")}>Solutions</div>
                        </div>
                        <div className='modal-main-area'>
                            <div className='modal-head-content'>{props.data[content]?.map((item,index) => <button className={'modal-head-btn'+((content=="Notes" && selectedNote==index) || (content=="Solutions" && selectedSolution==index)?" modal-head-btn-active":"")} key={item.id}>{item.title.length > 13 ? item.title.substring(0,10)+'...' : item.title}</button>)}</div>
                            <div className='modal-main-area-content'>
                                <p className='modal-title'>{content=="Notes"?props.data?.[content]?.[selectedNote]?.title:props.data?.[content]?.[selectedSolution]?.title}</p>
                                <p className='modal-date'>{content=="Notes"?new Date(props.data?.[content]?.[selectedNote]?.updatedAt).toLocaleString():new Date(props.data?.[content]?.[selectedSolution]?.updatedAt).toLocaleString()}</p>
                                <div className='modal-info'>
                                    {content=="Notes" && <p className='modal-note'>{props.data?.[content]?.[selectedNote]?.content}</p>}
                                    {content=="Solutions" && <code className='modal-code'>{props.data?.[content]?.[selectedSolution]?.code}</code>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <small id="popup-close-msg">Click anywhere outside popup to close.</small>
                </div>
            </div>
        </div>
    )
}

export default SolutionPopup;