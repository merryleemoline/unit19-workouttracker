const router = require("express").Router();
const workoutsController = require("../../controllers/workoutsController");


router.route("/")
  .get(workoutsController.findAll)
  .post(workoutsController.create);

router
  .route("/:id")
  .get(workoutsController.findById)
  .put(workoutsController.update)
  .delete(workoutsController.remove);

module.exports = router;
