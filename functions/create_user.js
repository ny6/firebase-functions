const { auth } = require('firebase-admin');
const ykError = require('./error');

module.exports = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) throw ykError('Phone number is required!', 422);

    const uid = String(phone).replace(/[^\d]/g, '');
    if (!uid || uid.length !== 10) throw ykError('Invalid phone number!', 422);

    const user = await auth().createUser({ uid });

    return res.send({ status: true, data: { user } });
  } catch ({ message, code = 400 }) {
    return res.status(code).send({ status: false, message });
  }
};
