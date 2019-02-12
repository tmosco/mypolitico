const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        status:200,
message:"say Hello"
    });
//   res.send("Hello World");
  next();
});

module.exports = router;
