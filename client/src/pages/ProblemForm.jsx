import * as React from 'react';

const ProblemForm = (props) =>{

    return(
        <form className='container-fluid'>
            <div className='row'>
                <div className="col-3">
                    <label htmlFor="" className="form-label">Topic<span className='req'>*</span></label>
                    <input className="form-control" type="text" list="topic-list"/>
                    <datalist id="topic-list">
                        <option value="Arrays" />
                        <option value="Linked Lists" />
                        <option value="Trees" />
                        <option value="Strings" />
                        <option value="Graphs" />
                    </datalist>
                </div>
                <div className='col'>
                    <label className='form-label' htmlFor="">Problem Statement<span className='req'>*</span></label>
                    <input className='form-control mb-3' type="text" />
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <label className='form-label' htmlFor="">Link<span className='req'>*</span></label>
                    <input className='form-control mb-3' type="text" />
                </div>
                <div className="col">
                    <label className='form-label' htmlFor="">Level<span className='req'>*</span></label>
                    <select className='form-control mb-3' name="" id="">
                        <option value="" hidden selected>Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="col">
                    <label className='form-label' htmlFor="">Status<span className='req'>*</span></label>
                    <select className='form-control mb-3' name="" id="">
                        <option value="" hidden selected>Select</option>
                        <option value="Solved">Solved</option>
                        <option value="Solved with help">Solved with help</option>
                        <option value="Unsolved">Unsolved</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label className='form-label' htmlFor="">Add Notes</label>
                    <textarea className='form-control mb-3' name="" id=""  rows="10"></textarea>
                </div>
                <div className='col'>
                    <label className='form-label' htmlFor="">Add Solution</label>
                    <textarea className='form-control mb-3' name="" id=""  rows="10"></textarea>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-2 text-center">
                    <button className='btn btn-primary w-100'>Add</button>
                </div>
                <div className="col-2 text-center">
                    <button className='btn btn-danger w-100'>Reset</button>
                </div>
            </div>
        </form>
    )
}

export default ProblemForm;