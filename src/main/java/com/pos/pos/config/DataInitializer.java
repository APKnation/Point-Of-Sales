package com.pos.pos.config;

import com.pos.pos.entity.Role;
import com.pos.pos.entity.User;
import com.pos.pos.repository.RoleRepository;
import com.pos.pos.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        // ── 1. Create Roles if they don't exist ──────────────────────────────
        Role adminRole    = ensureRole("ROLE_ADMIN");
        Role managerRole  = ensureRole("ROLE_MANAGER");
        Role cashierRole  = ensureRole("ROLE_CASHIER");

        // ── 2. Create Admin user if none exists ──────────────────────────────
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setFullName("System Administrator");
            admin.setUsername("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPhone("+1234567890");
            admin.setPassword(passwordEncoder.encode("12341234"));
            admin.setActive(true);

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);
            userRepository.save(admin);

            System.out.println("========================================");
            System.out.println(" DEFAULT ADMIN CREATED");
            System.out.println(" Username : admin");
            System.out.println(" Email    : admin@gmail.com");
            System.out.println(" Password : 12341234");
            System.out.println("========================================");
        }

        // ── 3. Create Manager user if none exists ─────────────────────────────
        if (userRepository.findByUsername("manager").isEmpty()) {
            User manager = new User();
            manager.setFullName("Manager");
            manager.setUsername("manager");
            manager.setEmail("manager@gmail.com");
            manager.setPhone("+1234567891");
            manager.setPassword(passwordEncoder.encode("12341234"));
            manager.setActive(true);

            Set<Role> roles = new HashSet<>();
            roles.add(managerRole);
            manager.setRoles(roles);
            userRepository.save(manager);
        }

        // ── 4. Create Cashier user if none exists ─────────────────────────────
        if (userRepository.findByUsername("cashier").isEmpty()) {
            User cashier = new User();
            cashier.setFullName("John");
            cashier.setUsername("cashier");
            cashier.setEmail("cashier@gmail.com");
            cashier.setPhone("+1234567892");
            cashier.setPassword(passwordEncoder.encode("12341234"));
            cashier.setActive(true);

            Set<Role> roles = new HashSet<>();
            roles.add(cashierRole);
            cashier.setRoles(roles);
            userRepository.save(cashier);
        }
    }

    private Role ensureRole(String name) {
        return roleRepository.findByName(name).orElseGet(() -> {
            Role role = new Role();
            role.setName(name);
            return roleRepository.save(role);
        });
    }
}
