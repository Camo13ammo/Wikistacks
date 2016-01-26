var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var convert = function(title){
	if(title){
		return title.replace(/[^a-z0-9 ]/gi, "").replace(/[ ]/g, "_");
	}
	else{
		return Math.random().toString(36).substring(2,7);
	}
}

var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now},
	status: {type: String, enum: ['open', 'closed']},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

//save is attaching this hook to .save() to make sure we do this first before a save.
pageSchema.pre('validate', function(next){
	console.log('This is the save console log');
	
	this.urlTitle = convert(this.title);
	next();
});

pageSchema.virtual('route').get(function() {
	return '/wiki/' + this.urlTitle;
});

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
})

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	Page: Page,
	User: User
};