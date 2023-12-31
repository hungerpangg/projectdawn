const { Router } = require("express");
const controller = require("../controllers");

const router = Router();

router.post("/signup", controller.signup_post);
router.post("/request/issueshares", controller.issueSharesRequest);
router.get("/documents", controller.getDocuments);
router.get("/tickets", controller.getTickets);
router.get("/deletetickets", controller.deleteAllTickets);
router.get("/authenticationCache", controller.sendAuthenticatedCachedDetails);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;
