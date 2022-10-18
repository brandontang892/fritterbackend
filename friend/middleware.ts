import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';


/**
 * Below, we check whether the objectId of the User being requested exists or you
 are already friends with them
 * */

 const is_valid_user_id = async (req: Request, res: Response, next: NextFunction) => {
    if (!Types.ObjectId.isValid(req.body.UserB)){
      res.status(400).json({
        error: 'ObjectId is not valid. Please enter the objectId rather than the username.'
      })
      return;
    }
    const user = await UserCollection.findOneByUserId(req.body.UserB);
    if (!user){
      res.status(404).json({
        error: 'The user you have requested to befriend does not exist.'
      })
      return;
    }
    next();
 }

 const no_self_friending = async (req: Request, res: Response, next: NextFunction) => {
  if ((req.body.UserB as string) === (req.session.userId as string)){
    res.status(400).json({
      error: 'You cannot befriend yourself, you can only friend other users.'
    })
    return;
  }
  next();
 }

const status_valid = async (req: Request, res: Response, next: NextFunction) => {
  if (! ['FOLLOWER', 'FOLLOWING', 'BLOCKED'].includes(req.body.status)){
    res.status(400).json({
      error: 'Friend status is not valid, please select one of: FOLLOWER, FOLLOWING, or BLOCKED'
    })
    return;
  }
  next();
 }


export {
  is_valid_user_id,
  no_self_friending,
  status_valid
};