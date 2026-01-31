# Geomorphology Auto-Commit Bot
# This script watches for file changes and automatically pushes them to GitHub.

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "f:\OpenGit\geomorphology"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Define what happens when a change is detected
$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    
    # Ignore .git, site, and temporary files
    if ($path -notmatch "\\.git\\" -and $path -notmatch "\\site\\" -and $path -notmatch "\.tmp") {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Change detected: $path ($changeType)" -ForegroundColor Cyan
        
        # Small delay to let file writes finish and debounce multiple rapid changes
        Start-Sleep -Seconds 3
        
        try {
            Write-Host "Pushing changes to GitHub..." -ForegroundColor Yellow
            git add .
            git commit -m "Auto-commit: $changeType in $path at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            git push
            Write-Host "Success! Site is being updated." -ForegroundColor Green
        } catch {
            Write-Host "Error during auto-commit: $_" -ForegroundColor Red
        }
    }
}

# Register events
$handlers = . {
    Register-ObjectEvent $watcher "Changed" -Action $action
    Register-ObjectEvent $watcher "Created" -Action $action
    Register-ObjectEvent $watcher "Deleted" -Action $action
    Register-ObjectEvent $watcher "Renamed" -Action $action
}

Write-Host "----------------------------------------------------" -ForegroundColor Gold
Write-Host "Geomorphology Auto-Commit Bot is now ACTIVE" -ForegroundColor Gold
Write-Host "Watching: $($watcher.Path)" -ForegroundColor Gold
Write-Host "Press Ctrl+C to stop the bot." -ForegroundColor Gold
Write-Host "----------------------------------------------------" -ForegroundColor Gold

try {
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    # Cleanup handlers on exit
    $handlers | Unregister-Event
    Write-Host "Bot stopped."
}
