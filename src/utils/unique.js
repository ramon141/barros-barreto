export function generateId (numberOfCharacters) {
    if(typeof numberOfCharacters != 'number') throw new Error('the argument must be a number');
    let allCharacters = '123456789abcdefghijklmnopqsrtuvxyzABCDEFGHIJKLMNOPQSRTUVXYZ'
    let hash = '';
    for(let i = 0; i < numberOfCharacters; i++){
        hash += allCharacters.charAt( Math.floor( Math.random() * (allCharacters.length - 1) ) );
    }
    return hash;
}