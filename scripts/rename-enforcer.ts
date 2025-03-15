#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { glob } = require('glob');
const minimatch = require('minimatch');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BACKUP_DIR = path.join(__dirname, '..', '.backups');
const PREFIX_PATTERNS = {
  'architecture-': ['ARCHITECTURE.md', 'STRUCTURE.md'],
  'adr-': 'ADR-*.md',
  'branding-': 'Nebula-Singularity-*.md'
};

function isKebabCase(str) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
}

function validatePrefix(filename) {
  return Object.entries(PREFIX_PATTERNS).some(([prefix, pattern]) => 
    minimatch(filename, typeof pattern === 'string' ? pattern : `{${pattern.join(',')}}`)
  );
}

async function findRenamableFiles() {
  const files = await glob(path.join(DOCS_DIR, '**/*.md'));
  return files.filter(file => {
    const { name } = path.parse(file);
    return !isKebabCase(name) || !validatePrefix(path.basename(file));
  });
}

async function updateReferences(oldPath: string, newPath: string) {
  const archFiles = [path.join(__dirname, '..', 'ARCHITECTURE.md'), path.join(__dirname, '..', 'STRUCTURE.md')];
  
  await Promise.all(archFiles.map(async (file) => {
    const content = await fs.readFile(file, 'utf8');
    const updated = content.replace(new RegExp(oldPath, 'g'), newPath);
    if (content !== updated) await fs.writeFile(file, updated);
  }));
}

async function main() {
  try {
    const filesToRename = await findRenamableFiles();
    
    if (filesToRename.length === 0) {
      console.log('All documentation files conform to naming conventions');
      return;
    }

    console.log('Files requiring renaming:');
    filesToRename.forEach(f => console.log(`- ${f}`));

    const { confirm } = await prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with renaming?',
      default: false
    }]);

    if (!confirm) return;

    await Promise.all(filesToRename.map(async (oldPath) => {
      const parsed = path.parse(oldPath);
      const newName = parsed.name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
      const newPath = path.join(parsed.dir, `${newName}${parsed.ext}`);

      await fs.rename(oldPath, newPath);
      await updateReferences(oldPath, newPath);
      console.log(`Renamed: ${oldPath} → ${newPath}`);
    }));

    console.log('Successfully updated all documentation references');
  } catch (error) {
    console.error('Error during renaming operation:', error);
    process.exit(1);
  }
}

main();