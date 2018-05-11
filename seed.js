var mongoose = require("mongoose"),
	Compground = require("./models/campground"),
	Comment= require("./models/comment"),
	User= require("./models/user");

var data =[
	{
		name:"Castaic Lake",
	    image:"https://www.campsitephotos.com/photo/camp/56702/feature_Castaic_Lake-f1.jpg",
	    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Chilcoot",
	    image:"https://www.campsitephotos.com/photo/camp/54599/feature_Chilao-f4.jpg",
	    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Chilao",
	    image:"https://www.campsitephotos.com/photo/camp/75976/feature_Chilcoot-f2.jpg",
	    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Caspers Wilderness Park",
	    image:"https://www.campsitephotos.com/photo/camp/37667/feature_Caspers_Wilderness-f1.jpg",
	    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];
//remove everything from database
function seedDB(){
	//remove campground
	Compground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Database removed");
					Comment.remove({},function(err){
				if(err){
					console.log(err);
				}else{
					console.log("Comment removed");
					User.remove({},function(err){
						if(err){
							console.log(err);
						}else{
							console.log("user removed");
						}
					});
				}
				//create campground
				/*data.forEach(function(rec){
					Compground.create(rec,function(ree,campground){
						if(err){
							console.log(err);
						}else{
							console.log("campground added!!");
							//create comment
							Comment.create({text:"This is comment!!",author:"Dipali"},function(err,addedComment){
								if(err){
									console.log(err);
								}else{
									campground.comments.push(addedComment);
									campground.comments.push(addedComment);
									campground.save();
									console.log("Comments added");
								}
							});
						}

					});
				});*/

	});	

}
module.exports = seedDB;