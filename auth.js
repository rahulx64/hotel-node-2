
const Person = require("./models/person"); // Importing the Person model
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;

passport.use(
  new localstrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "incorrect user name" });
      const ispasswordmatch = user.password === password ? true : false;
      if (ispasswordmatch) return done(null, user);
      else return done(null, false, { message: "incorrect password" });
    } catch (error) {
      return done(error);
    }
  })
);



module.exports=passport;
