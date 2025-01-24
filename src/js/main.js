import { validateIp } from "./helper";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
    const ip = ipInput.value.trim();

    if (!ip) {
        alert("IP address cannot be empty!");
        return;
    }

    if (validateIp(ip)) {
        fetch(
            `https://geo.ipify.org/api/v2/country?apiKey=at_JVBFeiYLqDz1vZNzvm31WN4r1bEhH&ipAddress=${ip}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(setInfo)
            .catch((error) => {
                console.error("Error fetching IP data:", error);
                alert("Failed to retrieve data. Please try again.");
            });
    } else {
        alert("Please enter a valid IPv4 or IPv6 address.");
    }
}

function handleKey(e) {
    if (e.key === "Enter") {
        getData();
    }
}

function setInfo(mapData) {
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${mapData.location.country}, ${mapData.location.region}`;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;
}
