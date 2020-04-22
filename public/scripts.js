function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

    document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")

}

function checkFields(event) {
    
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    // Verificacao de se tem espacos em branco. O trim verifica isso e da o retorno false ou true
    // (true se o campo for vazio e false se tiver conteudo)
    //console.log(!event.target["title"].value.trim())
    

    const isEmpty = valuesToCheck.find(function(value){
        
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        if(checkIfIsString && checkIfIsEmpty ) {
           return true 
            
        }

    })

    if(isEmpty) {
        event.preventDefault()
        alert("Por favor preencha todos os campos")
    }


    // for ( let value of valuesToCheck) {
    //     console.log(event.target[value].value)
    // }
    
    
    //console.log(event.target["title"].value)
}
// document
//     .querySelector("button.fat")
//     .addEventListener("click", onOff )