import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'


export default (request, response, next) => {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ error: 'Token no provided' })
    }

    const token = authToken.split(' ')[1]

    try {
        jwt.verify(token, authConfig.secret, function(err, decoded){
            if(err) {
                throw new Error() 
            }

        request.userId = decoded.id
        })
    } catch (err) {
        return response.status(401).json({error: 'Token is invalid'})
    }

    return next()
}