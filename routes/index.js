var express = require("express");
var router = express.Router();
var passport = require("passport");
var User =  require("../models/user");

//==================	INDEX 
router.get("/",function(req,res){
	res.render("landing");
});

//==================	SIGNUP FORM
router.get("/register",function(req,res){
	res.render("register");
});

//==================	ADD USER 
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			//console.log(err);
			req.flash("error",err.message);

			return res.redirect("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Yelp Camp "+user.username);

			res.redirect("/campgrounds");
		})
	})
});
///==================	LOGIN FORM
router.get("/login",function(req,res){
	res.render("login");
});
//==================	LOGIN LOGIC 
router.post("/login",passport.authenticate("local",
	{
			successRedirect:"/campgrounds",
			failureRedirect:"/login"

	}),function(req,res){


});
//==================	LOGOUT
router.get("/logout",function(req,res){
	req.logout();
	//res.flash("success","You logout successfully! ");

	res.redirect("/campgrounds");
});

module.exports =router;