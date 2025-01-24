export function validateIp(ip) {
    const validateIpRegex =
        /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

    if (validateIpRegex.test(ip)) {
        return true;
    }

    alert("You have to enter a valid IP address");

    return false;
}
