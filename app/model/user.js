module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userSchema = new Schema({
    user: { type: String },
    password: { type: String },
    userType: { type: String },
  });

  return mongoose.model('User', userSchema, 'user');
};
