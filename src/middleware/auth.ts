import jwt from 'jsonwebtoken';

export async function auth(req, res, next){
    if(req.headers.authorization === undefined){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = req.headers.authorization;
    await jwt.verify(token, process.env.SECRET_JWT, (err, token) => {
        if(err){
            console.log(err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userReq = {
            id: token.id,
        }
    })

    next();
}