
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./Auth.service"; // Make sure path is correct

// Controller for user registration
export const register = async (c: Context) => {
  try {
    const { user, password } = await c.req.json(); // Extract both user and password from request body
    const message = await createAuthUserService(user, password); // Call the service with both user and password
    return c.json({ msg: message }, 201); // Return success message
  } catch (error: any) {
    return c.json({ error: error.message }, 400); // Return error message
  }
};


// Controller for user login
export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json(); // Get email and password from request body
    const { token, user } = await userLoginService(email, password); // Call the service to login user
    return c.json({ token, user }, 200); // Return token and user info
  } catch (error: any) {
    return c.json({ error: error.message }, 400); // Return error message
  }
};
