const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // const decoded = jwt.verify(token, config.get('jwtSecret'));

    // req.user = decoded.user;
    // next();
    admin
      .auth()
      .verifyIdToken(token)
      .then(() => {
        res.status(200).send('authorized');
      })
      .catch(() => {
        res.status(403).send('Unauthorized');
      });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzUwM2UwYWVjNTJkZGZiODk2NTIxYjkxN2ZiOGUyMGMxZjMzMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYW5kcmV3IHN0eWxlcyIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLXFBU090NklwYjhVL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2x0MEhvSC10VGxnQmRnbFRHcHYxQ3B0LWNyVGcvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NvdXBlcmhlcm9lcy0zMmNlOCIsImF1ZCI6InNvdXBlcmhlcm9lcy0zMmNlOCIsImF1dGhfdGltZSI6MTYwMTgxNDgwMSwidXNlcl9pZCI6IlNvOHhJNkE5eExoeVV6Q08zUmpNcjFnQWJuUjIiLCJzdWIiOiJTbzh4STZBOXhMaHlVekNPM1JqTXIxZ0FiblIyIiwiaWF0IjoxNjAxODE0ODAxLCJleHAiOjE2MDE4MTg0MDEsImVtYWlsIjoiYW5keXN0eWxlczMwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDA1MTE2NTAwODg3MDEyMjcyIl0sImVtYWlsIjpbImFuZHlzdHlsZXMzMEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.nR4WIGTBFcyva-2W384qE7SqFkG6rTc3NpNAF295FKkac_ajOd-PMxrHeoXNpolXmTAHG9PsG1qWda11JmUsJq8LuypCuKuU9C8cLVBFoKl5bjS2zJL_kc97Aw9AL8SPBDDoEVdPKp0rdM9NZUbXVaWN-mca2BbH3oL_2ki_SHm3zNf7oBFDA3yVdE9Kkd9tR8B2TnkNoS35jVmKG1SFwtHB5ob8Bp9XdAAWichG64kbLPY0tcS24D8A9kHe2pyVXW53BMN0B0XNOfgLgjDMNCiRBhMyOr7m7HU7rNjvPjUABa675qJIbYcDnCzUOdAFFpwQUDFuEeFTEhiXBtAqkw
