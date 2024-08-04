import { Op } from 'sequelize';
import db from '../models/index.js';
const { User, Reminder } = db;

class RemindController {
    async createReminder(req, res) {
        try {
            const { mobile_id, batteryPercentage } = req.body;

            if (!mobile_id || !batteryPercentage) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: 'mobile_id and batteryPercentage are required'
                });
            }

            const user = await User.findOne({
                where: { mobile_id: mobile_id }
            });

            if (!user) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'User not found'
                });
            }

            await Reminder.create({
                user_id: user.id,
                batteryLevel: batteryPercentage
            });

            return res.status(201).json({
                StatusCode: 201,
                message: 'Success'
            });

        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error.message
            });
        }
    }

    async getReminders(req, res) {
        try {
            const { mobile_id } = req.query;

            if (!mobile_id) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: 'mobile_id is required'
                });
            }

            const user = await User.findOne({
                where: { mobile_id: mobile_id }
            });

            if (!user) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'User not found'
                });
            }

            const reminders = await Reminder.findAll({
                where: { user_id: user.id }
            });

            return res.status(200).json(reminders);

        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error.message
            });
        }
    }

    async updateReminder(req, res) {
        try {
            const { mobile_id, batteryPercentage } = req.body;

            if (!mobile_id || !batteryPercentage) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: 'mobile_id and batteryPercentage are required'
                });
            }

            const user = await User.findOne({
                where: { mobile_id: mobile_id }
            });

            if (!user) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'User not found'
                });
            }

            const reminder = await Reminder.findOne({
                where: { user_id: user.id }
            });

            if (!reminder) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'Reminder not found'
                });
            }

            reminder.batteryLevel = batteryPercentage;
            await reminder.save();

            return res.status(200).json({
                StatusCode: 200,
                message: 'Success'
            });

        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error.message
            });
        }
    }

    async deleteReminder(req, res) {
        try {
            const { mobile_id } = req.body;

            if (!mobile_id) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: 'mobile_id is required'
                });
            }

            const user = await User.findOne({
                where: { mobile_id: mobile_id }
            });

            if (!user) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'User not found'
                });
            }

            const reminder = await Reminder.findOne({
                where: { user_id: user.id }
            });

            if (!reminder) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'Reminder not found'
                });
            }

            await reminder.destroy();

            return res.status(200).json({
                StatusCode: 200,
                message: 'Success'
            });

        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error.message
            });
        }
    }
}

export default new RemindController();
