import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from "./env.js";
import User from "../models/user.model.js";

function initializePassport(){
    passport.use(new Strategy(
    {
        clientID : CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        callbackURL : REDIRECT_URI,
        passReqToCallback : true
    },
    function(request, acceessToken, refreshToken, profile, done){
        console.log(profile);
        User.findOrCreate({googleId : profile.id, })
    }
));

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user)
    })

    return passport;
}
export default initalizePassport;