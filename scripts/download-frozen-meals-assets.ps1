$base = "https://www.annabelkarmel.com/wp-content/uploads"
$outDir = Join-Path $PSScriptRoot "..\public\product-category\frozen-meals"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$assets = @{
    "hero-video.mp4"                = "$base/2025/06/frozen_Header_gif.mp4"
    "hero-desktop.jpg"              = "$base/2025/06/Header-Section-Img-optimized.jpg"
    "hero-mobile.png"               = "$base/2025/06/Header-mob-banner-optimized.png"
    "intro-bg.png"                  = "$base/2025/06/section-2-optimized.png"
    "intro-bg-mobile.png"           = "$base/2025/06/section-mob-3.png"
    "award-logos.png"               = "$base/2025/06/Main-Page-Logos-optimized.png"
    "promise-bg.png"                = "$base/2025/06/section-3-optimized.png"
    "promise-low-salt.png"          = "$base/2025/06/Artboard-3-optimized.png"
    "promise-veggies.png"           = "$base/2025/06/Artboard-2-optimized.png"
    "promise-no-sugar.png"          = "$base/2025/06/Artboard-4-optimized.png"
    "promise-no-artificials.png"    = "$base/2025/06/Artboard-2_9-optimized.png"
    "promise-ready-5-mins.png"      = "$base/2025/06/Artboard-2_5-optimized.png"
    "promise-approved-by-kids.png"  = "$base/2025/06/Artboard-3_4-optimized.png"
    "product-chicken-tikka.png"     = "$base/2025/06/chicken-tikka-with-fluffy-rice-optimized.png"
    "product-spaghetti-bolognese.png" = "$base/2025/06/spaghetti-bolognese-with-hidden-veggies-optimized.png"
    "product-bolognese-mac.png"     = "$base/2025/06/bolognese-mac-optimized.png"
    "product-chicken-pasta.png"     = "$base/2025/06/chicken-pasta-optimized.png"
    "retailers-bg.png"              = "$base/2025/06/section-5-optimized.png"
    "logo-tesco.png"                = "$base/2025/06/tesco-optimized.png"
    "logo-asda.png"                 = "$base/2018/07/logo-asda-optimized.png"
    "logo-morrisons.png"            = "$base/2025/06/Morrisons-optimized.png"
    "logo-ocado.png"                = "$base/2025/06/Ocado-optimized.png"
    "chilled-aisle-bg.png"          = "$base/2025/06/section-7-1-1-scaled-optimized.png"
    "chilled-aisle-photo.png"       = "$base/2025/07/Frozen-LP-optimized.png"
}

foreach ($entry in $assets.GetEnumerator()) {
    $dest = Join-Path $outDir $entry.Key
    Write-Host "Downloading $($entry.Key)..."
    Invoke-WebRequest -Uri $entry.Value -OutFile $dest -UseBasicParsing
}

Write-Host "Done. $($assets.Count) files saved to $outDir"
