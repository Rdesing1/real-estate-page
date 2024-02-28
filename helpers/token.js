const NewToken = ()=>{
    let token = Math.random().toString(30).substring(2) + Date.now().toString();
    return token
}

export {
    NewToken
}