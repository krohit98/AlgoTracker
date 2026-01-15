const { Note } = require('../models')

// get notes by problem id
const getNotesByProblemId = async (req,res) =>{
    let problemId = req.params.problemId;
    let notes = Note.findAll({where:{problemId:problemId}})
    return res.status(200).send({success:true, body:notes})
}

// add a note
const addNotesByProblemId = async (req,res) =>{

    let problemId = req.params.problemId;

    let {
        notes
    } = req.body;

    if(notes.length < 1) return res.status(404).send({success:false, body:{message:"Content not provided"}});
    
    let addedNotes = [];

    for(let note of notes){
        let newNote = await Note.create({
            problemId,
            title:note.title,
            content:note.content
        })
        addedNotes.push(newNote);
    }

    return res.status(200).send({success:true, body:addedNotes});
}

// update a problem by id
const updateNoteById = async (req,res) =>{

    let noteId = req.params.noteId;

    if(!noteId) return res.status(404).send({success:false, body:{message:"Note Id not provided"}})

    let {
        title,
        content
    } = req.body;

    console.log(title, content)

    let note = await Note.findOne({where:{id:noteId}})

    if(!note) return res.status(404).send({success:false, body:{message:"note not found"}})

    let response = await note.update({
        title,
        content
    })

    return res.status(200).send({success:true, body:response});
}

// delete a problem by id
const deleteNoteById = async (req,res) =>{
    let noteId = req.params.noteId;

    if(!noteId) return res.status(404).send({success:false, body:{message:"Note Id not provided"}})

    let note = await Note.findOne({where:{id:noteId}})

    if(!note) return res.status(404).send({success:false, body:{message:"Note not found"}})

    note.destroy();

    return res.status(200).send({success:true});
}

module.exports = {
    getNotesByProblemId,
    addNotesByProblemId,
    updateNoteById, 
    deleteNoteById
}