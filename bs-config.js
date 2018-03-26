module.exports = {
    "ui": {
        "port": 3101,
    },
    "files": ["Resources/Public/Css/*.css", "Resources/Public/JavaScript/*.js"],
    "server": false,
    "proxy": "http://localhost:8001",
    "port": 3100,
    "open": false,
    "cors": true,
    "notify": true,
    "scrollThrottle": 100,
    "reloadDelay": 1000
};
