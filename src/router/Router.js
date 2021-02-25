const Pokemon = require('../models/Pokemon');

/**
 * This class is responsible for invoking the appropriate method
 * on the appropriate model based on the results of the parsed `Request`.
 * Once the `message` and `payload` have been determined, it will return
 * a `Response` object to be sent back to the client as an HTTP response.
 */
class Router {
    constructor(request, response){
        this.request = request;
        this.response = response;
    }

    async dispatch(){
        let model = this.request.getModelName();

        let requestMethod = this.request.getRequestMethod();

        let pokemonInfo = this.request.getParameters();
        let name = pokemonInfo.body.name;
        let type = pokemonInfo.body.type;
        let id;
        
        if(pokemonInfo.header.length > 0){
           id = pokemonInfo.header[0];
        }
         
        let message;
        let pokemon = {};
        let status = 200;
        
        switch (model) {
            case 'pokemon':
                switch (requestMethod) {
                    case 'POST':
                        pokemon = await Pokemon.create(name, type);
                        message = "Pokemon created successfully!";
                        break;
                    case 'GET':
                        if(id == undefined){
                            pokemon = await Pokemon.getAll();
                        } else{
                            pokemon = id ? await Pokemon.findById(id) : await Pokemon.findAll();
                        }
                        message = "Pokemon retrieved successfully!";
                        break;
                    case 'PUT':
                        pokemon = await Pokemon.findById(id);
                        if (name) {
                            pokemon.setName(name);
                        }
                        if (type) {
                            pokemon.setType(type);
                        }
                        await pokemon.save();
                        message = "Pokemon updated successfully!";
                        break;
                    case 'DELETE':
                        pokemon = await Pokemon.findById(id);
                        await pokemon.delete();
                        message = "Pokemon deleted successfully!";
                        break;
                }
                break;
            case '':
                message = "Homepage!"
                break;
            default:
                message = "Invalid URL!";
                status = 404;
        }

        this.response.setResponse({
            statusCode: status,
            message: message,
            payload: pokemon
        });

        return this.response;
    }
}

module.exports = Router;
