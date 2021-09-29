import * as React from "react"
import { ValueGroup } from "@admin-bro/design-system"

import ReferenceValue from "./referenceValue"
import { EditPropertyProps } from "admin-bro"

export default class Show extends React.PureComponent<EditPropertyProps> {
	public render() {
		const { property, record } = this.props

		return (
			<ValueGroup label={property.label}>
				<ReferenceValue
					property={property}
					record={record}
				/>
			</ValueGroup>
		)
	}
}
