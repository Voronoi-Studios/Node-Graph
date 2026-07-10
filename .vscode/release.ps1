npm run build

git add .
git commit -m "Build release"
git push

$latest = git tag --sort=-version:refname | Select-Object -First 1
$version = $latest.TrimStart("v")

$parts = $version.Split(".")
$newVersion = "v$($parts[0]).$($parts[1]).$([int]$parts[2] + 1)"

git tag $newVersion
git push origin $newVersion

Write-Host "Released $newVersion"