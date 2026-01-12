const domain = process.env.REACT_APP_DEV_APIS

// GENERAL CRUD FETCH API FUNCTIONS

async function getData(url){
    return fetch(url,{
        method:'GET',
        credentials:'include',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then(response => response.json());
}

async function postData(url, payload){
    return fetch(url,{
        method:'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(payload)
    })
    .then(response => response.json());
}

async function updateData(url, payload){
    return fetch(url,{
        method:'PUT',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(payload)
    })
    .then(response => response.json());
}

// APPLICATION SPECIFIC FUNCTIONS

async function login(payload){
    return postData(`${domain}/auth/login`,payload)
}

async function register(payload){
    return postData(`${domain}/auth/register`,payload)
}

async function logout(){
    return getData(`${domain}/auth/logout`);
}

async function getProblemsByUserId(userId){
    return getData(`${domain}/problem/get/${userId}`);
}

async function addProblemByUserId(userId, payload){
    return postData(`${domain}/problem/add/${userId}`,payload)
}

async function updateProblemById(problemId, payload){
    return updateData(`${domain}/problem/update/${problemId}`,payload)
}

async function flagProblemById(problemId, payload){
    return updateData(`${domain}/problem/flag/${problemId}`,payload)
}

async function deleteProblemById(problemId){
    return postData(`${domain}/problem/delete/${problemId}`)
}

async function addNotesByProblemId(problemId, noteArray){
    return postData(`${domain}/note/add/${problemId}`,{notes:noteArray});
}

async function updateNotesById(noteId, payload){
    return updateData(`${domain}/note/update/${noteId}`,payload);
}

async function addSolutionsByProblemId(problemId, solutionArray){
    return postData(`${domain}/solution/add/${problemId}`,{solutions:solutionArray});
}

async function updateSolutionById(solutionId, payload){
    return updateData(`${domain}/solution/update/${solutionId}`,payload);
}

async function getLeetcodeProblemSet(){
    return getData(`${domain}/problem/leetcode`)
}


export {
    login,
    register,
    logout,
    getProblemsByUserId,
    addProblemByUserId,
    updateProblemById,
    flagProblemById,
    deleteProblemById,
    addNotesByProblemId,
    updateNotesById,
    addSolutionsByProblemId,
    updateSolutionById,
    getLeetcodeProblemSet
}