<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.bcbssc.beans.Crime" %>
<%@ page import="com.bcbssc.util.CrimeUtil" %>
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1">

 <title>South Carolina Crime Data</title>
 <link rel="shortcut icon" href="">
 <link rel="icon" href="">
 <link rel="stylesheet" type="text/css" media="all" href="css/bootstrap.css">
 <link rel="stylesheet" type="text/css" media="all" href="css/bootstrap-responsive.css">
 <link rel="stylesheet" type="text/css" media="all" href="css/crime.css">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
 <script type="text/javascript" charset="utf-8" src="js/bootstrap.js"></script>
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js"></script>
 <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
 <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAXtIpkW-wVrMG9KqPrPryZuvla4QD3AT0&sensor=false">
 </script>
 <script type="text/javascript" src="js/geo.js"></script>
 <script type="text/javascript" src="js/crime.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
    <nav id="navigation">
      <div class="container">
        <ul class="navlinks">
        </ul>
      </div>
    </nav>
    
    <header id="heading">
      <div class="container text-center">
        <h1>Crimes Near You</h1>
        <div style="display: table; margin: 0 auto;" class="row">
	        <div class="span2">
	          <h2 id=car>CARS</h2>
	        </div>
	        <div class="span2">
	          <h2 id=home>HOME</h2>
	        </div>
	        <div class="span2">
	          <h2 id=death>DEATH</h2>
	        </div>
        </div>
        </div>
    </header>
    
	<div id="main-content">
    	<div class="container">
        	<div class="row">
            	<div id="googleMap"></div>
            	<fieldset>
              		<label for="txt_distance">View Crimes within</label>
              		<input id="txt_distance" type="text" value="5" maxcharacters="2" /> miles.
              		<input type="button" onClick="updateRadius()" value="Update Map"/>
            	</fieldset>
          </div>
        <div class="row">
        	<div class="span4">
            	<h2>About This Map</h2>
            	<p><span style="color:#0000FF">Assault</span><br><span style="color:#014421">Robbery</span><br><span style="color:#dd0000">Murder</span><br><span style="color:#ff208c">Theft</span><br><span style="color:#c0c0c0">Other</span></p>
           	</div>
   
           	<div class="span4">
            	<h2>Civic Hackathon</h2>
             	<p>It was created as part of the national day of civic hacking.</p>
           	</div>
   
        	<div class="span4">
        		<h2>Who made this?</h2>
            	<p>Thomas Hussey, Aaron Crosman, Robert Kozura.</p>
        	</div>
        </div><!-- @end .row -->
      </div><!-- @end .container -->
    </div><!-- @end #main-content -->
    

    
    <div id="footer">
      <div class="container">
        <p><a href="http://hackforchange.org" target="_blank"><img class="hackforchangelogo" src="http://hackforchange.org/profiles/opencivic/themes/hackathon/logo.png"></a></p>
      </div>
    </div>
</body>
</html>