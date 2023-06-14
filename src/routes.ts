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

const routes = Router();

routes.post("/login", SessionController.handle);

routes.get("/users", UserController.find);
routes.post("/user", UserController.create);
routes.patch("/user/:userId/:planName", UserController.appendPlan);
routes.delete("/user/:userId", UserController.deletePlan);

routes.post("/business/create", auth, BusinessController.create);
routes.get("/business", BusinessController.find);

routes.post("/professional/add", auth, ProfessionalController.addToBusiness);
routes.get("/professionals", ProfessionalController.findProfessionals);

routes.post("/service/create", auth, ServiceController.create);
routes.get("/services", ServiceController.find);

routes.post("/role", RoleController.create); //rota que será autenticada futuramente

routes.post("/permission", PermissionController.create); //rota que será autenticada futuramente

routes.post("/users/acl", UserACLController.create); //rota que será autenticada futuramente - ela adiciona permissões e regras à usuários.

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

export { routes };
