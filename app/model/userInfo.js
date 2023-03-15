module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userInfoSchema = new Schema({
    name: { type: String },
    stuNo: { type: String },
    college: { type: String },
    teacher: { type: String },
    grade: { type: String },
    topicSelected: { type: String },
    topicCommited: { type: String },
    score: { type: Number },
    userIco: { type: String },
    userType: { type: String },
    email: { type: String }
  });

  return mongoose.model('UserInfo', userInfoSchema, 'stu');
};
