import React from "react";
import { Select } from "@mui/material";
import { useField } from "formik";

const SelectWrapper = ({ name, options, ...otherProps }) => {
const [field, mata] = useField(name);

const configSelect = {
...field,
...otherProps,
fullWidth: true,
variant: "outlined",
options: options.map((option) => ({ label: option, value: option })),
};

if (mata && mata.touched && mata.error) {
configSelect.error = true;
configSelect.helperText = mata.error;
}

return <Select {...configSelect}/>;
};

export default SelectWrapper;