package com.bcbssc.util;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bcbssc.beans.Crime;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


public class CrimeUtil {

	public static List<Crime> jsonToBeans(String json) {
		return jsonToBeans(new ByteArrayInputStream(json.getBytes()));
	}
	
	public static List<Crime> jsonToBeans(InputStream inputStream) {
		ObjectMapper mapper = new ObjectMapper();
		List<Crime> result = null;
		
		try {
			result = mapper.readValue(inputStream, new TypeReference<List<Crime>>() { });
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public static Map<String, Map<String, Crime>> jsonToMap(InputStream inputStream) {
		Map<String, Map<String, Crime>> map = new HashMap<String, Map<String, Crime>>();
		
		List<Crime> crimes = jsonToBeans(inputStream);
		
		for(Crime crime : crimes) {
			Map<String, Crime> latitudeMap = new HashMap<String, Crime>();
			latitudeMap.put(crime.getLocation().getLongitude(), crime);
			map.put(crime.getLocation().getLatitude(), latitudeMap);
		}
		
		return map;
	}
	
	public static void main(String[] args) {
		try {
			FileInputStream fis = new FileInputStream("test.txt");
			System.out.println(jsonToBeans(fis));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
