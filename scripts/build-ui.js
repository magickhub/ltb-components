import { execSync } from 'child_process';

try {
  const projectRoot = '/vercel/share/v0-project';
  
  console.log('[v0] Attempting to build from:', projectRoot);
  
  // Change to the actual project directory
  process.chdir(projectRoot);
  console.log('[v0] Now in:', process.cwd());
  
  console.log('\n[v0] Installing dependencies in packages/ui...');
  execSync('npm --prefix packages/ui install', { stdio: 'inherit' });

  console.log('\n[v0] Building package with tsup...');
  execSync('npm --prefix packages/ui run build', { stdio: 'inherit' });

  console.log('\n[v0] Listing dist folder:');
  execSync('ls -la packages/ui/dist/', { stdio: 'inherit' });
  
  console.log('\n✓ Build complete!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
