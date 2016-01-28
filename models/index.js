var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

if(process.env.NODE_ENV === "testing"){
	mongoose.connect('mongodb://localhost/Testwikistack');
}
else{
	mongoose.connect('mongodb://localhost/wikistack');
}



var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now},
	status: {type: String, enum: ['open', 'closed']},
	tags: [String],
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
})

var convert = function(title){
	if(title){
		return title.replace(/[^a-z0-9 ]/gi, "").replace(/[]/g, "_");
	}
	else{
		return Math.random().toString(36).substring(2,7);
	}
}

userSchema.statics.findOrCreate = function(userInfo){
	var self = this;
	return this.findOne({email: userInfo.email }).exec()
		.then(function(user){
			if(user === null){
				return self.create(userInfo);
			}
			else  {
				return user;
			}
		});
			
}

pageSchema.statics.findByTag = function(tag) {
	return this.find({ tags: {$elemMatch: { $eq: tag } } } ).exec();
	// return this.find({
	// 	tags: {
	// 		$in: [tag]
	// 	}
	// }).exec();
};

pageSchema.methods.findSimilar = function() {	
	return Page.find({
		tags: {
			$in: this.tags
		},
		_id: {
			$ne: this.id
		}
	}).exec();
}

pageSchema.pre('validate', function(next){
	console.log('This is the save console log');
	
	this.urlTitle = convert(this.title);
	next();
});

pageSchema.virtual('route').get(function() {
	return '/wiki/' + this.urlTitle;
});



var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	Page: Page,
	User: User
};