#!/bin/bash

echo "Creating .env file from env.example..."

if [ -f .env ]; then
    echo ""
    echo "⚠️  WARNING: .env file already exists!"
    echo "If you want to recreate it, delete the existing .env file first."
    echo ""
    exit 0
fi

cp env.example .env

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS: .env file created successfully!"
    echo ""
    echo "Please edit .env file with your actual values:"
    echo "  - MongoDB Atlas connection string"
    echo "  - JWT secret (generate with: openssl rand -base64 32)"
    echo "  - Cloudinary credentials (if using image uploads)"
    echo "  - Frontend URL for CORS"
    echo ""
else
    echo ""
    echo "❌ ERROR: Failed to create .env file"
    echo ""
    exit 1
fi

