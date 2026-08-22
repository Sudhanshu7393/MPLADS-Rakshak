package com.mplads.rakshak.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MLClientService {

    private static final Logger log = LoggerFactory.getLogger(MLClientService.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String mlServiceUrl;

    public MLClientService(
            RestTemplateBuilder restTemplateBuilder,
            ObjectMapper objectMapper,
            @Value("${app.ml.service.url:http://127.0.0.1:8000}") String mlServiceUrl) {
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(3))
                .setReadTimeout(Duration.ofSeconds(15))
                .build();
        this.objectMapper = objectMapper;
        this.mlServiceUrl = mlServiceUrl;
    }

    public boolean isMLServiceAvailable() {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(mlServiceUrl + "/ml/health", String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.warn("ML Service unavailable at {}: {}. Falling back to internal Spring Boot Rule Engine.", mlServiceUrl, e.getMessage());
            return false;
        }
    }

    public JsonNode analyzeBatchWithML(List<Map<String, Object>> records, Map<String, Double> weights) {
        if (!isMLServiceAvailable()) {
            return null;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("records", records);
            if (weights != null) {
                requestBody.put("weights", weights);
            }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(mlServiceUrl + "/ml/analyze-all", entity, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return objectMapper.readTree(response.getBody());
            }
        } catch (Exception e) {
            log.error("Error communicating with Python ML service: {}", e.getMessage());
        }
        return null;
    }
}
