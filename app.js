var express = require('express');  
var bodyParser=require("body-parser");
var fileUpload=require("express-fileupload");

var path=require("path");

var app = express();  

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(fileUpload());

app.get("/upload", function(req, res){
	res.render("upload");
})

app.post("/upload", function(req, res){

	if(!req.files){
		res.send("No files have been uploaded");
	} else {
		var file = req.files.file;
		var extension=path.extname(file.name);
		if(extension  !== ".png" && extension !== ".jpeg" && extension !== ".jpg"){
			res.send("Only images are allowed");
		} else {
			file.mv(__dirname + "/uploads/" + file.name, function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.send("File successfully uploaded");
					console.log(file.name);
				}
			})
		}
	}
})

app.listen(3000, function(){
	console.log("Server up and running on port 3000");
})