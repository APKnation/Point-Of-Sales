-- ============================================================
-- POS System - Sample Seed Data
-- Run this AFTER starting the application once so tables are created
-- ============================================================

-- -------------------------------------------------------
-- 1. Roles
-- -------------------------------------------------------
INSERT IGNORE INTO roles (id, name) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_MANAGER'),
(3, 'ROLE_CASHIER');

-- -------------------------------------------------------
-- 2. Users (Passwords are BCrypt encoded)
-- -------------------------------------------------------
-- admin / admin123
INSERT IGNORE INTO users (id, full_name, username, email, phone, password, is_active, created_at, updated_at) VALUES
(1, 'System Administrator', 'admin', 'admin@gmail.com', '+1234567890',
 '12341234', 1, NOW(), NOW()),

-- manager / manager123
(2, 'Manager', 'manager', 'manager@gmail.com.com', '+1234567891',
 '12341234', 1, NOW(), NOW()),

-- cashier / cashier123
(3, 'John', 'cashier', 'cashier@gmail.com', '+1234567892',
 '12341234', 1, NOW(), NOW());

-- -------------------------------------------------------
-- 3. Assign Roles to Users
-- -------------------------------------------------------
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES
(1, 1),  -- admin -> ROLE_ADMIN
(2, 2),  -- manager -> ROLE_MANAGER
(3, 3);  -- cashier -> ROLE_CASHIER

-- -------------------------------------------------------
-- 4. Categories
-- -------------------------------------------------------
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Electronics', 'Electronic devices and accessories'),
(2, 'Beverages', 'Drinks and beverages'),
(3, 'Food', 'Snacks and food items'),
(4, 'Clothing', 'Apparel and clothing'),
(5, 'Office Supplies', 'Stationery and office items');

-- -------------------------------------------------------
-- 5. Brands
-- -------------------------------------------------------
INSERT IGNORE INTO brands (id, name, description) VALUES
(1, 'Samsung', 'Samsung Electronics'),
(2, 'Apple', 'Apple Inc.'),
(3, 'Generic', 'Generic Brand'),
(4, 'Coca-Cola', 'The Coca-Cola Company'),
(5, 'Nike', 'Nike Inc.');

-- -------------------------------------------------------
-- 6. Sample Products
-- -------------------------------------------------------
INSERT IGNORE INTO products
(id, product_name, barcode, sku, category_id, brand_id, cost_price, selling_price, quantity, reorder_level, description, status, created_at, updated_at)
VALUES
(1, 'iPhone 15 Pro',      '123456789001', 'APPL-IP15P',  1, 2,  850.00,  1099.00, 20,  5,  'Apple iPhone 15 Pro 256GB',         'ACTIVE', NOW(), NOW()),
(2, 'Samsung Galaxy S24', '123456789002', 'SAMS-GS24',   1, 1,  600.00,  899.00,  15,  5,  'Samsung Galaxy S24 128GB',          'ACTIVE', NOW(), NOW()),
(3, 'Wireless Earbuds',   '123456789003', 'GNRC-WEB01',  1, 3,  12.00,   29.99,   50,  10, 'Generic Bluetooth Earbuds',         'ACTIVE', NOW(), NOW()),
(4, 'Coca-Cola 500ml',    '123456789004', 'COKE-500ML',  2, 4,  0.50,    1.50,    200, 30, 'Coca-Cola Classic 500ml Bottle',    'ACTIVE', NOW(), NOW()),
(5, 'Mineral Water 1L',   '123456789005', 'WATR-1L',     2, 3,  0.25,    0.99,    300, 50, '1 Litre Mineral Water',             'ACTIVE', NOW(), NOW()),
(6, 'Lays Chips 200g',    '123456789006', 'LAYS-200G',   3, 3,  1.00,    2.50,    100, 20, 'Lays Classic Salted Chips 200g',    'ACTIVE', NOW(), NOW()),
(7, 'Nike T-Shirt L',     '123456789007', 'NIKE-TSL',    4, 5,  10.00,   35.00,   30,  5,  'Nike Classic T-Shirt Large',        'ACTIVE', NOW(), NOW()),
(8, 'A4 Paper Ream',      '123456789008', 'OFFC-A4RM',   5, 3,  2.50,    5.99,    80,  15, '500 sheets A4 80gsm Paper',         'ACTIVE', NOW(), NOW()),
(9, 'USB-C Cable 1m',     '123456789009', 'GNRC-USBC1',  1, 3,  1.50,    8.99,    60,  10, 'USB-C to USB-A 1m charging cable',  'ACTIVE', NOW(), NOW()),
(10,'Ballpoint Pens x10', '123456789010', 'OFFC-BP10',   5, 3,  0.80,    3.49,    120, 20, 'Pack of 10 Blue Ballpoint Pens',    'ACTIVE', NOW(), NOW());

-- -------------------------------------------------------
-- 7. Sample Customers
-- -------------------------------------------------------
INSERT IGNORE INTO customers (id, customer_name, phone, email, address, loyalty_points, created_at, updated_at) VALUES
(1, 'Alice Johnson',  '+1555000001', 'alice@email.com',   '123 Maple Street, NY',      150, NOW(), NOW()),
(2, 'Bob Smith',      '+1555000002', 'bob@email.com',     '456 Oak Avenue, CA',         75, NOW(), NOW()),
(3, 'Carol Williams', '+1555000003', 'carol@email.com',   '789 Pine Road, TX',         200, NOW(), NOW()),
(4, 'David Brown',    '+1555000004', 'david@email.com',   '321 Elm Drive, FL',           0, NOW(), NOW()),
(5, 'Eva Martinez',   '+1555000005', 'eva@email.com',     '654 Cedar Lane, WA',        350, NOW(), NOW());

-- -------------------------------------------------------
-- 8. Sample Supplier
-- -------------------------------------------------------
INSERT IGNORE INTO suppliers (id, company_name, contact_person, phone, email, address, created_at, updated_at) VALUES
(1, 'TechWholesale Ltd.',  'Mark Davis',    '+1800100001', 'mark@techwholesale.com',  '1 Tech Park, Silicon Valley, CA', NOW(), NOW()),
(2, 'FoodDistributors Co.','Sarah Lee',     '+1800100002', 'sarah@fooddist.com',      '22 Food Ave, Chicago, IL',        NOW(), NOW()),
(3, 'FashionHub Inc.',     'James Wilson',  '+1800100003', 'james@fashionhub.com',    '5 Fashion Blvd, New York, NY',    NOW(), NOW());

-- -------------------------------------------------------
-- 9. Default Settings
-- -------------------------------------------------------
INSERT IGNORE INTO settings (id, store_name, logo, address, phone, email, currency, tax_percentage) VALUES
(1, 'POS Pro Store', NULL, '100 Commerce Street, Business District', '+1800POS001', 'contact@pospro.com', 'USD', 10.00);
