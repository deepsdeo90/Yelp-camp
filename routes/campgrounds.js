var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//==================	SHOW CAMPGROUND LIST 
router.get("/",function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log("Error listing")
		}else{
			res.render("./compground/campgrounds",{campgrounds:allcampgrounds})		
		}
	});
	
});
//==================	CREATE NEW CAMPGROUND LOGIC
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var img = req.body.imgurl;
	var desc = req.body.desc;
	//console.log(req.user);
	var author = {
		id: req.user._id,
		username:req.user.username
	}
	var newCampground ={name:name,price: price,image:img,description:desc,author:author};
	
	//create new campground and save to db
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log("error in adding");
		}else{
			//console.log(campground);
			res.redirect("/campgrounds");		
		}
	})
	
});

//==================	CREATE NEW CAMPGRPUND FORM
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("./compground/new");
});

//==================	CAMPGROUDN DETAIL PAGE 
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("err");
		}else{
			//console.log(foundCampground);
			res.render("./compground/show",{campground:foundCampground});
		}
	});

});
//=======================EDIT CAMPGROUND(FROM)
router.get("/:id/edit",middleware.checkCampgroundOwnerShip, function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){

			console.log(err);		
		}else{
			res.render("./compground/edit",{campground:foundCampground});
			}
		});
	
});
//======================UPDATE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
	//find and update correct campground

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			req.flash("error","Campground not found!");

			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});

});
//======================DELETE CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});
//middleware isloggedis



module.exports =router;
