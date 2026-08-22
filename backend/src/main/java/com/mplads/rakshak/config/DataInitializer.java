package com.mplads.rakshak.config;

import com.mplads.rakshak.model.Role;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.repository.UserRepository;
import com.mplads.rakshak.repository.WorkRepository;
import com.mplads.rakshak.service.DataIngestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final WorkRepository workRepository;
    private final DataIngestionService dataIngestionService;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            WorkRepository workRepository,
            DataIngestionService dataIngestionService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.workRepository = workRepository;
        this.dataIngestionService = dataIngestionService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize Default Development / Evaluation Roles
        if (userRepository.count() == 0) {
            log.info("Initializing Development / SIH Demo User Profiles...");

            User admin = new User(
                    "admin@mplads.gov.in",
                    passwordEncoder.encode("admin123"),
                    "Central Scheme Administrator",
                    Role.ROLE_ADMIN,
                    "New Delhi",
                    "Central",
                    "Ministry of Statistics & Programme Implementation (MoSPI)"
            );
            userRepository.save(admin);

            User districtOfficer = new User(
                    "district.officer@mplads.gov.in",
                    passwordEncoder.encode("officer123"),
                    "District Planning Officer (Varanasi)",
                    Role.ROLE_DISTRICT_OFFICER,
                    "Varanasi",
                    "Uttar Pradesh",
                    "District Planning & Monitoring Cell"
            );
            userRepository.save(districtOfficer);

            User reviewOfficer = new User(
                    "review.officer@mplads.gov.in",
                    passwordEncoder.encode("review123"),
                    "Senior Scheme Review Officer",
                    Role.ROLE_REVIEW_OFFICER,
                    "Patna",
                    "Bihar",
                    "State Nodal Authority & Audit Oversight"
            );
            userRepository.save(reviewOfficer);

            log.info("Initialized 3 developer accounts.");
        }

        // Auto-seed Demo Dataset if workspace is empty
        if (workRepository.count() == 0) {
            log.info("Workspace empty. Auto-ingesting deterministic demo dataset (1,600 works)...");
            try {
                dataIngestionService.loadDemoDataset("admin@mplads.gov.in");
                log.info("Demo dataset successfully ingested and analyzed.");
            } catch (Exception e) {
                log.warn("Could not auto-ingest demo dataset on startup: {}. Can be loaded via Data page.", e.getMessage());
            }
        }
    }
}
