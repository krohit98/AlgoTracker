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

async function login(email, password){
    return postData(`${domain}/auth/login`,{email,password})
}

export {
    login
}