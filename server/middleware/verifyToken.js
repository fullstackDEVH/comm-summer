import jwt from 'jsonwebtoken';

export const takeToken = (req, res, next) => { 
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) return res.status(403).json(
                {message : 'Token is not valid!',
                error : err.message
            });
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json('you are not authenticated!');
    }
}

export const takeTokenAndAuthorization = (req, res, next) => {
    // req.user.id = req.params.id : kiểm tra có đúng là user đó không
    // req.user.isAdmin là admin 
    // có thể gọi hàm takeToken ở đây rồi truyền middleware Authorization thay vì truyền 1 lúc 2 middleware takeToken và Authorization ở router
    takeToken(req, res, ()=>{
        // nếu là user hoặc admin thì được vào
        if(req.user.id = req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json('you are not allows to do that!');
        }
    })   
}

export const takeTokenAndAdmin = (req, res, next )=>{
    takeToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json('you are not allows to do that!');
        }
    });
}