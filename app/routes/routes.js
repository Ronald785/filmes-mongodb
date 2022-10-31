const { check, validationResult } = require("express-validator");
const { home, addMovie, viewMovie, updateViewMovie, updatePostMovie, deletMovie } = require("../controllers/home");

module.exports = {
    home: (app) => {
        app.get('/', (req, res) => {
            home(app, req, res);
        });
        app.get('/api/filmes', (req, res) => {
            home(app, req, res);
        });
    },
    insertMovie: (app) => {
        app.get('/api/inserirfilme', (req, res) => {
            res.render("insertMovie.ejs", { errors: {}, movie: {} });
        });

        app.post('/api/inserirfilme', 
        [
            check("name").isLength({min:5, max:100}).withMessage("Nome deve ter no mínimo 5 caractres"),   
            check("director").isLength({min:5, max:100}).withMessage("Diretor deve ter no mínimo 5 caractres"),   
            check("link").isURL().withMessage("URL da imagem deve conter um link"),   
        ],
        (req, res) => {
            console.log("[Rota salvar Filme]")
            const err = validationResult(req);
            const movie = req.body;
            if (!err.isEmpty()) {
                let errors = err.array();
                res.render('insertMovie.ejs', { movie: movie, errors: errors  });
                return;
            }
            addMovie(app, req, res);
        });
    },
    searchMovie: (app) => {
        app.get('/api/filme/:id', (req, res) => {
            viewMovie(app, req, res);
        });
    },
    editMovie: (app) => {
        app.get('/api/editar/:id', (req, res) => {
            updateViewMovie(app, req, res);
        });

        app.post('/api/editar/:id', 
        [
            check("name").isLength({min:1, max:50}).withMessage("Nome deve ter no mínimo 1 caracteres e no máximo 50"),   
            check("director").isLength({min:1, max:50}).withMessage("Diretor deve ter no mínimo 1 caracteres e no máximo 50"),   
            check("link").isURL().isLength({max:250}).withMessage("URL da imagem deve conter um link e no máximo 250 caracteres"),   
        ],
        (req, res) => {
            console.log("[Rota Editar Filme]")
            const err = validationResult(req);
            const movie = req.body;
            if (!err.isEmpty()) {
                let errors = err.array();
                res.render('editMovie.ejs', { movie: movie, errors: errors  });
                return;
            }
            updatePostMovie(app, req, res);
        });
    },
    deletMovie: (app) => {
        app.get('/api/deletar/:id', (req, res) => {
            deletMovie(app, req, res);
        });
    }
}

