export function getThemeClass(kind) {

	const theme = localStorage.getItem('theme');
	console.log(theme);
	
	if (kind == "container") {
		return {
			light: "bg-gray-400 text-white",
			dark: "bg-gray-800 text-white",
			coffee: "bg-orange-800",
		}[theme] || "bg-gray-200";
	}	
	else if (kind == "display") {
		return {
			light: "bg-red-800 text-yellow",
			dark: "dark:bg-blue-800 dark:text-red",
			coffee: "coffee:bg-orange-800",
		}[theme] || "bg-gray-200";
	}	
	else {
		return {
			light: "bg-gray-200",
			dark: "bg-gray-800",
			coffee: "bg-orange-800",
		}[theme] || "bg-gray-200";
	}

}

