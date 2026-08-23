package com.mplads.rakshak.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mplads.rakshak.dto.DataImportPreviewDto;
import com.mplads.rakshak.model.DataImport;
import com.mplads.rakshak.model.Work;
import com.mplads.rakshak.repository.DataImportRepository;
import com.mplads.rakshak.repository.WorkRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DataIngestionService {

    private static final Logger log = LoggerFactory.getLogger(DataIngestionService.class);

    private final WorkRepository workRepository;
    private final DataImportRepository dataImportRepository;
    private final RiskEngineService riskEngineService;
    private final AuditService auditService;
    private final ObjectMapper objectMapper;

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    private static final List<String> SYSTEM_FIELDS = Arrays.asList(
            "workId", "recommendationId", "workName", "category", "subCategory",
            "state", "district", "constituency", "block", "village",
            "latitude", "longitude", "recommendedAmount", "sanctionedAmount",
            "expenditureAmount", "recommendationDate", "sanctionDate",
            "startDate", "expectedCompletionDate", "actualCompletionDate",
            "status", "progressPercentage", "implementingAgencyName"
    );

    public DataIngestionService(
            WorkRepository workRepository,
            DataImportRepository dataImportRepository,
            RiskEngineService riskEngineService,
            AuditService auditService,
            ObjectMapper objectMapper) {
        this.workRepository = workRepository;
        this.dataImportRepository = dataImportRepository;
        this.riskEngineService = riskEngineService;
        this.auditService = auditService;
        this.objectMapper = objectMapper;
    }

    public DataImportPreviewDto previewUploadedFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String tempFileId = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path targetFile = uploadPath.resolve(tempFileId);
        Files.copy(file.getInputStream(), targetFile);

        DataImportPreviewDto preview = new DataImportPreviewDto();
        preview.setTempFileId(tempFileId);
        preview.setFileName(file.getOriginalFilename());
        preview.setSystemFields(SYSTEM_FIELDS);

        try (Reader reader = new InputStreamReader(Files.newInputStream(targetFile), StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).setIgnoreHeaderCase(true).setTrim(true).build())) {

            List<String> headers = csvParser.getHeaderNames();
            preview.setDetectedHeaders(headers);

            List<Map<String, String>> sampleRows = new ArrayList<>();
            int count = 0;
            for (CSVRecord record : csvParser) {
                if (count < 5) {
                    Map<String, String> row = new HashMap<>();
                    for (String h : headers) {
                        row.put(h, record.isSet(h) ? record.get(h) : "");
                    }
                    sampleRows.add(row);
                }
                count++;
            }
            preview.setTotalRows(count);
            preview.setSampleRows(sampleRows);
            preview.setSuggestedColumnMappings(generateSuggestedMappings(headers));
        }

        return preview;
    }

    @Transactional
    public DataImport ingestWithMapping(String tempFileId, String fileName, String sourceType, Map<String, String> columnMappings, String userEmail) throws IOException {
        Path filePath = resolveFilePath(tempFileId);
        if (filePath == null || !Files.exists(filePath)) {
            throw new FileNotFoundException("Upload file or demo dataset not found: " + tempFileId);
        }

        DataImport dataImport = new DataImport();
        dataImport.setFileName(fileName);
        dataImport.setSourceType(sourceType != null ? sourceType : "PUBLIC DATA");
        dataImport.setImportedBy(userEmail);
        dataImport.setStatus("PROCESSING");

        int total = 0, valid = 0, warnings = 0, invalid = 0, duplicates = 0, missingCoords = 0;
        List<Work> worksToSave = new ArrayList<>();
        Set<String> seenWorkIds = new HashSet<>();

        try (Reader reader = new InputStreamReader(Files.newInputStream(filePath), StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).setIgnoreHeaderCase(true).setTrim(true).build())) {

            Map<String, String> resolvedMap = (columnMappings != null && !columnMappings.isEmpty())
                    ? columnMappings
                    : generateSuggestedMappings(csvParser.getHeaderNames());

            for (CSVRecord csvRecord : csvParser) {
                total++;
                try {
                    String workId = getMappedValue(csvRecord, resolvedMap, "workId");
                    if (workId == null || workId.trim().isEmpty()) {
                        invalid++;
                        continue;
                    }

                    if (seenWorkIds.contains(workId) || workRepository.existsByWorkId(workId)) {
                        duplicates++;
                    }
                    seenWorkIds.add(workId);

                    Work work = workRepository.findByWorkId(workId).orElseGet(Work::new);
                    work.setWorkId(workId);
                    work.setSourceType(dataImport.getSourceType());

                    work.setRecommendationId(getMappedValue(csvRecord, resolvedMap, "recommendationId"));
                    work.setWorkName(getMappedValue(csvRecord, resolvedMap, "workName"));
                    work.setCategory(getMappedValue(csvRecord, resolvedMap, "category"));
                    work.setSubCategory(getMappedValue(csvRecord, resolvedMap, "subCategory"));
                    work.setState(getMappedValue(csvRecord, resolvedMap, "state"));
                    work.setDistrict(getMappedValue(csvRecord, resolvedMap, "district"));
                    work.setConstituency(getMappedValue(csvRecord, resolvedMap, "constituency"));
                    work.setBlock(getMappedValue(csvRecord, resolvedMap, "block"));
                    work.setVillage(getMappedValue(csvRecord, resolvedMap, "village"));

                    // Coordinates
                    Double lat = parseDouble(getMappedValue(csvRecord, resolvedMap, "latitude"));
                    Double lon = parseDouble(getMappedValue(csvRecord, resolvedMap, "longitude"));
                    work.setLatitude(lat);
                    work.setLongitude(lon);
                    if (lat == null || lon == null || (lat == 0.0 && lon == 0.0)) {
                        missingCoords++;
                        warnings++;
                    }

                    // Amounts
                    work.setRecommendedAmount(parseDouble(getMappedValue(csvRecord, resolvedMap, "recommendedAmount"), 0.0));
                    work.setSanctionedAmount(parseDouble(getMappedValue(csvRecord, resolvedMap, "sanctionedAmount"), 0.0));
                    work.setExpenditureAmount(parseDouble(getMappedValue(csvRecord, resolvedMap, "expenditureAmount"), 0.0));
                    work.setRemainingAmount(work.getSanctionedAmount() - work.getExpenditureAmount());

                    // Dates
                    work.setRecommendationDate(parseDate(getMappedValue(csvRecord, resolvedMap, "recommendationDate")));
                    work.setSanctionDate(parseDate(getMappedValue(csvRecord, resolvedMap, "sanctionDate")));
                    work.setStartDate(parseDate(getMappedValue(csvRecord, resolvedMap, "startDate")));
                    work.setExpectedCompletionDate(parseDate(getMappedValue(csvRecord, resolvedMap, "expectedCompletionDate")));
                    work.setActualCompletionDate(parseDate(getMappedValue(csvRecord, resolvedMap, "actualCompletionDate")));

                    work.setStatus(getMappedValue(csvRecord, resolvedMap, "status", "Ongoing"));
                    work.setProgressPercentage(parseDouble(getMappedValue(csvRecord, resolvedMap, "progressPercentage"), 0.0));
                    work.setImplementingAgencyName(getMappedValue(csvRecord, resolvedMap, "implementingAgencyName"));

                    // Document fields
                    work.setDocumentCount(parseInt(getMappedValue(csvRecord, resolvedMap, "document_count"), 3));
                    work.setPhotoCount(parseInt(getMappedValue(csvRecord, resolvedMap, "photo_count"), 2));
                    work.setHasCompletionCertificate(parseBool(getMappedValue(csvRecord, resolvedMap, "has_completion_certificate")));

                    work.setUpdatedAt(LocalDateTime.now());
                    worksToSave.add(work);
                    valid++;
                } catch (Exception e) {
                    invalid++;
                    log.warn("Row {} skipped due to parsing error: {}", total, e.getMessage());
                }
            }
        }

        workRepository.saveAll(worksToSave);

        dataImport.setTotalRecords(total);
        dataImport.setValidRecords(valid);
        dataImport.setWarningRecords(warnings);
        dataImport.setInvalidRecords(invalid);
        dataImport.setDuplicateRecords(duplicates);
        dataImport.setMissingCoordinatesCount(missingCoords);
        dataImport.setStatus("COMPLETED");

        Map<String, Object> summary = new HashMap<>();
        summary.put("validRecords", valid);
        summary.put("warningRecords", warnings);
        summary.put("invalidRecords", invalid);
        summary.put("duplicateRecords", duplicates);
        summary.put("missingCoordinates", missingCoords);
        dataImport.setValidationSummaryJson(objectMapper.writeValueAsString(summary));

        DataImport savedImport = dataImportRepository.save(dataImport);

        // Audit Log
        auditService.logAction(userEmail, "DATA_IMPORTED", "DATA_IMPORT", String.valueOf(savedImport.getId()),
                "Imported " + valid + " MPLADS works with source mode [" + sourceType + "]");

        // Trigger ML / Rule Anomaly Analysis Pipeline
        riskEngineService.runFullAnalysis();

        return savedImport;
    }

    @Transactional
    public DataImport loadDemoDataset(String userEmail) throws IOException {
        Path demoCsv = resolveFilePath("mplads_demo_dataset.csv");
        if (demoCsv == null || !Files.exists(demoCsv)) {
            throw new FileNotFoundException("Demo dataset not found in data/demo/mplads_demo_dataset.csv or classpath.");
        }

        return ingestWithMapping(
                demoCsv.getFileName().toString(),
                "mplads_demo_dataset.csv",
                "DEMO/SYNTHETIC DATA",
                Collections.emptyMap(),
                userEmail != null ? userEmail : "demo.officer@mplads.gov.in"
        );
    }

    private Path resolveFilePath(String tempFileIdOrName) {
        if (tempFileIdOrName == null) return null;

        // 1. Direct upload path check
        Path uploadPath = Paths.get(uploadDir, tempFileIdOrName);
        if (Files.exists(uploadPath)) {
            return uploadPath;
        }

        // 2. Multi-path candidates for demo dataset
        List<Path> candidates = Arrays.asList(
                Paths.get("data/demo/mplads_demo_dataset.csv"),
                Paths.get("../data/demo/mplads_demo_dataset.csv"),
                Paths.get("backend/data/demo/mplads_demo_dataset.csv"),
                Paths.get("backend/src/main/resources/data/demo/mplads_demo_dataset.csv"),
                Paths.get("src/main/resources/data/demo/mplads_demo_dataset.csv")
        );

        for (Path p : candidates) {
            if (Files.exists(p)) {
                return p;
            }
        }

        // 3. Fallback: extract from Classpath Resource
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("data/demo/mplads_demo_dataset.csv")) {
            if (is != null) {
                Path extractDir = Paths.get(uploadDir);
                if (!Files.exists(extractDir)) {
                    Files.createDirectories(extractDir);
                }
                Path extracted = extractDir.resolve("mplads_demo_dataset_extracted.csv");
                Files.copy(is, extracted, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                return extracted;
            }
        } catch (Exception e) {
            log.warn("Could not extract classpath demo dataset: {}", e.getMessage());
        }

        return null;
    }

    private String getMappedValue(CSVRecord record, Map<String, String> mapping, String systemField) {
        return getMappedValue(record, mapping, systemField, null);
    }

    private String getMappedValue(CSVRecord record, Map<String, String> mapping, String systemField, String defaultVal) {
        if (mapping != null) {
            for (Map.Entry<String, String> entry : mapping.entrySet()) {
                if (systemField.equalsIgnoreCase(entry.getValue())) {
                    String header = entry.getKey();
                    if (record.isSet(header)) {
                        String val = record.get(header);
                        if (val != null && !val.trim().isEmpty()) {
                            return val.trim();
                        }
                    }
                }
            }
        }
        // Direct match check (exact or snake_case or cleaned)
        if (record.isSet(systemField)) {
            String val = record.get(systemField);
            if (val != null && !val.trim().isEmpty()) return val.trim();
        }
        String snake = systemField.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
        if (record.isSet(snake)) {
            String val = record.get(snake);
            if (val != null && !val.trim().isEmpty()) return val.trim();
        }
        // Check case-insensitively across record headers
        for (String h : record.getParser().getHeaderNames()) {
            String cleanH = h.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
            String cleanS = systemField.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
            if (cleanH.equals(cleanS) && record.isSet(h)) {
                String val = record.get(h);
                if (val != null && !val.trim().isEmpty()) return val.trim();
            }
        }
        return defaultVal;
    }

    private Map<String, String> generateSuggestedMappings(List<String> headers) {
        Map<String, String> map = new HashMap<>();
        for (String h : headers) {
            String clean = h.toLowerCase().replaceAll("[^a-z0-9]", "");
            if (clean.contains("workid") || clean.equals("id") || clean.contains("projectid")) map.put(h, "workId");
            else if (clean.contains("workname") || clean.contains("projectname") || clean.contains("worktitle") || clean.contains("description")) map.put(h, "workName");
            else if (clean.contains("subcategory")) map.put(h, "subCategory");
            else if (clean.contains("category") || clean.contains("sector")) map.put(h, "category");
            else if (clean.contains("district")) map.put(h, "district");
            else if (clean.contains("state")) map.put(h, "state");
            else if (clean.contains("constituency") || clean.contains("loksabha")) map.put(h, "constituency");
            else if (clean.contains("block")) map.put(h, "block");
            else if (clean.contains("village") || clean.contains("location")) map.put(h, "village");
            else if (clean.contains("lat")) map.put(h, "latitude");
            else if (clean.contains("lon") || clean.contains("lng")) map.put(h, "longitude");
            else if (clean.contains("sanctionedamount") || clean.contains("sanctioncost") || clean.contains("cost")) map.put(h, "sanctionedAmount");
            else if (clean.contains("recommendedamount") || clean.contains("estimate")) map.put(h, "recommendedAmount");
            else if (clean.contains("expenditure") || clean.contains("spent") || clean.contains("paid")) map.put(h, "expenditureAmount");
            else if (clean.contains("sanctiondate") || clean.contains("sanctionedon")) map.put(h, "sanctionDate");
            else if (clean.contains("expectedcomp") || clean.contains("targetdate") || clean.contains("duedate")) map.put(h, "expectedCompletionDate");
            else if (clean.contains("actualcomp") || clean.contains("completedon")) map.put(h, "actualCompletionDate");
            else if (clean.contains("status")) map.put(h, "status");
            else if (clean.contains("progress")) map.put(h, "progressPercentage");
            else if (clean.contains("agency") || clean.contains("implementingagency") || clean.contains("contractor")) map.put(h, "implementingAgencyName");
        }
        return map;
    }

    private Double parseDouble(String str) { return parseDouble(str, null); }
    private Double parseDouble(String str, Double defaultVal) {
        if (str == null || str.trim().isEmpty()) return defaultVal;
        try {
            return Double.parseDouble(str.replaceAll("[^0-9.-]", ""));
        } catch (Exception e) { return defaultVal; }
    }

    private Integer parseInt(String str, Integer defaultVal) {
        if (str == null || str.trim().isEmpty()) return defaultVal;
        try {
            return Integer.parseInt(str.replaceAll("[^0-9-]", ""));
        } catch (Exception e) { return defaultVal; }
    }

    private Boolean parseBool(String str) {
        if (str == null) return false;
        return "true".equalsIgnoreCase(str.trim()) || "1".equals(str.trim()) || "yes".equalsIgnoreCase(str.trim());
    }

    private LocalDate parseDate(String str) {
        if (str == null || str.trim().isEmpty()) return null;
        String clean = str.trim();
        if (clean.length() >= 10) clean = clean.substring(0, 10);
        List<String> formats = Arrays.asList("yyyy-MM-dd", "dd-MM-yyyy", "dd/MM/yyyy", "yyyy/MM/dd");
        for (String fmt : formats) {
            try {
                return LocalDate.parse(clean, DateTimeFormatter.ofPattern(fmt));
            } catch (Exception ignored) {}
        }
        return null;
    }
}
