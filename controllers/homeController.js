class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('index');
    }
}

//permite que a classe homeController seja importado
module.exports = HomeController;