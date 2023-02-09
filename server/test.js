import 'dotenv/config'
import jwt from "jsonwebtoken";

const token = jwt.sign({
    id: '62465dfd47b45d343b2fb88c',
    isAdmin : true
}, 'JWT' ,{ expiresIn: '3d' })

console.log(token)