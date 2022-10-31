const { getMovie, getMovies, addMovie, updateMovie, deletMovie } = require("../models/home");
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required().min(1).max(50),
    director: Joi.string().required().min(1).max(50),
    link: Joi.string().required().min(1).max(250)
});

module.exports.home = async (app, req, res) => {
    console.log("[Controller Home] - Get movies");
    try {
        const movies = await getMovies();
        if(!movies) res.status(404).json(`Não existe filme cadastrado.`);
        // res.json(movies);
        res.render("home.ejs", { movies });
    }  catch (error) {
        console.log(`[Controller Home - Error Get movies]: ${error}`);
        res.status(500).json({error: error})
    }
}

module.exports.addMovie = async (app, req, res) => {
    console.log('[Controller Add Movie]');
    
    let movie = req.body;
    
    const { error, value } = schema.validate(movie);
    if(error) {
        const result = {error: error.details, msg: "Erro, filme não incluído!"}
        res.status(500).json(result);
        return
    }

    console.log(movie);
    try {
        const addedMovie =  await addMovie(movie);
        console.log("Added Movie: ", addedMovie);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({error: error});
    }
}

//View
module.exports.viewMovie = async (app, req, res) => {
    const id  = req.params.id;
    console.log(`[Controller View Movie: ${id}]`);
    try {
        const movie = await getMovie(id);
        if(!movie) res.status(404).json(`Não existe filme cadastrado com o id ${id}.`);
        res.render("show.ejs", { movie });
        // res.status(200).json(movie);
    } catch (error) {
        console.log(`[Controller Get Movie id: ${id}] Error: ${error}`);
        res.status(500).json({error: error})
    }
}

//Edit Show
module.exports.updateViewMovie = async (app, req, res) => {
    const id  = req.params.id;
    console.log(`[Controller Edit Show Movie: ${id}]`);
    try {
        const movie = await getMovie(id);
        if(!movie) res.status(404).json(`Não existe filme cadastrado com o id ${id}.`);
        res.render("editMovie.ejs", { errors: {}, movie });
        // res.status(200).json(movie);
    } catch (error) {
        console.log(`[Controller Edit Show Movie id: ${id}] Error: ${error}`);
        res.status(500).json({error: error})
    }
}

//Edit
module.exports.updatePostMovie = async (app, req, res) => {
    const id  = req.params.id;
    let movie = req.body;
    
    console.log(`[Controller Edit Post Movie: ${id}]`);
    
    const { error, value } = schema.validate(movie);
    if(error) {
        const result = {error: error.details, msg: "Erro, filme não incluído!"}
        res.status(500).json(result);
        return
    }

    try {
        const editedMovie = await updateMovie(id, movie);
        if(!editedMovie) res.status(404).json(`Não existe filme cadastrado com o id ${id}.`);
        res.redirect(`/api/filme/${id}`);
        // res.status(200).json(movie);
    } catch (error) {
        console.log(`[Controller Edit Movie id: ${id}] Error: ${error}`);
        res.status(500).json({error: error})
    }
}

//Delet
module.exports.deletMovie = async (app, req, res) => {
    const id  = req.params.id;
    console.log(`[Controller Delet Movie: ${id}]`);
    try {
        const movie = await deletMovie(id);
        if(!movie) res.status(404).json(`Não existe filme cadastrado com o id ${id}.`);
        res.redirect("/");
        // res.status(200).json(movie);
    } catch (error) {
        console.log(`[Controller Delet Movie id: ${id}] Error: ${error}`);
        res.status(500).json({error: error})
    }
}