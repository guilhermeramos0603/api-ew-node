// 1 - PRECISO OBTER O NUMERO DE TELEFONE DE UM USUARIO A PARTIR DE UM ID
// 2 - OBTER O ENDEREÇO DO USUARIO PELO TELEFONE

// importamos um modulo interno do nodejs
const util = require('util')

const obterEndereçoAsync = util.promisify(obterEndereço)
function obterUsuario() {
    // quando der algum problema -> rejected
    // quando der success -> resolve
    return new Promise(function resolvePromise(resolve, rejected) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: "Marcos",
                dataNasc: new Date(),
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, rejected) {
        setTimeout(function () {
            return resolve({
                userId: idUsuario,
                telefone: '11990022',
                ddd: 11,
            })
        }, 2000)
    })
}

function obterEndereço(idUsuario, callback) {

    setTimeout(function () {
        return callback(null, {
            Rua: 'Rua',
            Bairro: "Bairro",
            Numero: "numero",
            Cidade: "Cidade",
            Estado: "Estado",
            País: "Pais",
        })
    }, 2000)

}

// 1 - adicionar a palavra async na função -> automaticamente ela retornara uma promiise
main()
async function main() {
    try {
        console.time("time-promise")
        const user = await obterUsuario()
        const result = await Promise.all([
            obterTelefone(user.id),
            obterEndereçoAsync(user.id)
        ])

        console.log('Usuario: ', user)
        console.log('Telefone: ', result[0])
        console.log('Endereço: ', result[1])

        console.timeEnd("time-promise")
    } catch (error) {
        console.error('deu erro')
    }
}

