#!/usr/bin/env node

/**
 * Generate visual assets for Suqi branding
 * Creates: logo SVG, favicon, and Open Graph images
 */

const fs = require('fs').promises
const path = require('path')

// Suqi brand colors
const COLORS = {
  primary: '#206bc4',
  secondary: '#3b82f6',
  accent: '#8b5cf6',
  dark: '#1e293b',
  light: '#f8fafc'
}

// Logo SVG generator
function generateLogoSVG(size = 128) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="suqiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.accent};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="64" cy="64" r="60" fill="url(#suqiGradient)" opacity="0.1"/>
  
  <!-- S letter stylized -->
  <path d="M 40 40 Q 50 30, 64 30 T 88 40 Q 88 50, 64 56 Q 40 62, 40 72 Q 40 82, 50 88 T 78 94 Q 88 94, 88 88" 
        fill="none" 
        stroke="url(#suqiGradient)" 
        stroke-width="8" 
        stroke-linecap="round"/>
  
  <!-- Q dot -->
  <circle cx="64" cy="64" r="4" fill="${COLORS.primary}"/>
  
  <!-- Analytics bars -->
  <rect x="48" y="100" width="8" height="12" fill="${COLORS.secondary}" opacity="0.8"/>
  <rect x="60" y="95" width="8" height="17" fill="${COLORS.accent}" opacity="0.8"/>
  <rect x="72" y="90" width="8" height="22" fill="${COLORS.primary}" opacity="0.8"/>
</svg>`
}

// Favicon generator (simplified version)
function generateFaviconSVG() {
  return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="${COLORS.primary}"/>
  <path d="M 10 10 Q 13 7, 16 7 T 22 10 Q 22 13, 16 14 Q 10 15.5, 10 18 Q 10 20.5, 13 22 T 19.5 23.5 Q 22 23.5, 22 22" 
        fill="none" 
        stroke="${COLORS.light}" 
        stroke-width="2" 
        stroke-linecap="round"/>
  <circle cx="16" cy="16" r="1.5" fill="${COLORS.light}"/>
</svg>`
}

// Open Graph image generator
function generateOGImage() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.dark};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primary};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${COLORS.light}" stroke-width="0.5" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Logo -->
  <g transform="translate(100, 200)">
    <circle cx="80" cy="80" r="75" fill="${COLORS.light}" opacity="0.1"/>
    <path d="M 50 50 Q 62.5 37.5, 80 37.5 T 110 50 Q 110 62.5, 80 70 Q 50 77.5, 50 90 Q 50 102.5, 62.5 110 T 97.5 117.5 Q 110 117.5, 110 110" 
          fill="none" 
          stroke="${COLORS.light}" 
          stroke-width="10" 
          stroke-linecap="round"/>
    <circle cx="80" cy="80" r="5" fill="${COLORS.light}"/>
  </g>
  
  <!-- Text -->
  <text x="320" y="280" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="${COLORS.light}">Suqi Analytics</text>
  <text x="320" y="340" font-family="Arial, sans-serif" font-size="32" fill="${COLORS.light}" opacity="0.8">Enterprise Analytics Platform</text>
  
  <!-- Analytics visualization -->
  <g transform="translate(800, 350)">
    <rect x="0" y="80" width="40" height="120" fill="${COLORS.secondary}" opacity="0.7"/>
    <rect x="60" y="40" width="40" height="160" fill="${COLORS.accent}" opacity="0.7"/>
    <rect x="120" y="0" width="40" height="200" fill="${COLORS.primary}" opacity="0.7"/>
    <rect x="180" y="60" width="40" height="140" fill="${COLORS.light}" opacity="0.7"/>
    <rect x="240" y="100" width="40" height="100" fill="${COLORS.secondary}" opacity="0.7"/>
  </g>
</svg>`
}

// Main function to generate all assets
async function generateAssets() {
  const assetsDir = path.join(__dirname, '..', 'apps', 'web', 'public')
  const docsAssetsDir = path.join(__dirname, '..', 'apps', 'docs', 'public', 'img')
  
  // Ensure directories exist
  await fs.mkdir(assetsDir, { recursive: true })
  await fs.mkdir(docsAssetsDir, { recursive: true })
  
  // Generate logos
  const logo128 = generateLogoSVG(128)
  const logo256 = generateLogoSVG(256)
  const logo512 = generateLogoSVG(512)
  const favicon = generateFaviconSVG()
  const ogImage = generateOGImage()
  
  // Write files for web app
  await fs.writeFile(path.join(assetsDir, 'logo.svg'), logo256)
  await fs.writeFile(path.join(assetsDir, 'logo-128.svg'), logo128)
  await fs.writeFile(path.join(assetsDir, 'logo-512.svg'), logo512)
  await fs.writeFile(path.join(assetsDir, 'favicon.svg'), favicon)
  await fs.writeFile(path.join(assetsDir, 'og-image.svg'), ogImage)
  
  // Write files for docs
  await fs.writeFile(path.join(docsAssetsDir, 'suqi-logo.svg'), logo256)
  await fs.writeFile(path.join(docsAssetsDir, 'suqi-favicon.svg'), favicon)
  await fs.writeFile(path.join(docsAssetsDir, 'suqi-og.svg'), ogImage)
  
  // Generate manifest.json for PWA
  const manifest = {
    name: 'Suqi Analytics Platform',
    short_name: 'Suqi',
    description: 'Enterprise Analytics and Intelligence Platform',
    start_url: '/',
    display: 'standalone',
    background_color: COLORS.dark,
    theme_color: COLORS.primary,
    icons: [
      {
        src: '/logo-128.svg',
        sizes: '128x128',
        type: 'image/svg+xml'
      },
      {
        src: '/logo-256.svg',
        sizes: '256x256',
        type: 'image/svg+xml'
      },
      {
        src: '/logo-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml'
      }
    ]
  }
  
  await fs.writeFile(
    path.join(assetsDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  
  console.log('✅ Visual assets generated successfully!')
  console.log('   - Logo SVGs (128px, 256px, 512px)')
  console.log('   - Favicon SVG')
  console.log('   - Open Graph image')
  console.log('   - PWA manifest.json')
  console.log(`   - Files written to ${assetsDir} and ${docsAssetsDir}`)
}

// Run the generator
generateAssets().catch(console.error)