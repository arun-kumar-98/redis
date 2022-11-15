const userService = require("../controller/userService");

const router = require("express").Router();

router.post("/save", userService.addUSer);
router.get("/all", userService.getAllRecord);
router.get("/get/:id", userService.getOneRecordById);
router.post("/getOne", userService.getOneRecordBasedOnField);
router.put("/updateByUsername", userService.updateRecordByUsername);
router.delete("/delete/:id", userService.deleteRecord);
module.exports = router;
