import dotenv from "dotenv";

dotenv.config();

const weatherAPI = async (countryName) => {
	try {
		const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${countryName}&aqi=no`);

		if (!response.ok) {
			throw new Error("Couldn't fetch the data.");
		}

		const data = await response.json();
		const { name, country, localtime } = data.location;
		const {
			temp_f,
			humidity,
			condition: { text },
		} = data.current;

		const weatherPayload = {
			name: name,
			country: country,
			condition: text,
			temp_fahrenheit: temp_f,
			humidity: humidity,
			local_time: localtime,
		};

		return weatherPayload;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default weatherAPI;
