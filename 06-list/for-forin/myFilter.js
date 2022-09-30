const { getUsers } = require('./service')

Array.prototype.myFilter = function(callback){
    const list = []
    for (index in this){
        const item = this[index]
        const result = callback(item, index, this)
        if(!result) continue;
        list.push(item)
    }
}

async function main() {
    try {
        const { results } = await getUsers(`a`)
        const familyLars = results.myFilter((item, index, list) => {
            console.log('index', index)
            console.log('list', list)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
        const names = familyLars.map((person) => person.name)
        console.log(names)
    }
    catch (error) {
        console.error("ERROR:", error)
    }
}
main()