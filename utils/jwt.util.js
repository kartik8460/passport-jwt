const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const KEY = "THIS_IS_A_KEY";
module.exports.issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d'

    const payload = {
        sub:_id,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, KEY, {
        expiresIn: expiresIn
    });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.validPassword = async (password, hash) => {
    var isValid = await bcrypt.compare(password, hash);
    return isValid;
}