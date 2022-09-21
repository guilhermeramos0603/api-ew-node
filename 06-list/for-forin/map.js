const service = require('./service')
async function main() {
    try {
        const results =  await service.getUsers('a')
        const names = results.results.map((item) => item.name)
        console.log(names)
    }
    catch (error) {
        console.log('Deu Ruim', error)
    }
}

main()