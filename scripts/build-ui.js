import { execSync } from 'child_process';
import { join } from 'path';

const uiDir = '/vercel/share/v0-project/packages/ui';
process.chdir(uiDir);

try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\nBuilding package with tsup...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✓ Build complete! dist/ folder created.');
  execSync('ls -la dist/', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
