//importar as dependencias
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//criar o nosso servidor express
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(9000, () => console.log("A aplicação está rodando na porta 9000"))

//rotas
let lista = []


app.get('/', function (req, res) {
    return res.json(lista)
})

app.post('/adicionar', function (req, res) {
    if (!req.body.nome || req.body.nome.trim().length == 0) {
        //trim remove espaços no inicio e final de uma sting
        return res.send("Preencha o nome")
    }
    else {
        //push é um metodo que adiciona itens a um array
        lista.push({
            //id = tamanho da lista
            id: lista.length,
            //length retorna o tamanho do array
            item: req.body.nome
            //req.body retorna todos os itens que tem um body da requisição
        })
            return res.send('Sucesso Magnata')
    }
})

app.put('/atualizar/:id', function(req,res){
    const id = req.params.id

    const index = lista.findIndex(function(item){
        return item.id == id
    })

    if(!req.body.nome){
        return res.send("Erro")

    }
    else{
        lista[index].item = req.body.nome;
        return res.send("Sucesso")
    }
})

app.delete('/deletar/:id', function(req,res){
    const id = req.params.id
    
    const novaLista = lista.filter(function(item){
        return item.id != id
    })

    lista = novaLista
    res.send("Sucesso")
})

//desafio
//adicionar preço nos itens
//quando atualizar,tem que receber o preço
//criar uma rota do tipo post que aplica 10% de desconto
//em todos os itens