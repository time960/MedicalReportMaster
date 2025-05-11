const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const requireAdminAuth = (req, res, next) => {
  try{
     const token = req.cookies.jwt;
  console.log("token",token);
  if (token) {
    jwt.verify(token, "SECRET", async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "Admin is not authenticated!" };
        res.status(401).send({ AuthError });
      } else {
        const admin = await Admin.findById(decodedToken.id);
        req.Admin = admin;
        next();
      }
    });
  } else {
    let AuthError = { error: "Admin is not authenticated!" };
    res.status(401).send({ AuthError });
  }
}
catch(err){
  console.error("error")
}
};

module.exports = { requireAdminAuth };
