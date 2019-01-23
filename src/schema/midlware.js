import jwt from 'jsonwebtoken';

module.exports = (root, args, context) => {
    if (context.req.cookies.token) {
        const decode = jwt.verify(context.req.cookies.token,context.secret)
        console.log('decode',decode)
        if(decode){return true}
        return false
    } else {
        return false
    }
}

