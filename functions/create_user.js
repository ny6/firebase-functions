const { auth } = require('firebase-admin');
const ykError = require('./error');

module.exports = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) throw ykError('Phone number is required!', 422);

    const uid = String(phone).replace(/[^\d]/g, '');
    if (!uid || uid.length !== 10) throw ykError('Invalid phone number!', 422);

    const user = await auth().createUser({ uid });
    if (!user) throw ykError('Unable to create user!', 500);

    return res.send({
      status: true,
      message: 'User registered successfully!',
      data: { phone: user.uid },
    });
  } catch (err) {
    const { code } = err;
    let { message } = err;
    let statusCode = typeof code === 'number' ? code : 500;

    if (code === 'auth/uid-already-exists') {
      message = 'Phone number already exists!';
      statusCode = 400;
    }
    return res.status(statusCode).send({ status: false, message });
  }
};
