//This file is a generator example
//The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.
//Next is a method of its iterator
//Yeild is like a keyword that can hold a value
function* mainContent() {
    const context = {
        popSlices: yield,
        mostPopular: yield,
        newestSlice: yield,
        mostImproved: yield,
        pizzas: yield
    }
}

module.exports = mainContent;