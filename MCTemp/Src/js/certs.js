import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function generatedotNetCertificate() {
  const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ""
      ? `${process.env.APPDATA}/ASP.NET/https`
      : `${process.env.HOME}/ASP.NET/https`;

  const certificateName = process.env.npm_package_name;

  if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<> explicitly.')
    process.exit(-1);
  }

  const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
  const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

  // check if cert and key file already exist
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    // make basefolder if not exist
    if (!fs.existsSync(baseFolder)) {
      try {
        fs.makeDirSync(baseFolder, { recursive: true });
      } catch (err) {
        console.error(err);
      }
    }

    const fetchCerts = spawnSync('dotnet', [
      'dev-certs',
      'https',
      '--export-path',
      certFilePath,
      '--format',
      'PEM',
      '--no-password'
    ], { stdio: 'inherit' });
    const exitCode = fetchCerts.status ?? 0;
    if (exitCode !== 0) {
      process.exit(exitCode);
    }
  }

  // read the cert and key as UTF8 strings
  const certificate = fs.readFileSync(certFilePath);
  const privateKey = fs.readFileSync(keyFilePath);

  // return certificate and privateKey
  return {
    certificate,
    privateKey,
  }
}