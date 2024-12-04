import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    dob: {

        type: String,

    },
    phone: {
        type: Number,

    },
    password: {
        type: String,

    },
    confirmpassword: {
        type: String,

    },
});
const UserModel =  mongoose.model("User", UserSchema);
export default UserModel