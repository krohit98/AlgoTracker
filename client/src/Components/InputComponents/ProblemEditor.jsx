import * as React from 'react';
import { isEqual } from 'lodash';
import * as helper from '../../Service/helper';
import * as service from '../../Service/service';
import DataForm from './DataForm';
import ProblemStatus from '../shared/ProblemStatus';
import { ProblemContext } from '../shared/context';

const ProblemEditor = ({problem, disabled}) => {
    return !disabled ? <ProblemEditorEnabled problem={problem}/> : <ProblemEditorDisabled problem={problem}/>
}

const ProblemEditorDisabled = ({problem}) => (
    <div id="problemEditorDisabled">
        <h3>{problem?.statement || `Problem #${problem.id}`}</h3>
        <div className="mb-3"><a href={problem?.link || "#"} target="_blank" rel="noreferrer">{problem?.link || "No link available."}</a></div>
        <div className="problemDetails mb-3">
            <div className='topicsWrapper mb-3'>
                {problem.topics.map((topic, index) => (
                    <span key={index} className="topicTab">{topic}</span>
                ))}
            </div>
            <div className='descriptionWrapper'>{problem?.description || "No description available."}</div>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center gap-3'>
                <div className='statusWrapper'><small>Status</small><span className={problem?.status || "notProvided"}>{problem?.status || "Not Provided"}</span></div>
                <div className='difficultyWrapper'><small>Difficulty</small><span className={problem?.difficulty || "notProvided"}>{problem?.difficulty || "Not Provided"}</span></div>
            </div>
            <div className='d-flex align-items-center gap-3'>
                {problem?.status !== ProblemStatus.SOLVED && <button>Mark as Solved</button>}
                {problem?.status !== ProblemStatus.UNSOLVED && <button>Mark as Unsolved</button>}
                {problem?.status !== ProblemStatus.REVISE && <button>Mark for Revision</button>}
            </div>
        </div>
    </div>
);

const ProblemEditorEnabled = ({problem}) => {

    const [existingFormData, setExistingFormData] = React.useState(null);
    const [problems, setProblems] = React.useContext(ProblemContext);

    function updateProblem(updatedFormData){
        if(isEqual(existingFormData, updatedFormData)){
            console.log("No changes detected to update.");
            helper.showError("No changes detected to update.");
            return;
        }

        if(!helper.validateFormData(updatedFormData)) return;

        const payload = {
            link:updatedFormData.link,
            statement:updatedFormData.statement,
            description:updatedFormData.description,
            difficulty:updatedFormData.difficulty,
            status:updatedFormData.status,
            topics:updatedFormData.topics
        }

        service.updateProblemById(problem.id, payload)
        .then(response => {
            if(response.success){
                helper.showSuccess("Problem updated successfully!");
                const updatedProblems = problems.all.map(p => p.id === problem.id ? {...p, ...response.body} : p);
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

    React.useEffect(()=>{
        if (!problem || Object.keys(problem).length === 0) return;

        const {
            link='',
            statement='',
            description='',
            difficulty='',
            status=ProblemStatus.UNSOLVED,
            topics=[]
        } = problem;

        const existingProblem = {
            link,
            statement,
            description,
            difficulty,
            status,
            topics
        };

        setExistingFormData(existingProblem);
    },[problem]);

    return(
        <DataForm formData={existingFormData}>
            <div id="problemEditorEnabled" className="container-fluid">
                <div className="row mb-3">
                    <div className="col-12">
                        <DataForm.LinkInput showLabel={true}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <DataForm.StatementInput/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <DataForm.DescriptionInput/>
                    </div>
                </div>
                <div className='row d-flex gap-3 mb-3'>
                    <div className="col">
                        <DataForm.DifficultyInput />
                    </div>
                    <div className="col">
                        <DataForm.StatusInput />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <DataForm.TopicInput />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12">
                        <DataForm.TopicDisplay />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <DataForm.UpdateButton onUpdate={updateProblem}/>
                    </div>
                </div>
            </div>
        </DataForm>
    );
};

export default ProblemEditor;