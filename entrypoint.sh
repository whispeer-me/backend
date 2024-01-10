#!/bin/sh
# Run database migrations
npm run prestart

# Start the application
exec node dist/app.js
