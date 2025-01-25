export async function getAddress(ip = "8.8.8.8") {
    try {
        const response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_JVBFeiYLqDz1vZNzvm31WN4r1bEhH&ipAddress=${ip}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Parse and return JSON directly
    } catch (error) {
        console.error("Error fetching IP data:", error);
        alert(
            "Failed to retrieve data. Please check the IP address or try again."
        );
        return null;
    }
}
