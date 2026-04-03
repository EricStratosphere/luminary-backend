import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: user,
            message: "Created new user!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('User does not exist!');
            throw error;
        }
        const updatedData = req.body;
        if (updatedData.username) {
            user.username = updatedData.username;
        }
        if (updatedData.email) {
            user.email = updatedData.email;
        }
        if (updatedData.password) {
            user.password = updatedData.password;
        }
        if (updatedData.is_admin !== undefined) {
            user.is_admin = updatedData.is_admin;
        }
        if (updatedData.is_writer !== undefined) {
            user.is_writer = updatedData.is_writer;
        }

        await user.save();
        return res.status(200).json({
            success: true,
            message: "User successfully updated",
            data: user
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};

export const getUsersByName = async(req, res) => {
    try{
        var result = await User.find({'username' : { "$regex" : req.params.search_text, "$options" : 'i'}});
        if(!result){
            const error = new Error("Failed to fetch users by name!");
            throw error;
        }
        return res.status(200).json(
            {
                success : true,
                data : result,
            }
        )
    }
    catch(error){
        return res.status(404).json(
            {
                success : false,
                errorMsg : error.message,
            }
        )
    }
}
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            const error = new Error('User not found!');
            throw error;
        }
        const responseJSON = {
            success: true,
            deletedData: deletedUser
        };
        res.status(200).json(responseJSON);
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};
