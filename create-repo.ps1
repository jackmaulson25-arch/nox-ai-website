$pat = [System.Environment]::GetEnvironmentVariable("GITHUB_PAT", "User")
$headers = @{
    Authorization = "token $pat"
    Accept = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
    "User-Agent" = "OpenClaw"
}
$body = '{"name":"nox-ai-website","description":"Nox AI landing page","private":false}'
try {
    $resp = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method POST -Headers $headers -Body $body
    Write-Host "✅ Created: $($resp.html_url)"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 422) {
        Write-Host "Repo already exists"
    } else {
        Write-Host "Status: $code"
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host $reader.ReadToEnd()
    }
}
