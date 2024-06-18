import * as data from './dal';

function getAllData(){
    let result = data.fetchAllData();
    return result;
}

function createTopic(topic){
    data.postTopic(topic);
}

export{
    getAllData,
    createTopic
}