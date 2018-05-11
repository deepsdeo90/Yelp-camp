var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var User = require("../models/user");
var middleware = require("../middleware");

//==================	COMMENTS NEW 
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		console.log(foundCampground);
			if(err){
				console.log(err);	
			}else{
				res.render("./comment/new",{campground:foundCampground});
			}
		
	});
	
});

//==================	COMMENTS ADD


router.post('/campgrounds/:id/comment', function(req, res) {
  Campground.findById(req.params.id, function(err, newcampground) {
    if (err) {
    	res.flash("error","Something went wrong!");

      res.redirect('/campgrounds');
    } else {

    	var newComment = {text:req.body.comment.text};
					
			Comment.create(newComment, function(err, addedComment) {
					addedComment.author.id = req.user._id;
		            addedComment.author.username = req.user.username;

					addedComment.save();
					
					newcampground.comments.push(addedComment);
					newcampground.save();
					//console.log("newly created comment");
					//console.log(newcampground);
					res.flash("success","Comment created successfully1");

					res.redirect('/campgrounds/' + newcampground._id);

			});

    }
  });
});
//=====================COMMENT EDIT
router.get("/campgrounds/:id/comment/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
		}else{
			res.render("./comment/edit",{campground_id:req.params.id,comment:foundComment});		
		}
	});
	
});
//=====================COMMENT UPDATE
router.put("/campgrounds/:id/comment/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	//console.log(req.params.id);
	//console.log(req.body.comment);
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			console.log("Updated comment");
			console.log(updatedComment);
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//======================DELETE COMMENT
router.delete("/campgrounds/:id/comment/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("/back");
		}else{
			res.flash("success","Comment deleted!");

			res.redirect("/campgrounds"+req.params.id);
		}
	});
});

module.exports =router;