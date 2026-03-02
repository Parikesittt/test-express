import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/index.js";
import { verifyPassword } from "../utils/hash.js";
import { connectDB } from "../db.js";

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                await connectDB();

                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "Invalid email or password" });
                }

                const isPasswordValid = verifyPassword(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false, { message: "Invalid email or password" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

export default passport;