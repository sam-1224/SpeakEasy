import express from 'express'
import { login, logout, signup,onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);

Router.post("/onboarding", protectRoute , onboard);

// TODO : implement forgot password and reset password
// TODO : implement reset password email
// TODO : implement social login (google, facebook, github, etc.)
// TODO : implement email verification

// check if user if logged in
Router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});


export default Router


// NOTE : 
//why post for logout but get for me?
// Using POST for logout is a common practice to ensure that the action is intentional and can modify server state, such as clearing session data or cookies.
// It also helps prevent CSRF attacks, as GET requests are typically used for retrieving data and should not change server state.
// POST requests are generally used for actions that change the state of the server, such as creating, updating, or deleting resources.
// In this case, logging out a user is an action that modifies the server state by clearing the user's session or authentication token, hence using POST is appropriate.
// Using GET for the "me" endpoint is appropriate because it is a read-only operation that retrieves the current user's information without modifying any server state.