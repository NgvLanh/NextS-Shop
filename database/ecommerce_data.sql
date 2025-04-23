-- ROLES
INSERT INTO roles (name) VALUES
('admin'),
('client'),

-- USERS
INSERT INTO users (email, encrypted_password, full_name, phone, avatar_url, role_id) VALUES
('user1@example.com', 'hashedpwd1', 'Alice Nguyễn', '0901234567', NULL, 1),
('user2@example.com', 'hashedpwd2', 'Bob Trần', '0912345678', NULL, 2),
('user3@example.com', 'hashedpwd3', 'Charlie Phạm', '0923456789', NULL, 2),
('user4@example.com', 'hashedpwd4', 'David Lê', '0934567890', NULL, 2),
('user5@example.com', 'hashedpwd5', 'Emma Hồ', '0945678901', NULL, 2),
('user6@example.com', 'hashedpwd6', 'Fiona Vũ', '0956789012', NULL, 2),
('user7@example.com', 'hashedpwd7', 'George Đặng', '0967890123', NULL, 2),
('user8@example.com', 'hashedpwd8', 'Hannah Bùi', '0978901234', NULL, 2),
('user9@example.com', 'hashedpwd9', 'Ian Trịnh', '0989012345', NULL, 2),
('user10@example.com', 'hashedpwd10', 'Jane Dương', '0990123456', NULL, 2);

-- USER ADDRESSES
INSERT INTO addresses (user_id, recipient, phone, address) VALUES
(1, 'Alice Nguyễn', '0901234567', '{"street": "123 Lê Lợi", "city": "Hà Nội", "district": "Ba Đình", "ward": "Phúc Xá", "postal_code": "100000"}'),
(2, 'Bob Trần', '0912345678', '{"street": "456 Nguyễn Trãi", "city": "HCM", "district": "Quận 5", "ward": "Phường 3", "postal_code": "700000"}');

-- CATEGORIES
INSERT INTO categories (name, slug, image_url) VALUES
('Quần áo', 'quan-ao', 'https://example.com/img/clothing.jpg'),
('Giày dép', 'giay-dep', 'https://example.com/img/shoes.jpg'),
('Phụ kiện', 'phu-kien', 'https://example.com/img/accessories.jpg'),
('Túi xách', 'tui-xach', 'https://example.com/img/bags.jpg'),
('Đồng hồ', 'dong-ho', 'https://example.com/img/watches.jpg');

-- PRODUCTS
INSERT INTO products (category_id, name, slug, description, base_price, is_active) VALUES
(1, 'Áo thun trắng', 'ao-thun-trang', 'Áo thun cotton 100%', 150000, true),
(1, 'Áo sơ mi xanh', 'ao-so-mi-xanh', 'Sơ mi nam tay dài', 250000, true),
(2, 'Giày sneaker đen', 'giay-sneaker-den', 'Sneaker nam màu đen', 500000, true),
(2, 'Giày cao gót đỏ', 'giay-cao-got-do', 'Cao gót nữ 7cm', 450000, true),
(3, 'Mũ lưỡi trai', 'mu-luoi-trai', 'Mũ vải kaki thời trang', 100000, true),
(3, 'Kính râm thời trang', 'kinh-ram', 'Chống tia UV', 200000, true),
(4, 'Túi xách da bò', 'tui-da-bo', 'Túi xách da thật', 1200000, true),
(4, 'Balo laptop', 'balo-laptop', 'Chống sốc 15.6 inch', 600000, true),
(5, 'Đồng hồ cơ nam', 'dong-ho-co-nam', 'Chống nước 5ATM', 3000000, true),
(5, 'Đồng hồ thông minh', 'dong-ho-thong-minh', 'Kết nối Bluetooth', 2500000, true);

-- PRODUCT ATTRIBUTES
INSERT INTO product_attributes (name) VALUES
('Color'),
('Size');

-- PRODUCT ATTRIBUTE OPTIONS
INSERT INTO product_attribute_options (attribute_id, value, hex_color) VALUES
(1, 'Red', '#FF0000'),
(1, 'Green', '#00FF00'),
(1, 'Blue', '#0000FF'),
(2, 'S', NULL),
(2, 'M', NULL),
(2, 'L', NULL);

-- PRODUCT VARIANTS
INSERT INTO product_variants (product_id, sku, price, inventory, image_url) VALUES
(1, 'SKU-1A', 160000, 10, 'https://example.com/img/p1a.jpg'),
(1, 'SKU-1B', 160000, 5, 'https://example.com/img/p1b.jpg'),
(2, 'SKU-2A', 260000, 15, 'https://example.com/img/p2a.jpg'),
(3, 'SKU-3A', 510000, 20, 'https://example.com/img/p3a.jpg'),
(4, 'SKU-4A', 460000, 10, 'https://example.com/img/p4a.jpg'),
(5, 'SKU-5A', 110000, 25, 'https://example.com/img/p5a.jpg'),
(6, 'SKU-6A', 210000, 8, 'https://example.com/img/p6a.jpg'),
(7, 'SKU-7A', 1250000, 5, 'https://example.com/img/p7a.jpg'),
(8, 'SKU-8A', 610000, 6, 'https://example.com/img/p8a.jpg'),
(9, 'SKU-9A', 3050000, 2, 'https://example.com/img/p9a.jpg');

-- VARIANT ATTRIBUTES
INSERT INTO variant_attributes (variant_id, option_id) VALUES
(1, 1), (1, 4),
(2, 2), (2, 5),
(3, 3), (3, 6),
(4, 1), (4, 4),
(5, 2), (5, 5),
(6, 3), (6, 6);

-- CARTS
INSERT INTO carts (user_id) VALUES
(1, ),
(2, );

-- CART ITEMS
INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 5, 3);

-- ORDERS
INSERT INTO orders (user_id, order_number, status, shipping_address, subtotal, shipping_fee, total_amount, payment_method, payment_status) VALUES
(1, 'ORD1001', 'paid', '{"street":"123 ABC","city":"HCM","district":"Q1","ward":"P1","postal_code":"700000"}', 800000, 30000, 830000, 'cod', 'paid'),
(2, 'ORD1002', 'shipped', '{"street":"456 XYZ","city":"Hà Nội","district":"Đống Đa","ward":"Khâm Thiên","postal_code":"100000"}', 1200000, 30000, 1230000, 'credit_card', 'paid');

-- ORDER ITEMS
INSERT INTO order_items (order_id, variant_id, product_name, variant_info, price, quantity) VALUES
(1, 1, 'Áo thun trắng', '{"color":"Red","size":"S"}', 160000, 2),
(1, 3, 'Áo sơ mi xanh', '{"color":"Blue","size":"L"}', 260000, 1),
(2, 5, 'Giày cao gót đỏ', '{"color":"Green","size":"M"}', 460000, 2);

-- COUPONS
INSERT INTO coupons (code, discount_type, discount_value, valid_from, valid_to) VALUES
('SALE10', 'percent', 10, NOW(), NOW() + INTERVAL '30 days'),
('FREESHIP', 'fixed', 30000, NOW(), NOW() + INTERVAL '30 days');

-- COUPON USES
INSERT INTO coupon_uses (coupon_id, order_id, user_id, discount_amount) VALUES
(1, 1, 1, 83000),
(2, 2, 2, 30000);

-- REVIEWS
INSERT INTO reviews (product_id, user_id, order_item_id, rating, comment) VALUES
(1, 1, 1, 5, 'Rất đẹp và vừa vặn!'),
(2, 2, 2, 4, 'Chất lượng ok.'),
(4, 2, 3, 5, 'Hàng tốt, giao nhanh.');
