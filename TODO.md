
# TODO for Fixing MongoDB Logging Bug

- [x] Import logger from '../logger.js' in public/Day 31/server/config/db.js
- [x] Replace console.error("MongoDB connection failed") with logger.error("MongoDB connection failed", error) in the catch block
- [ ] Test the MongoDB connection to ensure logging works properly

- [x] Remove console.error from saveToLocalStorage() function in public/Day 53/script.js
- [x] Remove console.error from loadFromLocalStorage() function in public/Day 53/script.js
