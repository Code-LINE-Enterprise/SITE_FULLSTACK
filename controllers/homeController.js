class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('index');
    }

    contactView(req, res){
        res.render('contact' );
    }

    coursesView(req, res){
        res.render('courses' );
    }

    eventsView(req, res){
        res.render('events');
    }

    pricingView(req, res){
        res.render('pricing');
    }
}

//permite que a classe homeController seja importado
module.exports = HomeController;