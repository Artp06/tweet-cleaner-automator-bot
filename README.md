
# Twitter Retweet Cleaner

A Python script that automates removing all retweets from your Twitter profile. This tool uses browser automation to simulate human interaction with Twitter, finding and removing each retweet one by one.

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

## Usage Options

### Basic Usage

Run the script and follow the prompts:

```bash
python twitter_retweet_cleaner.py
```

You'll be prompted to enter your Twitter username/email/phone and password.

### Advanced Usage

Specify Twitter ID directly (you'll still be prompted for password):

```bash
python twitter_retweet_cleaner.py your_twitter_id
```

Run in headless mode (no browser UI):

```bash
python twitter_retweet_cleaner.py --headless
```

Combine options:

```bash
python twitter_retweet_cleaner.py your_twitter_id --headless
```

## How It Works

1. The script launches a Chrome browser
2. It logs into Twitter using your credentials
3. Navigates to your profile page
4. Finds retweets and removes them one by one
5. Continues until no more retweets are found

## Security Notes

- Your login credentials are not stored by this script
- For maximum security, always run the script locally
- Consider using Twitter's 2FA for additional security on your account

## Web Interface

The included web interface provides a convenient way to:
- Launch the script locally with your Twitter ID
- View step-by-step instructions
- Monitor the cleanup process

## Troubleshooting

If you encounter issues:

1. Make sure ChromeDriver matches your Chrome version
2. Twitter's UI changes frequently - if the script fails, check for updates
3. Rate limiting may occur if you have many retweets - the script includes retry logic
4. If you're blocked from logging in, wait a while before retrying

## Disclaimer

Use this tool responsibly and at your own risk. Automated interaction with Twitter should comply with their Terms of Service.
