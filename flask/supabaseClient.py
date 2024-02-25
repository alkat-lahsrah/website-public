import os
from supabase import create_client, Client

# Ensure you have loaded environment variables from your .env file
# You can use a library like python-dotenv for this purpose
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
