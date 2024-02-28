const NewToken = ()=>{
    let token = Math.random().toString(32).substring(2) + Date.now().toString(32);
    return token
}

export {
    NewToken
}