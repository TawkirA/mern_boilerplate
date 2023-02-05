import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';


const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all the values');
    }

    const emailAlreadyExists = User.findOne({email});
    // console.log(emailAlreadyExists);
    // if (emailAlreadyExists) {
    //     throw new BadRequestError('Email already in use')
    // }

    const user = await User.create({name, email, password});
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({user: {name: user.name, email: user.email, lastName: user.lastName, location: user.location}, token});
}

const login =  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide all the values.");
    }

    const user = await User.findOne({ email }).select('+password');  // find user and add password in response
    if (!user) {
        throw new UnAuthenticatedError("Invalid credentials!");
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid credentials!");
    }

    const token = await user.createJWT();
    user.password = undefined;  // To remove the password from response object

    res.status(StatusCodes.OK).json({ user, token, location: user.location});
}

const updateUser = (req, res) => {
    res.send('updateUser')
}

export { register, login, updateUser }
