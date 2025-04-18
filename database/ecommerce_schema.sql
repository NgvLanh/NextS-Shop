
-- =========================
-- SCHEMA TỐI ƯU E-COMMERCE
-- =========================

-- ENUM TYPES
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

-- ROLES
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(10) UNIQUE NOT NULL,
);
-- USERS
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT REFERENCES roles(id)
    email VARCHAR(255) UNIQUE NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- USER ADDRESSES
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address JSONB NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id BIGINT REFERENCES categories(id),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true
);

-- PRODUCTS
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(12,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCT ATTRIBUTES
CREATE TABLE product_attributes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    is_variant BOOLEAN DEFAULT true
);

-- ATTRIBUTE OPTIONS
CREATE TABLE product_attribute_options (
    id BIGSERIAL PRIMARY KEY,
    attribute_id BIGINT REFERENCES product_attributes(id),
    value VARCHAR(50) NOT NULL,
    hex_color VARCHAR(7),
    image_url VARCHAR(255),
    UNIQUE(attribute_id, value)
);

-- PRODUCT VARIANTS
CREATE TABLE product_variants (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    inventory INTEGER NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VARIANT ATTRIBUTES
CREATE TABLE variant_attributes (
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
    option_id BIGINT REFERENCES product_attribute_options(id),
    PRIMARY KEY (variant_id, option_id)
);

-- PRODUCT IMAGES
CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id),
    url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT false
);

-- CARTS
CREATE TABLE carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    session_id VARCHAR(100),
    expires_at TIMESTAMPTZ
);

-- CART ITEMS
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT REFERENCES carts(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE(cart_id, variant_id)
);

-- ORDERS
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    shipping_address JSONB NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    shipping_fee DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id),
    product_name VARCHAR(255) NOT NULL,
    variant_info JSONB NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    quantity INTEGER NOT NULL
);

-- COUPONS
CREATE TABLE coupons (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(10) NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    min_order DECIMAL(10,2),
    valid_from TIMESTAMPTZ NOT NULL,
    valid_to TIMESTAMPTZ NOT NULL,
    usage_limit INTEGER
);

-- COUPON USES
CREATE TABLE coupon_uses (
    id BIGSERIAL PRIMARY KEY,
    coupon_id BIGINT REFERENCES coupons(id),
    order_id BIGINT REFERENCES orders(id),
    user_id BIGINT REFERENCES users(id),
    discount_amount DECIMAL(10,2) NOT NULL,
    UNIQUE(coupon_id, user_id, order_id)
);

-- REVIEWS
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    user_id BIGINT REFERENCES users(id),
    order_item_id BIGINT REFERENCES order_items(id),
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, order_item_id)
);

-- TRIGGER FOR SEARCH VECTOR
CREATE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', NEW.name || ' ' || COALESCE(NEW.description, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_product_search_vector
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- INDEXES
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_product_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_variant_product ON product_variants(product_id);
CREATE INDEX idx_variant_inventory ON product_variants(inventory) WHERE inventory > 0;
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_created ON orders(created_at);
CREATE INDEX idx_cart_user ON carts(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_cart_session ON carts(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_product_search ON products USING GIN(search_vector);
