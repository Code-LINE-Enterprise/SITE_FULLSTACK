const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
let homeRoute = require("./routes/homeRoute");
let voluntarioRoute = require("./routes/voluntarioRoute");
const vitrineRoute = require("./routes/vitrineRoute");
let adminRoute = require("./routes/adminRoute");
let pedidoRoute = require("./routes/pedidoRoute");
let doacaoRoute = require("./routes/doacaoRoute");
let produtoRoute = require("./routes/produtoRoute");
let eventoRoute = require("./routes/eventoRoute");
let usuarioRoute = require("./routes/usuarioRoute");
let patrimonioRoute = require("./routes/patrimoniosRoute");

const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"))
app.use(expressEjsLayout);
app.use(cookieParser());


//configura as rotas existentes no nosso sistema
app.use("/",  homeRoute);
app.use("/loja", vitrineRoute);
app.use("/voluntarios", voluntarioRoute);
app.use("/admin", adminRoute);
app.use("/pedido", pedidoRoute);
app.use("/doacao", doacaoRoute);
app.use("/produto", produtoRoute);
app.use("/evento", eventoRoute);
app.use("/usuario", usuarioRoute);
app.use("/patrimonio", patrimonioRoute);

global.CAMINHO_IMG_BROWSER = "/img/produtos/"
global.RAIZ_PROJETO = __dirname;

//inicia o nosso servidor web
app.listen(5000, function() {
    console.log("servidor web iniciado")
})