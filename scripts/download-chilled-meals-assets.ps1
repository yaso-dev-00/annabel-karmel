$base = "https://www.annabelkarmel.com/wp-content/uploads"
$outDir = Join-Path $PSScriptRoot "..\public\product-category\chilled-meals"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$assets = @{
    "hero-desktop.jpg"          = "$base/2025/10/chilled-meals-hero-img-optimized.jpg"
    "hero-mobile.jpg"           = "$base/2025/10/chilled-meals-hero-mob-optimized.jpg"
    "intro-bg.png"              = "$base/2025/09/chilled-meals-sec-2-optimized.png"
    "intro-bg-mobile.png"       = "$base/2025/09/mob-img-sec-2-optimized.png"
    "signature.svg"             = "$base/2025/06/sig.svg"
    "award-lbc.png"             = "$base/2025/09/lbc-logo-optimized.png"
    "promise-bg.png"            = "$base/2025/09/chilled-meals-sec-3-optimized.png"
    "promise-freezable.png"     = "$base/2025/09/Chicken-Tikka-Cook-from-Frozen-optimized.png"
    "promise-low-salt.png"      = "$base/2025/09/Chicken-Tikka-low-in-salt-optimized.png"
    "promise-100-natural.png"   = "$base/2025/09/100-natural-optimized.png"
    "promise-veggie.png"        = "$base/2025/09/Veggie-goodness-optimized.png"
    "promise-cook-time.png"     = "$base/2025/09/Cook-time-optimized.png"
    "product-tikka.png"         = "$base/2025/10/Vector-17-optimized.png"
    "product-pasta.png"         = "$base/2025/10/Vector-16-optimized.png"
    "product-cottage-pie.png"   = "$base/2025/10/Vector-18-optimized.png"
    "product-lasagne.png"       = "$base/2025/10/Img-3-optimized.png"
    "tesco-bg.png"              = "$base/2025/09/Freezer-aisle-Logos-optimized.png"
    "tesco-logo.png"            = "$base/2025/09/Group-267-optimized.png"
    "frozen-aisle-bg.png"       = "$base/2025/09/frozen-aisle-too-optimized.png"
    "frozen-aisle-photo.png"    = "$base/2025/09/Annabel-frozen-optimized.png"
}

foreach ($entry in $assets.GetEnumerator()) {
    $dest = Join-Path $outDir $entry.Key
    Write-Host "Downloading $($entry.Key)..."
    Invoke-WebRequest -Uri $entry.Value -OutFile $dest -UseBasicParsing
}

Write-Host "Done. $($assets.Count) files saved to $outDir"
