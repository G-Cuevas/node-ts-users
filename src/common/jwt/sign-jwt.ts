import jwt from 'jsonwebtoken';

interface Payload {
    uid: string;
}

export const signJwt = (payload: Payload) => {

    return new Promise((resolve, reject) => {
        const secretKey = process.env.SECRETKEY || '';

        jwt.sign(payload, secretKey, {
            expiresIn: '4h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
}
