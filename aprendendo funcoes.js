const xicara = {
    cor: "branco",
    tamanho: 10,
    estaSujo(simNao) {
        return simNao

    }
}

console.log(xicara.estaSujo("sims"))

const cor = "preto"
const tamanho = 5
function sujo(esta) {
    console.log(esta)
}

const xicara2 = {
    cor,
    tamanho,
    sujo

}