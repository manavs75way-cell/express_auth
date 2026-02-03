
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../helper/config.helper";
import { UserModel } from "../../user/user.model";
import { ProviderType, Role } from "../../user/user.dto";

export const initPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.googleClientId,
                clientSecret: config.googleClientSecret,
                callbackURL: "/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : undefined;
                    if (!email) {
                        return done(new Error("No email found"), undefined);
                    }

                    let user = await UserModel.findOne({ email });

                    if (!user) {
                        user = await UserModel.create({
                            name: profile.displayName,
                            email,
                            googleId: profile.id,
                            role: Role.USER,
                            provider: ProviderType.GOOGLE,
                        });
                    } else if (!user.googleId) {
                        user.googleId = profile.id;
                        user.provider = ProviderType.GOOGLE; 
                        user.googleId = profile.id;
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, undefined);
                }
            }
        )
    );
};
