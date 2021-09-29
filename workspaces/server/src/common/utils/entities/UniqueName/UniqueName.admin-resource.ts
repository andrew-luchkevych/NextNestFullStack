import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import { BaseEntity as BaseOrmEntity } from "typeorm";
import EntityWithUniqueName from "./UniqueName.entity";

class BaseEntity extends EntityWithUniqueName(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithUniqueNameAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{}
	}
});

export default getResourceWithUniqueNameAdminConfig;