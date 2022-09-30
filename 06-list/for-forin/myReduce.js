const { getUsers } = require('./service')

Array.prototype.myReduce = function(callback, initialValue){
    var lastValue = typeof initialValue !== undefined ? initialValue : this[0]
    for (let i = 0; i < this.length; i++){
        lastValue = callback(lastValue, this[i], this)
    }
    return lastValue
}

async function main() {
    try {
        const { results } = await getUsers(`a`)
        const weight = results.map(item => parseInt(item.height))
        const myList = [
            ['Guilherme', 'Ramos'],
            ['Node', 'Python']
        ]
        const total = myList.myReduce((previous, next) => {
            return previous.concat(next)   
        }, [])
        .join(',')
        console.log(total)
    }
    catch (error) {
        console.error("ERROR:", error)
    }
}
main()