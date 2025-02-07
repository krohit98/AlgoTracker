import * as React from 'react';
import { Pencil, Trash } from 'react-bootstrap-icons';

const MultiTextArea = ({textAreaTitle, getData, resetKey}) => {

    const defaultStateObject = {title:`${textAreaTitle} 1`, data:""}

    const [textAreaList, setTextAreaList] = React.useState([{...defaultStateObject}]);
    const [selected, setSelected] = React.useState(0)

    function addTextArea(){
        setTextAreaList([...textAreaList, {title:`${textAreaTitle} ${textAreaList.length+1}`,data:""}]);
        setSelected(selected+1);
    }

    function removeTextArea(){
        let textAreaListUpdated = [...textAreaList];
        textAreaListUpdated.splice(selected,1);
        setTextAreaList(textAreaListUpdated);
        if(selected > 0) setSelected(selected-1);
    }

    function addData(e){
        let textAreaListUpdated = [...textAreaList];
        textAreaListUpdated[selected] = {title:textAreaListUpdated[selected].title, data:e.target.value} 
        setTextAreaList(textAreaListUpdated);
    }

    function addTitle(e){
        let textAreaListUpdated = [...textAreaList];
        textAreaListUpdated[selected] = {title:e.target.value, data:textAreaListUpdated[selected].data} 
        setTextAreaList(textAreaListUpdated);
    }

    React.useEffect(()=>{
            setTextAreaList([{...defaultStateObject}])
            setSelected(0)
    },[resetKey])

    React.useEffect(()=>{
        getData(textAreaList)
    },[textAreaList])

    React.useEffect(()=>console.log("render"))

    return(
        <div className='multiTextArea'>
            <div className='titleWrapper mb-2'>
                {
                    textAreaList.map((textArea,index) => {
                        return (
                            <div
                                className={'titleBtn'+(index === selected ? ' titleBtnSelected' : '')}
                                onClick={()=>setSelected(index)} 
                            >
                                {textArea.title.length > 13 ? textArea.title.substring(0,10)+'...' :textArea.title}
                            </div>
                        )
                    })
                }
                {textAreaList.length < 5 && <div className='addTextAreaIcon' onClick={addTextArea}>Add +</div>}
            </div>
            <div className='dataWrapper'>
                <div className='dataTitle'>
                    <label>Title: </label>
                    <input
                        className='titleField'
                        value={textAreaList[selected]?.title || ''} 
                        onChange={addTitle}
                    />
                    <Pencil size={10} />
                </div>
                <textarea 
                    className='dataField' 
                    rows='9' 
                    value={textAreaList[selected]?.data || ''} 
                    onChange={addData}
                ></textarea>
                <div className='trashIconWrapper'>
                    {textAreaList.length > 1 && <Trash size={20} color='rgb(255,0,0)' className='trashIcon' onClick={removeTextArea}/>}
                </div>
            </div>
        </div>
    )
}

export default React.memo(MultiTextArea);