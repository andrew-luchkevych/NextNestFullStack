import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import EntityWithBase from "./Base.entity";
import { BaseEntity as BaseOrmEntity } from "typeorm";

class BaseEntity extends EntityWithBase(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithBaseAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{
			id: {
				isVisible: false,
			},
			updatedBy: {
				isVisible: false,
			},
			order: {
				isVisible: false,
				type: "number",
			},
		},
		sort: {
			direction: "desc",
			sortBy: <keyof BaseEntity>"updatedAt"
		}
	}
});

export default getResourceWithBaseAdminConfig;