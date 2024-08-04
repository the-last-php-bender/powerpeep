
import { Op } from 'sequelize';
import db from '../models/index.js';
const { User, Battery } = db;

class BatteryController {
 
    async updateStatus(userId, batteryPercentage, isCharging) {
        try {
            const [battery, created] = await Battery.findOrCreate({
                where: { user_id: userId },
                defaults: {
                    batteryLevel: batteryPercentage,
                    isCharging: isCharging,
                },
            });
            if (!created) {
                battery.batteryLevel = batteryPercentage;
                battery.isCharging = isCharging;
                await battery.save();
            }
            return res.status(200).json({
                StatusCode: 200,
                message: "Success."
            });
        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error
            });
        }
    }

    async getStatus(req, res) {
        try {
            const { mobile_id } = req.body; 
    
            if (!mobile_id) {
                return res.status(400).json({
                    StatusCode: 400,
                    message: 'mobile_id is required'
                });
            }
    
            const battery = await Battery.findOne({
                where: { mobile_id: mobile_id },
                include: {
                    model: User, 
                    attributes: ['email'] 
                }
            });
            if (!battery) {
                return res.status(404).json({
                    StatusCode: 404,
                    message: 'Battery status not found'
                });
            }
            return res.json(battery);
        } catch (error) {
            return res.status(500).json({
                StatusCode: 500,
                message: error.message
            });
        }
    }
    
}

export default BatteryController();
