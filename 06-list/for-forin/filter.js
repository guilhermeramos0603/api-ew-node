const { getUsers } = require('./service')

async function main() {
    try {
        const { results } = await getUsers(`a`)
        const familyLars = results.filter(function (item) {
            const result = item.name.toLowerCase().indexOf('lars') !== -1
            return result
        })
        const names = familyLars.map((person) => person.name)
        console.log(names)
    }
    catch (error) {
        console.error("ERROR:", error)
    }
}
main()