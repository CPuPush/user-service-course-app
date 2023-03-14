const {User, RefreshToken} = require('../../../models');
module.exports = async (req, res) => {
  try {
    const userIds = req.query.user_ids || [];
    const sqlOptions = {
      attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
    }

    if(userIds.length){
      // * inject filter => select id, name, email, role. profession, avatar where id in (id yang di filter)

      /*
      hasil akan seperti ini karena disini kita bermaksud menambahkan key and value pada object di sqlOptions
        {
        attributes: [ 'id', 'name', 'email', 'role', 'profession', 'avatar' ],
        where: { id: [ '5', '2' ] }
        }
      */
      sqlOptions.where = {
        id: userIds
      }
    }
    console.log(sqlOptions);
    const getUser = await User.findAll(sqlOptions)
    return res.status(200).json({
      status: 'success',
      data: getUser
    });
  } catch (error) {
    return res.status(500).json(error)
  }
};
