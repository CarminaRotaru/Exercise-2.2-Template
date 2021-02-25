/**
 * This class is responsible for getting the data ready to go back to the client.
 */
class Response {
    constructor(statusCode = 200, message = "", payload = {}){
        this.statusCode = statusCode;
        this.message = message;
        this.payload = payload;
    }

    getStatusCode(){
        return this.statusCode;
    }

    getMessage(){
        return this.message;
    }

    getPayload(){
        return this.payload;
    }

    setResponse(response){
        this.statusCode = response.statusCode;
        this.message = response.message;
        this.payload = response.payload;
    }

    toString(){
        return '{"statusCode":' + this.statusCode + ',"message\":\"' + this.message + '\","payload":' + this.payLoadToString() +'}';
    }

    payLoadToString(){
        return '{\"id\":' + this.payload.id + ',\"name\":\"' + this.payload.name + '\",\"type\":\"' + this.payload.type + '\"}';
    }
}

module.exports = Response;
