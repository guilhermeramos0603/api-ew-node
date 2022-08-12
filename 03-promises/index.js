// 1 - PRECISO OBTER O NUMERO DE TELEFONE DE UM USUARIO A PARTIR DE UM ID
// 2 - OBTER O ENDEREÇO DO USUARIO PELO TELEFONE

// importamos um modulo interno do nodejs
const util = require('util')

const obterEndereçoAsync = util.promisify(obterEndereço)
function obterUsuario(){
    // quando der algum problema -> rejected
    // quando der success -> resolve
    return new Promise(function resolvePromise(resolve, rejected){
        setTimeout(function(){
            return resolve ({
                id: 1,
                nome: "Marcos",
                dataNasc: new Date(),
            })
        }, 1000 )
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, rejected){
    setTimeout(function(){
        return resolve({
            userId: idUsuario,
            telefone: '11990022',
            ddd: 11,
        })
    }, 2000 )  
    })
}

function obterEndereço(idUsuario, callback){
    
    setTimeout(function(){
        return callback(null, {
            Rua: 'Rua',
            Bairro: "Bairro",
            Numero: "numero",
            Cidade: "Cidade",
            Estado: "Estado",
            País: "Pais",
        })
    }, 2000 )

}
const usuarioPromise = obterUsuario()
//para manipular o success, .then
// para erros, .catch
usuarioPromise
    .then(function(data){
        return obterTelefone(data.id)
        .then(function resolverTelefone(result){
            return {
                user: {
                    nome: data.nome,
                    id: data.id
                },
                telefone: result
            }
        })
    })
    .then(function(data){
        const endereco = obterEndereçoAsync(data.user.id)
        return endereco.then(function resolverEndereco(result){
            return {
                user: data.user,
                telefone: data.telefone,
                endereco: result
            }
        })
    })
    .then(function(data){
        console.log(`
            Nome: ${data.user.nome}
            Endereço: ${data.endereco.Rua}, ${data.endereco.Numero}
            Telefone: (${data.telefone.ddd}) ${data.telefone.telefone}
        `)
    })
    .catch(function(err){
        console.error("Failed Error", err)
    });

// const phonePromise = obterTelefone(usuarioPromise.id)

// phonePromise
//     .then(function(data){
//         console.log('dataPhone', data)
//     })
//     .catch(function(err){
//         console.error("Failed Error Phone", err)
//     })

  
