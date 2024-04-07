import { Router } from "express";

import UserController from "./controllers/UserController";
// import SessionController from "./controllers/SessionController";
import BusinessController from "./controllers/BusinessController";
import ServiceController from "./controllers/ServiceController";
import ProfessionalController from "./controllers/ProfessionalController";
import BenefitController from "./controllers/BenefitController";
import PlanController from "./controllers/PlanController";

import { cookieGateway } from "./middleware/cookie";
import { signinHandler } from "./middleware/signinHandler";

import AppointmentController from "./controllers/AppointmentController";
import CategoryController from "./controllers/CategoryController";
import RatingController from "./controllers/RatingController";
import LimitController from "./controllers/LimitController";
import ExtraController from "./controllers/ExtraController";
import EspedientController from "./controllers/EspedientController";
import BlockingController from "./controllers/BlockingController";

const routes = Router();

// LOGIN
routes.get("/logout", cookieGateway([]));
routes.post("/login", signinHandler);

// USER
routes.get("/users", UserController.find);
routes.get("/user", UserController.findOneUser);
routes.get("/user/:userId", UserController.findOneUser);
routes.post("/user", UserController.create, cookieGateway([]));
routes.post("/user/permissions", cookieGateway([]));
routes.patch("/user/update/:userId", UserController.updateUser);
routes.patch("/user/:userId/:planName", UserController.appendPlan);
routes.delete("/user/:userId", UserController.deletePlan);

// BUSINESS
routes.post("/business/create", cookieGateway(["basic"]), BusinessController.create);
routes.get("/business", BusinessController.find);
routes.get("/business/:id", BusinessController.findOne);
routes.delete("/business/delete/:businessId", cookieGateway(["owner"]), BusinessController.delete);
routes.patch("/business", cookieGateway(["owner"]), BusinessController.patch);

// PROFESSIONAL
routes.post("/professional/add", cookieGateway(['test']), ProfessionalController.addToBusiness);
routes.get("/professionals", ProfessionalController.findProfessionals);

// SERVICE
routes.post(
  "/service/create",
  cookieGateway(["createService, owner"]),
  ServiceController.create,
);
routes.get("/services", ServiceController.find);
routes.get("/service/:serviceId", ServiceController.findOne);
routes.post("/services/many", ServiceController.findMany);
routes.delete("/service/:serviceId", ServiceController.delete);
routes.get("/services/highlight", ServiceController.findServicesHighlight);

// BENEFITS
routes.get("/benefit", BenefitController.find);
routes.post("/benefit", cookieGateway(['appAdmin']), BenefitController.create);
routes.patch("/benefit/:benefitName", cookieGateway(['appAdmin']), BenefitController.patch);
routes.delete("/benefit/:benefitName", cookieGateway(['appAdmin']), BenefitController.delete);

// PLANS
routes.get("/plans", cookieGateway(['admin', 'appAdmin']), PlanController.find);
routes.post("/plans", cookieGateway(['appAdmin']), PlanController.create);
routes.patch("/plans", cookieGateway(['appAdmin']), PlanController.patch);
routes.delete("/plans/:idPlan", cookieGateway(['appAdmin']), PlanController.delete);

// LIMITS
routes.post("/limit", cookieGateway(['appAdmin']), LimitController.create);
routes.get("/limits", LimitController.find);
routes.patch("/limit", cookieGateway(['appAdmin']), LimitController.patch);
routes.delete("/limit/:id", cookieGateway(['appAdmin']), LimitController.delete);

// Plan - Benefit

routes.patch("/plans/addBenefit", cookieGateway(['appAdmin']), PlanController.appendBenefit);
routes.delete("/plans/:planId/:benefitId", cookieGateway(['appAdmin']), PlanController.deleteBenefit);

// Plan - Limits
routes.patch("/plans/addLimit", cookieGateway(['appAdmin']), PlanController.appendLimit);
routes.delete("/plans/:planId/:limitId", cookieGateway(['appAdmin']), PlanController.deleteLimit);

// EXTRAS
routes.post("/extra", cookieGateway([]), ExtraController.create);
routes.get("/extra", ExtraController.find);
routes.delete("/extra/:id", ExtraController.delete);
routes.patch("/extra", ExtraController.patch);

// APPINTMENTS
routes.get("/appointments", AppointmentController.find);
routes.get("/appointments/user", cookieGateway([]), AppointmentController.findAppointmentsUser);
routes.post("/appointment/create", cookieGateway([]), AppointmentController.create);
routes.patch("/appointment/:id/:status", cookieGateway([]), AppointmentController.patch);

// CATEGORY
routes.post("/category", cookieGateway(['owner', 'manager', 'categoryManager', 'admin']), CategoryController.create);
routes.get("/categories", CategoryController.find);
routes.patch("/categories/services", cookieGateway(['owner', 'manager', 'categoryManager', 'admin']), CategoryController.appendService);
routes.delete("/category/:categoryId",  cookieGateway(['owner', 'manager', 'categoryManager', 'admin']), CategoryController.delete);
routes.get("/services/category", CategoryController.listServicesCategory);

// RATING
routes.post("/rating", cookieGateway(['basic']), RatingController.create);
routes.delete("/rating/:ratingId", cookieGateway(['basic']), RatingController.delete);
routes.get("/ratings", RatingController.findAll);
routes.patch("/rating/:ratingId", cookieGateway(['basic']), RatingController.patch);

// ESPEDIENT
routes.post("/espedient", cookieGateway([]), EspedientController.create);
routes.get("/expediencys/:businessId", EspedientController.find);
routes.patch(
	"/espedient/update/:espedientId/:businessId",
	cookieGateway([]),
	EspedientController.patch
);

routes.post('/blocking', BlockingController.create);
routes.get("/blockings", BlockingController.find);

export { routes };
