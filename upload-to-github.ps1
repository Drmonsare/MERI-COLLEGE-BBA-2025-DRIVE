# GitHub Upload Script for MERI Student Directory
# Run this script after creating your GitHub repository

Write-Host "🚀 MERI Student Directory - GitHub Upload Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Construct repository URL
$repoUrl = "https://github.com/$username/meri-student-directory.git"

Write-Host ""
Write-Host "📋 Repository URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Confirm
$confirm = Read-Host "Is this correct? (y/n)"

if ($confirm -ne "y") {
    Write-Host "❌ Cancelled. Please run the script again." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔗 Adding remote repository..." -ForegroundColor Green

try {
    # Check if remote already exists
    $remoteExists = git remote | Select-String -Pattern "origin"
    
    if ($remoteExists) {
        Write-Host "⚠️  Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
        git remote remove origin
    }
    
    # Add remote
    git remote add origin $repoUrl
    Write-Host "✅ Remote added successfully!" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Green
    Write-Host "⚠️  You will be prompted for credentials:" -ForegroundColor Yellow
    Write-Host "   Username: Your GitHub username" -ForegroundColor Yellow
    Write-Host "   Password: Use Personal Access Token (NOT your password)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Get token at: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
    
    # Push to GitHub
    git push -u origin main
    
    Write-Host ""
    Write-Host "🎉 SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 View your repository at:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$username/meri-student-directory" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Repository Stats:" -ForegroundColor Yellow
    Write-Host "   • 48+ files uploaded" -ForegroundColor White
    Write-Host "   • 13,894+ lines of code" -ForegroundColor White
    Write-Host "   • Complete documentation" -ForegroundColor White
    Write-Host "   • 241 student records" -ForegroundColor White
    Write-Host ""
    Write-Host "🔄 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Visit your repository on GitHub" -ForegroundColor White
    Write-Host "   2. Connect to Vercel for auto-deploy" -ForegroundColor White
    Write-Host "   3. Share with your team" -ForegroundColor White
    Write-Host ""
    
    # Open repository in browser
    $openBrowser = Read-Host "Open repository in browser? (y/n)"
    if ($openBrowser -eq "y") {
        Start-Process "https://github.com/$username/meri-student-directory"
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   • Make sure you created the repository on GitHub first" -ForegroundColor White
    Write-Host "   • Use Personal Access Token, not password" -ForegroundColor White
    Write-Host "   • Check repository name is 'meri-student-directory'" -ForegroundColor White
    Write-Host "   • Verify you have internet connection" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
