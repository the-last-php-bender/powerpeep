import { Op } from 'sequelize';
import db from '../models/index.js';
import User from "../models/User.js";
class UserController {

    async create(req, res) {
        try {
            const {email } = req.body;
            if (!email) {
                return res.status(422).json({
                    StatusCode: 422,
                    message: "Email is required."
                });
            }
            const emailChecker = await User.findOne({
                where: { email:email}
            });
    
            if (emailChecker) {
                return res.status(409).json({
                    StatusCode: 409,
                    message: "Email already exist"
                });
            }
            const user = await User.create({
                email:email
            });
            if (user) {
              return   res.status(201).json({
                    StatusCode: 201,
                    message: "Email registered.",
                    data: profile
                });
            }
        } catch (error) {
            console.error('Error saving Email:', error);
           return  res.status(500).json({
                StatusCode: 500,
                message: "Server Error: " + error.message
            });
        }
    }
    
}
export default new UserController();
