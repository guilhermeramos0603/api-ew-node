// 1 - PRECISO OBTER O NUMERO DE TELEFONE DE UM USUARIO A PARTIR DE UM ID
// 2 - OBTER O ENDEREÇO DO USUARIO PELO TELEFONE

function obterUsuario(callback){
    setTimeout(function(){
        return callback (null, {
            id: 1,
            none: "Marcos",
            dataNasc: new Date(),

        })
    }, 1000 )
}

function obterTelefone(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            telefone: '11990022',
            ddd: 11,
        })
    }, 2000 )
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

obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('DEU RUIM USUARIO')
        return
    }
    console.log('usuario', usuario)
    obterTelefone(usuario.id, function resolverTelefone(error, telefone){
        if(error){
            console.error('DEU RUIM TELEFONE')
            return
        }
        console.log('telefone', telefone)   
    })
    obterEndereço(usuario.id, function resolverEndereço(error, endereço){
        if(error){
            console.error('DEU RUIM ENDEREÇO')
            return
        }
        console.log('endereço', endereço)
    })

})
  
