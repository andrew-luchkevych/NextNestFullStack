import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import EntityWithPrice from "./Price.entity";
import { BaseEntity as BaseOrmEntity } from "typeorm";

class BaseEntity extends EntityWithPrice(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithPriceAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{
			price: {
				type: "number",
			},
		}
	}
});

export default getResourceWithPriceAdminConfig;