import * as AdminBroExpress from "admin-bro-expressjs";
import AdminBro from "admin-bro";
import { INestApplication } from "@nestjs/common";
import { Database, Resource } from "@admin-bro/typeorm";
import { validate } from "class-validator";
import managebleResources from "./resources";


export async function setupAdminPanel(app: INestApplication): Promise<void> {

	Resource.validate = validate;
	AdminBro.registerAdapter({ Database, Resource });

	const admin = new AdminBro({
		resources: managebleResources,
		rootPath: "/admin",

	});

	const router = AdminBroExpress.buildRouter(admin);
	app.use(admin.options.rootPath, router);
}
export default setupAdminPanel;