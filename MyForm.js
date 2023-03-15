function initMap() {
    var location = {lat:44.9727, lng:-93.23540000000003};
    map = new google.maps.Map(document.getElementById('map'), { center: location, zoom: 14,});
    new ClickEventHandler(map);
    }

    class ClickEventHandler {
    map;
    placesService;
    constructor(map) {
        this.map = map;
        this.placesService = new google.maps.places.PlacesService(map);
        this.map.addListener("click", this.handleClick.bind(this));
    } 
    handleClick(event) {
        this.getPlaceInformation(event.placeId);
    }

    getPlaceInformation(placeId) {
        const me = this;
        var location = document.getElementById("location");
        this.placesService.getDetails({ placeId: placeId }, (place, status) => {
            if (status === "OK") {
                location.value = place.formatted_address
            }
        });
    }
    }