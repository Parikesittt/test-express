import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/index.js";
import { verifyPassword } from "../utils/hash.js";
import { connectDB } from "../db.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        console.log("PAYLOAD:", payload);
        console.log("SECRET VERIFY:", process.env.JWT_SECRET);

        try {
            const user = await User.findById(payload.id);
            console.log("USER FOUND:", user);

            if (!user) return done(null, false);

            return done(null, user);
        } catch (err) {
            console.error("JWT STRATEGY ERROR:", err);
            return done(err, false);
        }
    })
);

export default passport;