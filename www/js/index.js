var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        console.log('device ready');
        this.getDeviceInfo();
    },

    getDeviceUuid: function() {
        try {
            const machineIdSync = require('node-machine-id').machineIdSync;
            return machineIdSync({original: true});
        } catch (error) {
            console.error(error);
            return 'Could not get machine id';
        }
    },

    getDeviceInfo: function() {
        const platformId = window.cordova.platformId;
        const deviceInfo = document.getElementById('device-info');
        let uuid = null;
        if (['electron'].indexOf(platformId) >= 0) {
            // get uuid from npm package
            uuid = this.getDeviceUuid();
        } else if (device && device.uuid && ['ios', 'android'].indexOf(platformId) >= 0) {
            // get uuid from cordova-plugin-device
            uuid = device.uuid;
        } else {
            uuid = `The ${platformId} platform is not supported.`;
        }
        if (uuid) deviceInfo.innerHTML = `Device UUID: ${uuid}`;
    }
};

app.initialize();