const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new schema({
    id: { type: String, default: shortid.generate },
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now }
})

userSchema.pre("save", async function (next) {

    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();

})


userSchema.methods.isValidPassword = async function (password) {

    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;

}

module.exports = mongoose.model("user", userSchema);
