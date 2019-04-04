function* itrObject() {
    //obj is what we are trying to pass into the function itself

    //An in function can iterate though a function
    for (const key in obj) {
        //checking for extra properties
        if (obj.hasOwnProperty(key)) { //Has own property returns true if has its own property (Prototype)
            yield {
                key,
                val: obj[key] //Only going to yeild if, passes back false
            }
        };
    }
}

module.exports = itrObject;