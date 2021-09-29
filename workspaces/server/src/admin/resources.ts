import { ResourceWithOptions } from "admin-bro";
import AccessoryAdminResource from "./resources/Accessory.admin-resource";
import AdditionalPriceAdminResource from "./resources/AdditionalPrice.admin-resource";
import ColorAdminResource from "./resources/Color.admin-resource"
import ColorPriceAdminResource from "./resources/ColorPrice.admin-resource";
import DetailAdminResource from "./resources/Detail.admin-resource";
import PaintingWorkAdminResource from "./resources/PaintingWork.admin-resource";
import PaintingWorkCategoryAdminResource from "./resources/PaintingWorkCategory.admin-resource";
import PartAdminResource from "./resources/Part.admin-resource";
import PartDetailAdminResource from "./resources/PartDetail.admin-resource";
import PartTypeAdminResource from "./resources/PartType.admin-resource";
import SizeAdminResource from "./resources/Size.admin-resource";
import ThicknessAdminResource from "./resources/Thickness.admin-resource";

export const managebleResources: ResourceWithOptions[] = [
	AccessoryAdminResource,
	AdditionalPriceAdminResource,
	ColorAdminResource,
	ColorPriceAdminResource,
	DetailAdminResource,
	PaintingWorkAdminResource,
	PaintingWorkCategoryAdminResource,
	PartAdminResource,
	PartDetailAdminResource,
	PartTypeAdminResource,
	SizeAdminResource,
	ThicknessAdminResource,
];

export default managebleResources;