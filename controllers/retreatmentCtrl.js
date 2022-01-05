const Users = require("../models/userModel");
const retreatmentCtrl = {
    getTreatmentUser:  async (req,res) => {
        console.log("TEST")
        try {
            const users = await Users.find();
            const total_users = users.length;
            res.json({ total_users });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = retreatmentCtrl