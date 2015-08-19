console.log('** Setting up window.onunload listener to call beacon using img.src hack');
window.addEventListener('unload', function(event) {
    var beaconImage = window.document.createElement('img');
    beaconImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Apuleuis.jpg/1280px-Apuleuis.jpg';
});