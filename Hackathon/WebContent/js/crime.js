//Check if browser supports W3C Geolocation API
//determine if the handset has client side geo location capabilities
var map;
var latitude;
var longitude;

function updateRadius() {
	var radius = document.getElementById("txt_distance").value;
	radius = radius * 1000;
	performGetRequestWithRadius(radius);
}

if(geo_position_js.init()){
   geo_position_js.getCurrentPosition(successFunction,errorFunction);
}

function successFunction(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    initializeMap();
    performGetRequest();
}

function errorFunction(position) {
    alert('Sorry this page currently requires you to tell it where you are.');
}  

function performGetRequestParams(thisLatitude, thisLongitude) {
	longitude = thisLongitude;
	latitude = thisLatitude;
	
	$.get('/Hackathon/CrimeDataServlet?latitude=' + latitude + '&longitude=' + longitude + '&radius=1000', function(data) {
		getCrimeData(data);
	}); 
}

function performGetRequest() {
	$.get('/Hackathon/CrimeDataServlet?latitude=' + latitude + '&longitude=' + longitude + '&radius=1000', function(data) {
		getCrimeData(data);
	}); 
}

function performGetRequestWithRadius(radius) {
	$.get('/Hackathon/CrimeDataServlet?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius, function(data){
		getCrimeData(data);
	});
}



function getCrimeData(data) {
	var json = JSON.parse(data);
	var carCount = 0;
	var homeCount = 0;
	var deathCount = 0;
	var closeDeathCount = 0;
	
	for(crime in json) {
		createCrime(crime, json, json[crime].location.latitude, json[crime].location.longitude);
		var distance;
		
		if(json[crime].description == 'Autobreaking' || json[crime].description == 'Larceny of Motor Vehicle') {
			distance = getDistance(json[crime].location.longitude, json[crime].location.latitude);
			if(distance <= 500) {
				carCount++;
			}
		} else if(json[crime].description == 'Burglary - Residential') {
			distance = getDistance(json[crime].location.longitude, json[crime].location.latitude);
			if(distance <= 500) {
				homeCount++;
			}
		} else if(json[crime].description == 'Murder') {
			distance = getDistance(json[crime].location.longitude, json[crime].location.latitude);
			if(distance <= 500) {
				deathCount++;
			}
		} else if(json[crime].description == 'Aggravated Assault w/ Intent to Kill') {
			distance = getDistance(json[crime].location.longitude, json[crime].location.latitude);
			if(distance <= 500) {
				closeDeathCount++;
				if(closeDeathCount%2 == 0) {
					deathCount++;
				}
			}
		}
	}
	
	if(carCount < 5) {
		document.getElementById("car").style.color = "green";
	} else if(carCount < 10) {
		document.getElementById("car").style.color = "yellow";
	} else {
		document.getElementById("car").style.color = "red";
	}
	
	if(homeCount < 5) {
		document.getElementById("home").style.color = "green";
	} else if(homeCount < 10) {
		document.getElementById("home").style.color = "yellow";
	} else {
		document.getElementById("home").style.color = "red";
	}
	
	if(deathCount < 5) {
		document.getElementById("death").style.color = "green";
	} else if(deathCount < 10) {
		document.getElementById("death").style.color = "yellow";
	} else {
		document.getElementById("death").style.color = "red";
	}
}

function getDistance(long2, lat2) {
	var diffLong = long2-longitude;
	var diffLat = lat2-latitude;
	
	return 111000*Math.abs(Math.sqrt(Math.pow(diffLong,2)+Math.pow(diffLat,2)));
}

function initializeMap()
{
var mapProp = {
  center:new google.maps.LatLng(latitude,longitude),
  zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
map=new google.maps.Map(document.getElementById("googleMap")
  ,mapProp);
  
var marker=new google.maps.Marker({
	  position:new google.maps.LatLng(latitude,longitude),
	  });

marker.setDraggable(true);
marker.setMap(map);
	
google.maps.event.addListener(marker, 'dragend', function(event) {
		performGetRequestParams(event.latLng.lat(), event.latLng.lng());
	});
	
}

function createCrime(crime, json, latitude, longitude) {
	var assaultColor = "#0000FF";
	var robberyColor = "#014421";
	var burglaryColor = "#dd0000";
	var theftColor = "#ff208c";
	var otherColor = "#c0c0c0";

	if(json[crime].type == "Assault"){
		var circle = new google.maps.Circle({
			center: new google.maps.LatLng(latitude, longitude),
			clickable:true,
			radius: 30,
			strokeColor: assaultColor,
			strokeOpacity:0.8,
			strokeWeight: 2,
			fillColor: assaultColor,
			fillOpacity: 0.4,
			map: map
		});
	} else if (json[crime].type == "Robbery") {
			new google.maps.Circle({
			center: new google.maps.LatLng(latitude, longitude),
			clickable:true,
			radius: 30,
			strokeColor: robberyColor,
			strokeOpacity:0.8,
			strokeWeight: 2,
			fillColor: robberyColor,
			fillOpacity: 0.4,
			map: map
		});
	} else if (json[crime].type == "Burglary") {
			new google.maps.Circle({
			center: new google.maps.LatLng(latitude, longitude),
			clickable:true,
			radius: 30,
			strokeColor: burglaryColor,
			strokeOpacity:0.8,
			strokeWeight: 2,
			fillColor: burglaryColor,
			fillOpacity: 0.4,
			map: map
		});
	} else if (json[crime].type == "Theft") {
			new google.maps.Circle({
			center: new google.maps.LatLng(latitude, longitude),
			clickable:true,
			radius: 30,
			strokeColor: theftColor,
			strokeOpacity:0.8,
			strokeWeight: 2,
			fillColor: theftColor,
			fillOpacity: 0.4,
			map: map
		});
	} else {
			new google.maps.Circle({
			center: new google.maps.LatLng(latitude, longitude),
			clickable:true,
			radius: 30,
			strokeColor: otherColor,
			strokeOpacity:0.8,
			strokeWeight: 2,
			fillColor: otherColor,
			fillOpacity: 0.4,
			map: map
		});
	}
}


