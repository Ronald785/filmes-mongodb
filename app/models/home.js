const client = require("../../config/dbConnection");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    getMovies: async () => {
        console.log(`[Model - Get All Movies]`);
        const movies = await client.db("dsw").collection("movies").find({}).toArray();
        console.log("Movies: ", movies);
        return movies;
    },
    getMovie: async (id) => {
        console.log(`[Model - Get Movie: ${id}]`);
        const movie = await client.db("dsw").collection("movies").findOne({
            _id: new ObjectId(id)
        });
        console.log("Movie: ", movie);
        return movie;
    },
    addMovie: async (data) => {
        console.log(`[Model - Add Movie]`);
        try {
            const newMovie = { 
                name: data.name, 
                director: data.director, 
                link: data.link,
                date: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`_ID novo filme: ${addedMovie.insertedId}`);
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    },
    updateMovie: async (id, data) => {
        console.log(`[Model - Update Movie: ${id}]`);
        const movie = await client.db("dsw").collection("movies").updateOne(
            { _id: new ObjectId(id) },
            {$set: {
                name: data.name, 
                director: data.director, 
                link: data.link,
                date: new Date()
                }
            }
        );
        console.log("Updated Movie: ", movie);
        return movie;
    },
    deletMovie: async (id) => {
        console.log(`[Model - Delet Movie: ${id}]`);
        const movie = await client.db("dsw").collection("movies").deleteOne({
            _id: new ObjectId(id) 
        });
        console.log("Deleted Movie: ", movie);
        return movie;
    }
}