var fs = require("fs")


var Database = function(){
	this.library = {};
	this.cacheLib = {};
	this.history = [];
}

Database.prototype.SET = function(key, value){
	this.cacheLib[key] = value;
}

Database.prototype.UNSET = function(key){
	delete this.cacheLib[key]
}

Database.prototype.GET = function(key){
	if(this.cacheLib[key] === undefined){
		console.log(">> Output: NULL" )
	} else {
		console.log(">> Output: "+ this.cacheLib[key])
	}
}

Database.prototype.NUMEQUALTO = function(value){
	var counter = 0;
	for(key in this.cacheLib){
		if(this.cacheLib[key] === value){
			counter++
		}
	}
	console.log(">> Output: "+ counter);
}

Database.prototype.BEGIN = function(){
	this.history.push(JSON.stringify(this.cacheLib))
	for(key in this.library){
		if(this.library[key] !== this.cacheLib[key]){
			this.cacheLib[key] = this.library[key]
		}
	}
}
Database.prototype.COMMIT = function(){
	for(key in this.cacheLib){
		if(this.library[key] !== this.cacheLib[key]){
			this.library[key] = this.cacheLib[key]
		}
	}
	this.history = [];
}

Database.prototype.ROLLBACK = function(){
	if(this.history[0] !== undefined){
		this.cacheLib = JSON.parse(this.history.pop())
	} else {
		console.log(">> Output: NO TRANSACTION")
	}

}


var lol  = new Database();


var readCommands = function(callback) {
	fs.readFile("./input.txt", 'utf8', function(err, data) {
		if (err) {
			console.log('error reading URLs');
		} else {
			var command = data.toString().split("\n");
			callback(command);
		}
	});
};

var execute = function(command){
	for(var i=0; i<command.length; i++){
		console.log("Input: "+ command[i])
		var instruction = command[i].split(" ")
		if(instruction[0] === "SET"){
			lol.SET(instruction[1], instruction[2])
		} else if(instruction[0] === "UNSET"){
			lol.UNSET(instruction[1])
		} else if(instruction[0] === "NUMEQUALTO"){
			lol.NUMEQUALTO(instruction[1])
		} else if(instruction[0] === "GET"){
			lol.GET(instruction[1])
		} else if(instruction[0] === "BEGIN"){
			lol.BEGIN()
		} else if(instruction[0] === "COMMIT"){
			lol.COMMIT()
		} else if(instruction[0] === "ROLLBACK"){
			lol.ROLLBACK()
		}
	}
}


readCommands(execute)
