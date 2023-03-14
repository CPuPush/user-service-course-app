const {RefreshToken} = require('../../../models');

module.exports = async (req, res) => {

  try {
    // cara menggunakan params ada di postman params bukan body.
    const refreshToken = req.query.refresh_token;
    const token = await RefreshToken.findOne({
      where: {
        token: refreshToken
      }
    });
  
    if(!token) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid token'
      });
    }
    return res.status(200).json({
      status: 'success',
      token
    })
  } catch (error) {
    return res.status(500).json(error);
  }
};