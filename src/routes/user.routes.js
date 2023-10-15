const router = require("express").Router();

const {
    adduser,
    all
} = require("../controllers/user.controller");

router.get("/", all);
router.post("/add", adduser);

module.exports = router;
