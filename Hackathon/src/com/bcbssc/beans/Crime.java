package com.bcbssc.beans;

public class Crime {

	public static class Location {
		private String _longitude, _latitude, _human_address;
		private Boolean _needs_recoding;
		
		public String getLongitude() {return _longitude;}
		public String getLatitude() {return _latitude;}
		public String getHuman_address() {return _human_address;}
		public Boolean getNeeds_recoding() {return _needs_recoding;}
		
		public void setLongitude(String longitude) {_longitude = longitude;}
		public void setLatitude(String latitude) {_latitude = latitude;}
		public void setHuman_address(String humanAddress) {_human_address = humanAddress;}
		public void setNeeds_recoding(Boolean needsRecoding) {_needs_recoding = needsRecoding;}
	}
	
	public static class Link {
		private String _url;
		
		public String getUrl() {return _url;}
		
		public void setUrl(String url) {_url = url;}
	}
	
		public enum CrimeType {Assault, Burglary, Robbery, Theft};
		
		private Location _location;
		private String _description;
		private Link _link;
		private CrimeType _type;
		private String _date;
		
		public Location getLocation() {return _location;}
		public String getDescription() {return _description;}
		public Link getLink() {return _link;}
		public CrimeType getType() {return _type;}
		public String getDate() {return _date;}
		
		private void setLocation(Location location) {_location = location;}
		private void setDescription(String description) {_description = description;}
		private void setLink(Link link) {_link = link;}
		private void setType(CrimeType crimeType) {_type = crimeType;}
		private void setDate(String date) {_date = date;}
		
		public String toString() {
			return "Description: " + getDescription() + ", Link: " + getLink().getUrl() + ", Type: " + getType() + ", Date: " + getDate() + ", Longitute: " + getLocation().getLongitude() + ", Latitude: " + getLocation().getLatitude() + ", Human Address: " + getLocation().getHuman_address();
		}
}
