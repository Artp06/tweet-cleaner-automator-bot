
#!/usr/bin/env python3
"""
Twitter Retweet Cleaner - A script to remove all retweets from your Twitter profile.
"""

import os
import time
import getpass
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def clear_screen():
    """Clear terminal screen based on OS."""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_banner():
    """Print script banner."""
    banner = """
    ╔════════════════════════════════════════════════╗
    ║            TWITTER RETWEET CLEANER             ║
    ║                                                ║
    ║    Automatically remove all your retweets!     ║
    ╚════════════════════════════════════════════════╝
    """
    print(banner)

def get_credentials():
    """Securely get Twitter login credentials."""
    print("\n🔐 Login Information (credentials will not be stored)")
    print("-----------------------------------------------")
    username = input("📧 Enter your Twitter username/email/phone: ")
    password = getpass.getpass("🔑 Enter your password: ")
    return username, password

def initialize_browser():
    """Initialize and configure the browser."""
    print("\n🔄 Initializing browser...")
    
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    
    # Uncomment for headless mode (no visible browser)
    # options.add_argument("--headless")
    
    try:
        browser = webdriver.Chrome(options=options)
        print("✅ Browser initialized successfully")
        return browser
    except Exception as e:
        print(f"❌ Failed to initialize browser: {e}")
        print("\n⚠️ Make sure you have Chrome and ChromeDriver installed.")
        print("📝 Get ChromeDriver at: https://sites.google.com/chromium.org/driver/")
        exit(1)

def login_to_twitter(browser, username, password):
    """Login to Twitter."""
    print("\n🔄 Logging into Twitter...")
    
    try:
        browser.get("https://twitter.com/login")
        
        # Wait for login page to load
        WebDriverWait(browser, 20).until(
            EC.presence_of_element_located((By.NAME, "text"))
        )
        
        # Enter username
        username_field = browser.find_element(By.NAME, "text")
        username_field.send_keys(username)
        username_field.send_keys(Keys.ENTER)
        
        # Wait for password field and enter password
        WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.NAME, "password"))
        )
        password_field = browser.find_element(By.NAME, "password")
        password_field.send_keys(password)
        password_field.send_keys(Keys.ENTER)
        
        # Wait for successful login
        WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.XPATH, "//span[text()='Home']"))
        )
        print("✅ Logged in successfully")
        return True
    except TimeoutException:
        print("❌ Login failed: Timeout. Twitter might have changed their layout or you entered wrong credentials.")
        return False
    except Exception as e:
        print(f"❌ Login failed: {e}")
        return False

def navigate_to_profile(browser, username):
    """Navigate to user profile."""
    print("\n🔄 Navigating to your profile...")
    
    try:
        # Click on profile icon/link - Twitter layout might change, so we try different approaches
        try:
            profile_link = WebDriverWait(browser, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[@aria-label='Profile']"))
            )
            profile_link.click()
        except:
            try:
                # Alternative selector
                profile_link = WebDriverWait(browser, 10).until(
                    EC.element_to_be_clickable((By.XPATH, "//a[contains(@href, '/home')]/following-sibling::a"))
                )
                profile_link.click()
            except:
                # Direct navigation if clicking fails
                browser.get(f"https://twitter.com/{username}")
        
        # Wait for profile page to load
        time.sleep(3)
        print("✅ Navigated to profile successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to navigate to profile: {e}")
        return False

def remove_retweets(browser):
    """Find and remove all retweets."""
    print("\n🔄 Starting to remove retweets...")
    
    retweets_removed = 0
    consecutive_failures = 0
    max_failures = 5  # Stop after this many consecutive failures
    
    while consecutive_failures < max_failures:
        try:
            # Find retweet elements - this selector might need adjustment based on Twitter's current layout
            retweet_indicators = browser.find_elements(By.XPATH, "//span[contains(text(), 'Retweeted')]")
            
            if not retweet_indicators:
                print("\n✅ No more retweets found!")
                break
                
            # Click on the first retweet's menu
            retweet = retweet_indicators[0].find_element(By.XPATH, "./ancestor::article")
            menu_button = retweet.find_element(By.XPATH, ".//div[@aria-label='More' or contains(@aria-label, 'more')]")
            menu_button.click()
            
            # Wait for menu to appear and click "Undo Retweet"
            undo_retweet = WebDriverWait(browser, 5).until(
                EC.element_to_be_clickable((By.XPATH, "//span[contains(text(), 'Undo Retweet')]"))
            )
            undo_retweet.click()
            
            # Wait for the retweet to be removed
            time.sleep(1)
            
            retweets_removed += 1
            consecutive_failures = 0
            print(f"✅ Removed retweet #{retweets_removed}")
            
            # Refresh page every 10 retweets to avoid stale elements
            if retweets_removed % 10 == 0:
                browser.refresh()
                time.sleep(3)
                
        except Exception as e:
            consecutive_failures += 1
            print(f"⚠️ Failed to remove a retweet: {e}")
            print(f"Trying again... ({consecutive_failures}/{max_failures})")
            
            # Refresh page to recover from errors
            browser.refresh()
            time.sleep(3)
    
    return retweets_removed

def main():
    """Main script execution."""
    clear_screen()
    print_banner()
    
    username, password = get_credentials()
    browser = initialize_browser()
    
    try:
        if login_to_twitter(browser, username, password):
            # Extract handle from username if email was used
            handle = username.split('@')[0] if '@' in username else username
            
            if navigate_to_profile(browser, handle):
                retweets_removed = remove_retweets(browser)
                
                print("\n====================================")
                print(f"🎉 Process completed successfully!")
                print(f"🗑️ Total retweets removed: {retweets_removed}")
                print("====================================")
                
    except KeyboardInterrupt:
        print("\n\n⚠️ Process interrupted by user.")
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
    finally:
        input("\nPress Enter to close the browser and exit...")
        browser.quit()

if __name__ == "__main__":
    main()
