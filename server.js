//usei o express pra criar e configurar o servidor
const express = require("express")
const server  = express()
const PORT = process.env.PORT || 3000
const db = require("./db")


// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saude",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729076.svg",
//         title: "Netflix",
//         category: "Suavidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729070.svg",
//         title: "Dormir",
//         category: "Suavidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
//         title: "Games",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia sint libero impedit molestias sit ducimus optio dignissimos adipisci qui! Perspiciatis, ad eveniet iure nulla soluta enim beatae necessitatibus. Ex!",
//         url: "http://www.linkedin.com/in/wefjunior/",
//     },
// ]


//console.log(server)

//configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

// configuracao do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server, 
    noCache: true, // boolean
})

//criei uma rota e capturo o pedido do cliente para responder
server.get("/", function(req, res) {
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
    
            const reversedIdeas = [...rows].reverse()

            let lastIdeas = []
            for (let idea of reversedIdeas) {
                if (lastIdeas.length <2 ) {
                    lastIdeas.push(idea)            
                }
                //console.log(lastIdeas.length == 0) 
                
            }
            
        
            return res.render("index.html", { ideas: lastIdeas })
        })

    
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas} )
    })
    
  
})

server.post("/", function(req, res) {
    //console.log(req.body)
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})
//liguei o server na porta 3000
server.listen(PORT)
