
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  });
}


export const deleteUser = async (req, res,next) => {
  if(req.user.id !== req.params.id )
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
}