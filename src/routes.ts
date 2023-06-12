import { Router } from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import PermissionController from "./controllers/PermissionController";
import UserACLController from "./controllers/UserACLController";
import BusinessController from "./controllers/BusinessController";
import { auth } from "./middleware/auth";
import ServiceController from "./controllers/ServiceController";
import ProfessionalController from "./controllers/ProfessionalController";
import BenefitController from "./controllers/BenefitController";

const routes = Router();

routes.post("/login", SessionController.handle);

routes.post("/user", UserController.create);
routes.get("/users", UserController.find);

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
routes.post("/benefit", BenefitController.create);
routes.patch("/benefit/:name", BenefitController.patch);
routes.delete("/benefit/:name", BenefitController.delete);

export { routes };
