import { UserModel } from "../Model/User.js"


export const addUser = async(request, response) => {
    try {
        const exist = await UserModel.findOne({ sub: request.body.sub });

        if(exist) {
            response.status(200).json({ msg: "User already exist" });
            return;
        }

        const newUser = await new UserModel(request.body);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        return response.status(500).json(error.message)
    }
}

export const getUsers = async(request, response) => {
    try {
        const users = await UserModel.find({});
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json(error.message)
    }
}