const { getUsers } = require('./service')

async function main() {
    try {
        const { results } = await getUsers(`a`)
        const weight = results.map(item => parseInt(item.height))
        console.log(weight)
        const total = weight.reduce((previous, next) => {
            return previous + next
        })
        console.log(total)
    }
    catch (error) {
        console.error("ERROR:", error)
    }
}
main()