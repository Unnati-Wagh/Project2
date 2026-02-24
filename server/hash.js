const bcrypt = require('bcrypt');
const password = 'admin123'; 

bcrypt.hash(password, 10, (err, hash) => {
    if (err) console.log(err);
    console.log("Your New Hash: ", hash);
});