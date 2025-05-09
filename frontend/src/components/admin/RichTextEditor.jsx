import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const RichTextEditor = ({ placeholder,change,value }) => {
	const editor = useRef(null);
	

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

	return (
		<JoditEditor
			ref={editor}
			value={value}
			config={config}
			onChange={(data) => {

				change(data)
			}}
		/>
	);
};



export default RichTextEditor;