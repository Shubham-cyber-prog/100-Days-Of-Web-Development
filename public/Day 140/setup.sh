#!/bin/bash

# AI-Powered Email Marketing Tool - Setup Script
# This script helps you set up the project quickly

set -e  # Exit on error

echo "========================================="
echo "AI-Powered Email Marketing Tool - Setup"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if pnpm is installed
echo "Checking dependencies..."
if ! command -v pnpm &> /dev/null; then
    print_error "pnpm is not installed"
    echo "Installing pnpm..."
    npm install -g pnpm
    print_success "pnpm installed"
else
    print_success "pnpm is already installed"
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_info "Supabase CLI is not installed"
    echo "You can install it with:"
    echo "  macOS:   brew install supabase/tap/supabase"
    echo "  Windows: scoop install supabase"
    echo "  Linux:   brew install supabase/tap/supabase"
    echo ""
    read -p "Do you want to continue without Supabase CLI? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    print_success "Supabase CLI is installed"
fi

# Install dependencies
echo ""
echo "Installing npm dependencies..."
pnpm install
print_success "Dependencies installed"

# Create .env.local if it doesn't exist
echo ""
if [ ! -f .env.local ]; then
    print_info "Creating .env.local file..."
    cp .env.example .env.local
    print_success ".env.local created from .env.example"
    echo ""
    print_info "Please edit .env.local and add your Supabase credentials"
    echo "  1. Go to https://supabase.com"
    echo "  2. Create a new project or select existing"
    echo "  3. Go to Settings → API"
    echo "  4. Copy Project URL and anon/public key"
    echo "  5. Update .env.local with these values"
else
    print_info ".env.local already exists"
fi

# Check if .env.local has been configured
echo ""
if grep -q "your_supabase" .env.local 2>/dev/null; then
    print_error ".env.local needs to be configured!"
    echo "Please update .env.local with your actual Supabase credentials"
else
    print_success ".env.local appears to be configured"
fi

# Supabase setup
echo ""
echo "========================================="
echo "Supabase Setup"
echo "========================================="
echo ""

if command -v supabase &> /dev/null; then
    read -p "Do you want to link this project to Supabase? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        print_info "Linking to Supabase..."
        echo "You'll need your project ref from the Supabase dashboard"
        echo "Find it in: Project Settings → General → Reference ID"
        echo ""
        
        # Login to Supabase
        print_info "Logging in to Supabase..."
        supabase login
        
        # Link project
        read -p "Enter your Supabase project ref: " PROJECT_REF
        supabase link --project-ref "$PROJECT_REF"
        
        print_success "Project linked to Supabase"
        
        # Deploy Edge Functions
        echo ""
        read -p "Do you want to deploy the Edge Functions now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Deploying Edge Functions..."
            supabase functions deploy server
            print_success "Edge Functions deployed"
            
            # Set OpenAI API key
            echo ""
            read -p "Do you have an OpenAI API key to set? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                read -p "Enter your OpenAI API key: " OPENAI_KEY
                supabase secrets set OPENAI_API_KEY="$OPENAI_KEY"
                print_success "OpenAI API key set"
            else
                print_info "You can set it later with: supabase secrets set OPENAI_API_KEY=your-key"
            fi
        fi
    fi
else
    print_info "Skipping Supabase setup (CLI not installed)"
    echo ""
    echo "Manual Supabase setup steps:"
    echo "  1. Install Supabase CLI"
    echo "  2. Run: supabase login"
    echo "  3. Run: supabase link --project-ref YOUR_PROJECT_REF"
    echo "  4. Run: supabase functions deploy server"
    echo "  5. Run: supabase secrets set OPENAI_API_KEY=your-key"
fi

# Final steps
echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
print_success "Your project is ready!"
echo ""
echo "Next steps:"
echo "  1. Make sure .env.local has your Supabase credentials"
echo "  2. Deploy Edge Functions (if not done already)"
echo "  3. Add OpenAI API key to Supabase secrets"
echo "  4. Run: pnpm dev"
echo "  5. Open: http://localhost:5173"
echo ""
echo "Documentation:"
echo "  - Quick Start: QUICKSTART.md"
echo "  - Deployment: DEPLOYMENT.md"
echo "  - API Docs: API_DOCUMENTATION.md"
echo ""
print_info "Happy coding! 🚀"
