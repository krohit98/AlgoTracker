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
    return postData(`${domain}/problem/update/${problemId}`,payload)
}

async function flagProblemById(problemId, payload){
    return postData(`${domain}/problem/flag/${problemId}`,payload)
}

async function deleteProblemById(problemId){
    return postData(`${domain}/problem/delete/${problemId}`)
}

async function addTopicsByProblemId(problemId, topicArray){
    return postData(`${domain}/topic/add/${problemId}`,{topics:topicArray});
}

async function addNotesByProblemId(problemId, noteArray){
    return postData(`${domain}/note/add/${problemId}`,{notes:noteArray});
}

async function addSolutionsByProblemId(problemId, solutionArray){
    return postData(`${domain}/solution/add/${problemId}`,{solutions:solutionArray});
}

async function getLeetcodeProblemSet(){
    return postData("https://leetcode.com/graphql",`{"query":"\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList: questionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    total: totalNum\n    questions: data {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId: questionFrontendId\n      isFavor\n      paidOnly: isPaidOnly\n      status\n      title\n      titleSlug\n      topicTags {\n        name\n        id\n        slug\n      }\n      hasSolution\n      hasVideoSolution\n    }\n  }\n}\n    ","variables":{"categorySlug":"all-code-essentials","skip":0,"limit":50,"filters":{}},"operationName":"problemsetQuestionList"}`)
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
    addTopicsByProblemId,
    addNotesByProblemId,
    addSolutionsByProblemId,
    getLeetcodeProblemSet
}