import * as Yup from "yup";
import { USER_CHAR_LENGTH } from "../constants/USER.js";

const { name, email, password, country } = USER_CHAR_LENGTH;

const userSchema = {
	schema: {
		body: {
			yupSchema: Yup.object().shape({
				name: Yup.string().required("nameProperty").min(name.NAME_MIN).max(name.NAME_MAX),
				email: Yup.string()
					.required("emailProperty")
					.min(email.EMAIL_MIN)
					.max(email.EMAIL_MAX)
					.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
				password: Yup.string().required("passwordProperty").min(password.PW_MIN).max(password.PW_MAX),
				country: Yup.string().required("countryProperty").min(country.COUNTRY_MIN).max(country.COUNTRY_MAX),
			}),
		},
	},
	errorMessages: {
		nameProperty: {
			message: 'The "Name" property is required!',
		},
		emailProperty: {
			message: 'The "Email" property is required!',
		},
		passwordProperty: {
			message: 'The "Password" property is required!',
		},
		countryProperty: {
			message: 'The "Country" property is required!',
		},
	},
};

export default userSchema;
