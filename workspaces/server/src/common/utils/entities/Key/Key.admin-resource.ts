import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import { BaseEntity as BaseOrmEntity } from "typeorm";
import EntityWithKey from "./Key.entity";

class BaseEntity extends EntityWithKey(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithKeyAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{}
	}
});

export default getResourceWithKeyAdminConfig;