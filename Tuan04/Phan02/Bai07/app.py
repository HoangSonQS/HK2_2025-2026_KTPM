import os

# Read environment variable
app_env = os.getenv('APP_ENV', 'not set')

print(f"Current APP_ENV: {app_env}")
