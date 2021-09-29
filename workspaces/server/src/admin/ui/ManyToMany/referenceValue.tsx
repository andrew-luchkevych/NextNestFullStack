import * as React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ButtonCSS } from "@admin-bro/design-system"

import ViewHelpers from "admin-bro/src/backend/utils/view-helpers/view-helpers"
import { RecordJSON, PropertyJSON } from "admin-bro"

interface Props {
	property: PropertyJSON;
	record: RecordJSON;
}

const StyledLink = styled<any>(Link)`
  ${ButtonCSS};
  padding-left: ${({ theme }): string => theme.space.xs};
  padding-right: ${({ theme }): string => theme.space.xs};
`;

export const ReferenceValue: React.FC<Props> = (props) => {
	const { property, record } = props;

	const h = new ViewHelpers();
	const reference = property.props.referenceId;
	const refId = record.params[property.path];
	const populated = record.populated[property.path];
	const value = (populated && populated.title) || refId;

	console.log("ReferenceValue", { property, record });

	if (!reference) {
		throw new Error(`property: "${property.path}" does not have a reference`);
	}

	if (populated && populated.recordActions.find(a => a.name === "show")) {
		const href = h.recordActionUrl({
			resourceId: reference, recordId: refId, actionName: "show",
		});
		return (
			<StyledLink variant="text" to={href}>{value}</StyledLink>
		);
	}
	return (
		<span>{value}</span>
	);
};

export default ReferenceValue;
