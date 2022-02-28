const bcrypt = require('bcrypt')
class Bcrypt {
    static async bcrypt_pass(password) {
         const salt = await bcrypt.genSalt()
        console.log(password);
        const hashedpassword = await bcrypt.hash(password, salt)
        return hashedpassword    
    }
}

module.exports = Bcrypt
