const {User} = require('../../../models');
module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'profession', 'avatar']
    });
    if(!user){
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    return res.status(500).json(error)
  }
};