import os

base_path = "src/main/java/com/pos/pos/repository"
os.makedirs(base_path, exist_ok=True)

entities = [
    "Role", "Permission", "User", "Category", "Brand", 
    "Product", "Customer", "Supplier", "Purchase", 
    "PurchaseItem", "Sale", "SaleItem", "ReturnEntity", 
    "Inventory", "Expense", "Employee", "Notification", "Setting"
]

for entity in entities:
    filename = f"{entity}Repository.java"
    
    # Specific ID types or extra methods
    id_type = "Long"
    extra_methods = ""
    
    if entity == "User":
        extra_methods = """
    java.util.Optional<User> findByUsername(String username);
    java.util.Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);"""
    elif entity == "Role":
        extra_methods = """
    java.util.Optional<Role> findByName(String name);"""
    elif entity == "Product":
        extra_methods = """
    java.util.Optional<Product> findByBarcode(String barcode);
    java.util.Optional<Product> findBySku(String sku);
    java.util.List<Product> findByStatus(String status);"""
        
    content = f"""package com.pos.pos.repository;

import com.pos.pos.entity.{entity};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface {entity}Repository extends JpaRepository<{entity}, {id_type}> {{{extra_methods}
}}
"""
    with open(os.path.join(base_path, filename), "w") as f:
        f.write(content)

print("Repositories created successfully.")
