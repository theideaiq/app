from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    # 1. Visit Megastore
    print("Navigating to Megastore...")
    try:
        page.goto("http://localhost:3000/en/megastore", timeout=60000)
    except Exception as e:
        print(f"Navigation failed: {e}")
        # Capture screenshot even if failed to see state
        page.screenshot(path="verification/failed_nav.png")
        raise e

    # Wait for products to load
    print("Waiting for products...")
    # ProductCard renders "Price" text
    try:
        page.wait_for_selector("text=Price", timeout=15000)
    except Exception as e:
        print("Timeout waiting for Price text. Checking if content loaded.")
        page.screenshot(path="verification/timeout_megastore.png")
        print(page.content())
        raise e

    print("Taking screenshot of Megastore...")
    page.screenshot(path="verification/megastore.png")

    # 2. Click a product to go to Product View
    print("Clicking a product...")
    # The ProductCard is wrapped in a Link.
    # We'll click the first product card link.
    # Link href starts with /product/
    links = page.locator("a[href^='/product/']")
    if links.count() > 0:
        links.first.click()

        # Wait for product page
        print("Waiting for product page...")
        page.wait_for_selector("h1", timeout=15000)

        # Check for Add to Cart
        expect(page.get_by_role("button", name="Add to Cart").first).to_be_visible()

        print("Taking screenshot of Product Page...")
        page.screenshot(path="verification/product.png")
    else:
        print("No product links found!")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
