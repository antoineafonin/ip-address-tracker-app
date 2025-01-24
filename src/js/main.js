import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { validateIp } from "./helper";
import icon from "../../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [15, 40],
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
    const ip = ipInput.value.trim();

    if (!ip) {
        alert("IP address cannot be empty!");
        return;
    }

    if (validateIp(ip)) {
        fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_JVBFeiYLqDz1vZNzvm31WN4r1bEhH&ipAddress=${ip}`
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
                alert(
                    "Failed to retrieve data. Please check the IP address or try again."
                );
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
    locationInfo.innerText = `${mapData.location.city}, ${mapData.location.country}`;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;

    const { lat, lng } = mapData.location;
    map.setView([lat, lng], 13);

    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    }
}
