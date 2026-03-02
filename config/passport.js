import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-local";
import { User } from "../models/index.js";
import { verifyPassword } from "../utils/hash.js";
import { connectDB } from "../db.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            await connectDB();

                const user = await User.findById(payload.id);
                if (!user) {
                    return done(null, false, { message: "Invalid email or password" });
                }

                const isPasswordValid = verifyPassword(payload.password, user.password);
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