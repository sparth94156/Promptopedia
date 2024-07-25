# Folder Structure
- app 
- component
- models
- public 
- styles
- utils

# File Structure
- Component
    - Feed
    - Form
    - Nav
    - Profile
    - PromptCard
    - Provider
- .env file (for secret keys, URIs and Client IDs)

- Specifications 
    - For user Authentication we installed next-auth api authentication route 
    - Used Google as an authentication provider
    - Used MongoDB atlas for Cloud Storage Database.
    - Deployed on vercel

- Features 
    - User can search for different useful chatgpt prompts for better search results
    - Can create your AI prompt as well by signing in to your account.
    - Can update or delete your prompt whenever you want.
    - Can see a feed of all AI prompt available in our app database.
    - Can search for specific prompt by tagName or prompt.
    - If you are loggedIn to your account then you can see prompts of other user's account as well.
