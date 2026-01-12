import { CodeSlash, FileEarmarkText, Flag, FlagFill, CheckCircle, Trash, Eye, ArrowClockwise, XCircle } from 'react-bootstrap-icons';

const IconSize = 18;

const DataTable = (props) => {
    return (
        <div className="dataTableWrapper">
            <table id={props.id} className='dataTable table table-sm align-middle bg-white text-center mb-0'>
                {props.children}
            </table>
        </div>
    );
}

const StatementHeader = () => <th className='w-50'>Statement</th>
const DifficultyHeader = () => <th>Difficulty</th>
const StatusHeader = () => <th>Status</th>
const ActionHeader = () => <th></th>

const StatementData = (props) => (
    <td className='w-50 problem-item' onClick={props.onClick} title={props.link}>
        <table className='w-100'>
            <tbody>
                <tr><td className='problemStatement'>{props.statement || `Problem #${props.problemId}: ${props.link.length > 53 ? props.link.slice(0, 50) + '...' : props.link}`}</td></tr>
                {props.topics?.length > 0 && <tr><td className='problemTopics'>{props.topics?.map(topic=><div className='topicTab' key={topic}>{topic}</div>)}</td></tr>}
            </tbody>
        </table>
    </td>
);
const DifficultyData = (props) => <td className={props.difficulty || 'notProvided'}>{props.difficulty || 'Not Provided'}</td>
const StatusData = (props) => <td className={props.status || 'notProvided'}>{props.status || 'Not Provided'}</td>
const ActionData = (props) => (
    <td>
        <div className='problemAction'>
            {props.children}
        </div>
    </td>
);
const MarkSolvedAction = (props) => <CheckCircle title="Mark as Solved" onClick={props.onClick} color={"green"} size={IconSize}/>;
const MarkUnsolvedAction = (props) => <XCircle title="Mark as Unsolved" onClick={props.onClick} color={"red"} size={IconSize}/>;
const MarkReviseAction = (props) => <ArrowClockwise title="Mark for Revision" onClick={props.onClick} color={"orange"} size={IconSize}/>;
const FlagAction = (props) => props.flagged ? <FlagFill title="Flag" onClick={props.onClick} color={"rgb(0, 110, 255)"} size={IconSize}/> : <Flag title="Flag" onClick={props.onClick} color={"rgb(0, 110, 255)"} size={IconSize}/>
const ViewProblemAction = (props) => (
    <Eye
        title="View Problem" 
        onClick={props.onClick} 
        data-bs-toggle="modal" 
        data-bs-target="#solution-modal" 
        color={"rgb(0, 110, 255)"}
        size={IconSize}
    />
)
const NotesAction = (props) => (
    <FileEarmarkText
        title="View Notes" 
        disabled={props.disabled} 
        onClick={props.onClick} 
        data-bs-toggle="modal" 
        data-bs-target="#solution-modal" 
        color={"rgb(0, 110, 255)"}
        size={IconSize}
    />
);
const SolutionAction = (props) => (
    <CodeSlash
        title="View Solution" 
        disabled={props.disabled} 
        onClick={props.onClick} 
        data-bs-toggle="modal" 
        data-bs-target="#solution-modal" 
        color={"rgb(0, 110, 255)"}
        size={IconSize}
    />
);
const DeleteAction = (props) => <Trash title="Delete" color={"red"} onClick={props.onClick} size={IconSize}/>;

DataTable.StatementHeader = StatementHeader;
DataTable.DifficultyHeader = DifficultyHeader;
DataTable.StatusHeader = StatusHeader;
DataTable.ActionHeader = ActionHeader;

DataTable.StatementData = StatementData;
DataTable.DifficultyData = DifficultyData;
DataTable.StatusData = StatusData;
DataTable.ActionData = ActionData;

DataTable.MarkSolvedAction = MarkSolvedAction;
DataTable.MarkUnsolvedAction = MarkUnsolvedAction;
DataTable.MarkReviseAction = MarkReviseAction;
DataTable.FlagAction = FlagAction;
DataTable.ViewProblemAction = ViewProblemAction;
DataTable.NotesAction = NotesAction;
DataTable.SolutionAction = SolutionAction;
DataTable.DeleteAction = DeleteAction;

export default DataTable;