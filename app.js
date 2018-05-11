var express    = require("express"),
	app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride = require("method-override");
    User= require("./models/user");

var commentRoutes = require("./routes/comment");
	campgroundRoutes =require("./routes/campgrounds");
	indexRoutes =require("./routes/index");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//conect mongose
mongoose.connect("mongodb://localhost/yelp_camp_1");

//SeedDB();
//PASSPORT CONFIG
app.use(require("express-session")({
	secret:"This is message",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for every route
app.use(function(req,res,next){
	res.locals.currentUser =req.user;
	res.locals.error =req.flash("error");
	res.locals.success =req.flash("success");
	next();
});

//set up schema
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(commentRoutes);
app.listen("3000",function(){
	console.log("Server Started!!");
});