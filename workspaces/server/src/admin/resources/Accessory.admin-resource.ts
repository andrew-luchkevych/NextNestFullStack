import { ResourceWithOptions } from "admin-bro";
import getResourceWithBaseAdminConfig from "src/common/utils/entities/Base/Base.admin-resource";
import getResourceWithImageAdminConfig from "src/common/utils/entities/Image/Image.admin-resource";
import deepExtend from "src/common/utils/deepExtend";
import AccessoryEntity from "src/entities/Accessory/Accessory.entity";

const baseResource = getResourceWithBaseAdminConfig();
const imageResource = getResourceWithImageAdminConfig();

export const AccessoryAdminResource: ResourceWithOptions = {
	resource: AccessoryEntity,
	options: deepExtend(
		{},
		baseResource.options,
		imageResource.options,
	),
	features: [
		...(baseResource.features || []),
		...(imageResource.features || []),
	].filter(f => f),
};
export default AccessoryAdminResource;