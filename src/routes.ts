import { Router } from "express";

import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import PermissionController from "./controllers/PermissionController";
import UserACLController from "./controllers/UserACLController";
import BusinessController from "./controllers/BusinessController";
import ServiceController from "./controllers/ServiceController";
import ProfessionalController from "./controllers/ProfessionalController";
import BenefitController from "./controllers/BenefitController";
import PlanController from "./controllers/PlanController";

import { auth } from "./middleware/auth";
import { can, is } from "./middleware/permissions";
import AppointmentController from "./controllers/AppointmentController";
import CategoryController from "./controllers/CategoryController";
import RatingController from "./controllers/RatingController";
import LimitController from "./controllers/LimitController";
import ExtraController from "./controllers/ExtraController";

const routes = Router();

// LOGIN
routes.post("/login", SessionController.handle);

// USER
routes.get("/users", UserController.find);
routes.get("/user/:userId", UserController.findOneUser);
routes.post("/user", UserController.create);
routes.patch("/user/:userId/:planName", UserController.appendPlan);
routes.patch("/user/update/:userId", UserController.updateUser);
routes.delete("/user/:userId", UserController.deletePlan);

// BUSINESS
routes.post("/business/create", auth, BusinessController.create);
routes.get("/business", BusinessController.find);
routes.get("/business/:id", BusinessController.findOne);
routes.delete("/business/delete/:businessId", auth, BusinessController.delete);
routes.patch("/business", auth, BusinessController.patch);

// PROFESSIONAL
routes.post("/professional/add", auth, ProfessionalController.addToBusiness);
routes.get("/professionals", ProfessionalController.findProfessionals);

// SERVICE
routes.post("/service/create", auth, ServiceController.create);
routes.get("/services", ServiceController.find);
routes.get("/service/:serviceId", ServiceController.findOne);
routes.delete("/service/:serviceId", ServiceController.delete);

// ACL
routes.post("/role", RoleController.create); //rota que será autenticada futuramente

routes.post("/permission", PermissionController.create); //rota que será autenticada futuramente

routes.post("/users/acl", auth, UserACLController.create); //rota que será autenticada futuramente - ela adiciona permissões e regras à usuários.

routes.post("/roles/:roleId", RoleController.createRolePermission); //rota que será autenticada futuramente

// remover essas rotas depois talvez
routes.post("/product", ProductController.create);
routes.get("/products", ProductController.find);

// BENEFITS
routes.get("/benefit", BenefitController.find);
routes.post(
  "/benefit",
  auth,
  // is(["dev_plan", "plano teste"]),
  // can(["create_plan"]),
  BenefitController.create
);

routes.patch(
  "/benefit/:benefitName",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  BenefitController.patch
);

routes.delete(
  "/benefit/:benefitName",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  BenefitController.delete
);

// PLANS
routes.get("/plans", PlanController.find);
routes.post(
  "/plans",
  auth,
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.create
);

routes.patch(
  "/plans",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.patch
);

routes.delete(
  "/plans/:idPlan",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.delete
);

// Plan - Benefit

routes.patch(
  "/plans/addBenefit",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.appendBenefit
);

routes.delete(
  "/plans/:planId/:benefitId",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.deleteBenefit
);

// Plan - Limits
routes.patch(
  "/plans/addLimit",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.appendLimit
);

routes.delete(
  "/plans/:planId/:limitId",
  // is(["dev_plan"]),
  // can(["create_plan"]),
  PlanController.deleteLimit
);


// LIMITS
routes.post("/limit", auth, LimitController.create);
routes.get("/limits", LimitController.find);
routes.patch("/limit", auth, LimitController.patch);
routes.delete("/limit/:id", LimitController.delete);

// EXTRAS
routes.post("/extra", auth, ExtraController.create);
routes.get("/extra", ExtraController.find);
routes.delete("/extra/:id", ExtraController.delete);
routes.patch("/extra", ExtraController.patch);

// APPINTMENTS
routes.get("/appointments", AppointmentController.find);
routes.post("/appointment/create", auth, AppointmentController.create);
routes.patch("/appointment/:id/:status", auth, AppointmentController.patch);

// CATEGORY
routes.post("/category", auth, CategoryController.create);
routes.get("/categories", CategoryController.find);
routes.patch("/categories/services", CategoryController.appendService);
routes.delete("/category/:categoryId", auth, CategoryController.delete);

// RATING
routes.post("/rating", auth, RatingController.create);
routes.delete("/rating/:ratingId", RatingController.delete);
routes.get("/ratings", RatingController.findAll);
routes.patch("/rating/:ratingId", RatingController.patch);

export { routes };
