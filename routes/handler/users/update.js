const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: 'string|empty:false',
      email: 'email|empty:false',
      password: 'string|min:6',
      profession: 'string|optional',
      avatar: 'string|optional'
    }
    // ! Check email first
    const validate = v.validate(req.body, schema);
    if(validate.length){
      return res.status(400).json({
        status: 'error',
        message: validate
      });
    }
    // ! check id from params
    const id = req.params.id;
    const user = await User.findByPk(id);
    if(!user){
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }

    // ! check email from body so there is no redundancy
    const email = req.body.email;
    if(email){
      // * check email from body
      const checkEmail = await User.findOne({
        where: {
          email
        }
      });
      // * mencocokkan dengan pengecekan email pada body dengan email yang di cari melalui params
      if(checkEmail && email !== user.email){
        return res.status(409).json({
          status: 'error',
          message: 'email already exist'
        })
      }
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const {
      name,
      profession,
      avatar
    } = req.body;

    await User.update({
      email,
      password,
      name,
      profession,
      avatar
    },{
      where: {
        id
      }
    });
    return res.json({
      status: 'success',
      data: {
        id: user.id,
        name,
        email,
        profession,
        avatar
      }
    })
  } catch (error) {
    return res.status(500).json(error)
  }
};