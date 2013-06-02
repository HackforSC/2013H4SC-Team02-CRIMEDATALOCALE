package com.bcbssc.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

/**
 * Servlet implementation class CrimeDataServlet
 */
@WebServlet("/CrimeDataServlet")
public class CrimeDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CrimeDataServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
		// TODO Auto-generated method stub
	}
	
	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		String longitude = request.getParameter("longitude");
		String latitude = request.getParameter("latitude");
		String radiusString = request.getParameter("radius");
		Long radius = 0l;
		
		if(radiusString != null) {
			radius = Long.valueOf(radiusString);
		} else {
			radius = 1000l;
		}
		
		DefaultHttpClient client = new DefaultHttpClient();
		String url = "https://communities.socrata.com/resource/sc-crime.json?$where=within_circle(location," +  latitude + "," + longitude +"," + radius + ")";
		
		HttpGet method = new HttpGet(url);
		
		//System.out.println(url);
		
		try {
			HttpResponse httpResponse = client.execute(method);
			
			//Get entity
			HttpEntity entity = httpResponse.getEntity();
			
			try {
				response.getOutputStream().write(IOUtils.toByteArray(entity.getContent()));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch(Exception e) {
		} finally {
			method.releaseConnection();
		}
	}

}
