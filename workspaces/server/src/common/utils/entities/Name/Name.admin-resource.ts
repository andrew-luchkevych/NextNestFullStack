import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import { BaseEntity as BaseOrmEntity } from "typeorm";
import EntityWithName from "./Name.entity";

class BaseEntity extends EntityWithName(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithNameAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{}
	}
});

export default getResourceWithNameAdminConfig;