import { WebSocketServer } from 'ws';
import BatteryController from '../controllers/BatteryController';
import RemindController from '../controllers/RemindController';

class WebSocketService {
    static userConnections = new Map();

    static initialize(server) {
        const wss = new WebSocketServer({ server });

        wss.on('connection', (ws) => {
            console.log('New client connected');

            ws.once('message', (message) => {
                this.registerUserConnection(ws, message);
            });

            ws.on('message', async (message) => {
                await this.handleMessage(ws, message);
            });

            ws.on('close', () => {
                this.removeUserConnection(ws);
            });
        });
    }

    static registerUserConnection(ws, message) {
        try {
            const data = JSON.parse(message);
            const { userId } = data;
            if (userId) {
                this.userConnections.set(userId, ws);
                console.log(`User ${userId} connected`);
                this.sendRemindersToUser(userId);
            } else {
                console.error('No userId provided');
                ws.close();
            }
        } catch (error) {
            console.error('Error parsing initial message:', error);
            ws.close();
        }
    }

    static async handleMessage(ws, message) {
        try {
            const data = JSON.parse(message);
            const { channel, payload } = data;

            switch (channel) {
                case 'battery':
                    await this.handleBatteryUpdate(payload);
                    break;
                case 'reminder':
                    await this.handleReminder(payload);
                    break;
                default:
                    console.log('Unknown channel:', channel);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }

    static removeUserConnection(ws) {
        this.userConnections.forEach((conn, userId) => {
            if (conn === ws) {
                this.userConnections.delete(userId);
                console.log(`User ${userId} disconnected`);
            }
        });
    }

    static async handleBatteryUpdate(payload) {
        const { userId, batteryPercentage, isCharging } = payload;
        if (userId) {
            const result = await BatteryController.updateStatus(userId, batteryPercentage, isCharging);
            console.log(result.message);
        }
    }

    static async handleReminder(payload) {
        const { userId } = payload;
        if (userId) {
            await this.sendRemindersToUser(userId);
        }
    }

    static async sendRemindersToUser(userId) {
        try {
            const reminders = await RemindController.getReminders(userId);
            const ws = this.userConnections.get(userId);
            if (ws && ws.readyState === ws.OPEN) {
                const payload = reminders.map(reminder => ({
                    batteryLevel: reminder.batteryLevel
                }));
                const message = JSON.stringify({ channel: 'reminder', payload });
                ws.send(message);
            } else {
                console.error(`User ${userId} not connected or connection is not open`);
            }
        } catch (error) {
            console.error('Error sending reminders to user:', error.message);
        }
    }
}
export default WebSocketService;
