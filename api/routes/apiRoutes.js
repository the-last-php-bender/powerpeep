import express from 'express';
import userController from '../controllers/UserController.js';
import batteryController from '../controllers/BatteryController.js';
import reminderController from '../controllers/reminderController.js';

const router = express.Router();
router.get('/',function(req,res){
    res.send('The App is live!!')
})

router.post('/createUser', userController.createUser); 

router.get('/getStatus', batteryController.getStatus);


router.post('/reminder', reminderController.createReminder);
router.put('/reminder', reminderController.updateReminder);
router.delete('/reminder', reminderController.deleteReminder);

export default router;
