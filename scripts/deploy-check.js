#!/usr/bin/env node

// This script helps with Vercel deployment
// It ensures all necessary files are in place

const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel Deployment Pre-Check\n');

// Check required files
const requiredFiles = [
  'vercel.json',
  'package.json',
  'dist/index.html',
  'server/index.js',
  'server/data/students.json'
];

let allGood = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allGood = false;
});

console.log('\n');

if (allGood) {
  console.log('✅ All required files present!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: vercel login');
  console.log('2. Run: vercel');
  console.log('3. Run: vercel --prod\n');
} else {
  console.log('❌ Some files are missing!');
  console.log('Run: npm run build\n');
  process.exit(1);
}
