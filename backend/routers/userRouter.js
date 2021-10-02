import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHadler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();


userRouter.get('/seed', expressAsyncHadler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}))

userRouter.post('/signin', expressAsyncHadler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                name: user.name,
                email: user.email,
                _id: user._id,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }

    }
    res.status(401).send({ message: 'Invalid email or password' });
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const createdUser = await user.save();

    res.send({
        name: createdUser.name,
        email: createdUser.email,
        _id: createdUser._id,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })
}))

userRouter.get('/:id', isAuth, expressAsyncHadler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        return res.send(user);
    } else {
        return res.status(404).send({ message: 'User not found' })
    }

}))


userRouter.put('/profile', isAuth, expressAsyncHadler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser._isAdmin,
            token: generateToken(updatedUser),
        })
    }
}))
export default userRouter;