var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        console.log('device ready');
        this.getDeviceUUID();
    },

    getDeviceUUIDForElectronPlatform: function() {
        try {
            const machineIdSync = require('node-machine-id').machineIdSync;
            return machineIdSync({original: true});
        } catch (error) {
            console.error(error);
            return 'Could not get machine id';
        }
    },

    getDeviceUUID: function() {
        const platformId = window.cordova.platformId;
        const deviceInfo = document.getElementById('device-info');
        let uuid = null;
        if (platformId.includes('electron')) {
            // get uuid from npm package for electron platform
            uuid = this.getDeviceUUIDForElectronPlatform();
        } else if (device && device.uuid && ['ios', 'android'].indexOf(platformId) >= 0) {
            // get uuid from cordova-plugin-device
            uuid = device.uuid;
        } else {
            // other platforms such as browser, ...
            uuid = `The ${platformId} platform is not supported.`;
        }
        if (uuid) deviceInfo.innerHTML = `Device UUID: ${uuid}`;
    }
};

app.initialize();