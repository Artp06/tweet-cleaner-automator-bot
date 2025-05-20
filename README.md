
# Twitter Retweet Cleaner

A Python script that automates removing all retweets from your Twitter profile.

## Prerequisites

1. Python 3.6 or higher
2. Google Chrome browser
3. ChromeDriver matching your Chrome version

## Setup Instructions

1. Download ChromeDriver from [Chrome WebDriver](https://sites.google.com/chromium.org/driver/) that matches your Chrome version
2. Place ChromeDriver in your PATH or in the same folder as the script
3. Install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

1. Run the script:

```bash
python twitter_retweet_cleaner.py
```

2. Enter your Twitter credentials when prompted
3. The script will automatically:
   - Log into your Twitter account
   - Navigate to your profile
   - Find and remove all retweets

## Notes

- The script may need adjustments if Twitter changes their website layout
- Twitter rate limits might affect the script's performance
- Use responsibly and at your own risk

## Security

- Your login credentials are not stored by this script
- Consider using Twitter's 2FA for additional security
