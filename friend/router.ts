import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FriendCollection from './collection';
import * as friendValidator from './middleware';
import * as userValidator from '../user/middleware';

const router = express.Router();

/**
 * Create a new freet.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/',
  [
    friendValidator.is_valid_user_id,
    friendValidator.no_self_friending,
    friendValidator.status_valid

  ],
  async (req: Request, res: Response) => {
    console.log('got hereee');
    const UserA = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const UserB  = (req.body.UserB as string) ?? '';  
    const status = (req.body.status as string) ?? '';
    const friend = await FriendCollection.addOne(UserA, UserB, status);

    res.status(201).json({
      message: 'You are now friends!'
    });
  }
);


router.put(
  '/:friend_id?',
  [
    userValidator.isUserLoggedIn,
    friendValidator.status_valid,
  ],
  async (req: Request, res: Response) => {
    const friend = await FriendCollection.updateOne(req.params.friendID, req.body.status);
    res.status(200).json({
      message: 'Your friend status has been updated!',
    });
  }
);

export {router as friendRouter};