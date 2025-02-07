import * as React from 'react';

const CheckboxDropdown = ({optionList, returnSelectedData, resetKey}) => {

    const [checkboxId] = React.useState(window.crypto.randomUUID())

    const [selected, setSelected] = React.useState({})

    function toggleSelect(e, index){
        if(selected[index]){ 
            let updatedSelection = {...selected};
            delete updatedSelection[index];
            setSelected(updatedSelection);
        }
        else{
            setSelected({...selected, [index]:e.target.value})
        }
    }

    function toggleDropdown(){
        let checkboxDropdown = document.getElementById(checkboxId);
        let dropdownBox = checkboxDropdown.querySelector('.dropdownBox');
        dropdownBox.classList.toggle('dropdownBox-visible');
    }

    React.useEffect(()=>{
        document.addEventListener('click',(e)=>{
            if(!e.target.id.includes(checkboxId)){
                let checkboxDropdown = document.getElementById(checkboxId);
                let dropdownBox = checkboxDropdown?.querySelector('.dropdownBox');
                dropdownBox?.classList.remove('dropdownBox-visible');
            }
        })
    },[])

    React.useEffect(()=>{
        setSelected({});
        document.getElementById(checkboxId).querySelectorAll("input[type='checkbox']:checked").forEach(option => option.checked = false)
    },[resetKey])

    React.useEffect(()=>{
        returnSelectedData(Object.values(selected));
    },[selected])

    React.useEffect(()=>console.log("render checkbox"))
   
    return(
        <div className='checkboxDropdown' id={checkboxId}>
            <input type="text" className='form-control' id={checkboxId+'-input'} readOnly value={Object.values(selected).join(", ")} placeholder="Select" onClick={toggleDropdown}/>
            <div className="dropdownBox" id={checkboxId+'-dropdownBox'}>
                {
                    optionList.map((option,index) => {
                        let optionId = (checkboxId)+"-option-"+(index);
                        return (
                            <div className='checkboxDropdownOption' key={optionId} id={optionId+'-wrapper'}>
                            <input type="checkbox" id={optionId} name={option} value={option} onChange={(e)=>toggleSelect(e,index)}/>
                            <label for={optionId} id={optionId+'-label'}>{option}</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(CheckboxDropdown);