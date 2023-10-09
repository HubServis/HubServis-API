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

const routes = Router();

routes.post("/login", SessionController.handle);

routes.get("/users", UserController.find);
routes.get("/user/:userId", UserController.findOneUser);
routes.post("/user", UserController.create);
routes.patch("/user/:userId/:planName", UserController.appendPlan);
routes.delete("/user/:userId", UserController.deletePlan);

routes.post("/business/create", auth, BusinessController.create);
routes.get("/business", BusinessController.find);
routes.get("/business/:id", BusinessController.findOne);
routes.delete("/business/delete/:businessId", auth, BusinessController.delete);
routes.patch("/business", auth, BusinessController.patch);

routes.post("/professional/add", auth, ProfessionalController.addToBusiness);
routes.get("/professionals", ProfessionalController.findProfessionals);

routes.post("/service/create", auth, ServiceController.create);
routes.get("/services", ServiceController.find);
routes.get("/service/:serviceId", ServiceController.findOne);
routes.delete("/service/:serviceId", ServiceController.delete);

routes.post("/role", RoleController.create); //rota que será autenticada futuramente

routes.post("/permission", PermissionController.create); //rota que será autenticada futuramente

routes.post("/users/acl", auth, UserACLController.create); //rota que será autenticada futuramente - ela adiciona permissões e regras à usuários.

routes.post("/roles/:roleId", RoleController.createRolePermission); //rota que será autenticada futuramente

// remover essas rotas depois talvez
routes.post("/product", ProductController.create);
routes.get("/products", ProductController.find);

routes.get("/benefit", BenefitController.find);
routes.post(
  "/benefit",
  auth,
  is(["dev_plan", "plano teste"]),
  can(["create_plan"]),
  BenefitController.create
);

routes.patch(
  "/benefit/:benefitName",
  is(["dev_plan"]),
  can(["create_plan"]),
  BenefitController.patch
);

routes.delete(
  "/benefit/:benefitName",
  is(["dev_plan"]),
  can(["create_plan"]),
  BenefitController.delete
);

routes.get("/plans", PlanController.find);
routes.post(
  "/plans",
  auth,
  is(["dev_plan"]),
  can(["create_plan"]),
  PlanController.create
);

routes.patch(
  "/plans/:planName",
  is(["dev_plan"]),
  can(["create_plan"]),
  PlanController.patch
);

routes.delete(
  "/plans/:planName",
  is(["dev_plan"]),
  can(["create_plan"]),
  PlanController.delete
);

routes.patch(
  "/plans/:planName/:benefitName",
  is(["dev_plan"]),
  can(["create_plan"]),
  PlanController.appendBenefit
);

routes.delete(
  "/plans/:planName/:benefitName",
  is(["dev_plan"]),
  can(["create_plan"]),
  PlanController.deleteBenefit
);

routes.get("/appointments", AppointmentController.find);
routes.post("/appointment/create", auth ,AppointmentController.create);
routes.patch("/appointment/:id/:status", auth, AppointmentController.patch);

routes.post("/category", auth, CategoryController.create);
routes.get("/categories", CategoryController.find);
routes.patch("/categories/services", CategoryController.appendService);
routes.delete("/category/:categoryId", auth, CategoryController.delete);

routes.post("/rating", auth, RatingController.create);
routes.delete("/rating/:ratingId", RatingController.delete);

export { routes };