var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","Campground not found!");

			res.redirect("back");		
		}else{
				//does user owns campground
				if(foundCampground.author.id.equals(req.user._id)){
						return next();
				}else{
					res.flash("error","You dont have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to login! ");

		res.redirect("back");

	}
}

middlewareObj.checkCommentOwnerShip= function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");		
		}else{
				//does user owns campground
				if(foundComment.author.id.equals(req.user._id)){
						return next();
				}else{
					req.flash("error","You don't have permission to do that.");

					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to login! ");
		res.redirect("back");

	}
}
middlewareObj.isLoggedIn =function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to login first!");
	res.redirect("/login");
}


module.exports = middlewareObj