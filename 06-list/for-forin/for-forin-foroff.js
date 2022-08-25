const service = require('./service')

async function main() {
    try {
        const result = await service.getUsers('a')
        let users = []
        console.time('for')
        for (let i = 0; i < result.results.length; i++){
            const people = result.results[i].name
            users.push(people)
        }
        console.timeEnd('for')
        console.time('forIn')
        for (let i in result.results){
            const people = result.results[i].name
            users.push(people)
        }
        console.timeEnd('forIn')
        console.time('forOf')
        for (people of result.results){
            users.push(people.name)
        }
        console.timeEnd('forOf')
        console.log(users)
    }
    catch (error) {
        console.error(`error interno`, error)
    }
}

main()