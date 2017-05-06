var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var bcrypt = require('bcrypt');
/*var userSchema = config.Schema({
	local: {
		username: String,
		password: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
*/
module.exports = function(sequelize, DataTypes) {
	var userSchema = sequelize.define("userSchema", {
		id: DataTypes.STRING,
		token: DataTypes.STRING,
		email: DataTypes.STRING,
		name: DataTypes.STRING
	});
	return userSchema;
}