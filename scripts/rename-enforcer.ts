#!/usr/bin/env node
const { readdir, readFile, writeFile, rename, stat } = require('fs-extra');
const { join, parse, basename } = require('path');
const { prompt } = require('inquirer');
const { glob } = require('glob');
const minimatch = require('minimatch');

const DOCS_DIR = join(__dirname, '..', 'docs');
const BACKUP_DIR = join(__dirname, '..', '.backups');
const PREFIX_PATTERNS = {
  'architecture-': ['ARCHITECTURE.md', 'STRUCTURE.md'],
  'adr-': 'ADR-*.md',
  'branding-': 'Nebula-Singularity-*.md'
};

function isKebabCase(str: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
}

function validatePrefix(filename: string): boolean {
  return Object.entries(PREFIX_PATTERNS).some(([prefix, pattern]) => 
    minimatch(filename, typeof pattern === 'string' ? pattern : `{${pattern.join(',')}}`)
  );
}

async function findRenamableFiles(): Promise<string[]> {
  const files = await glob(join(DOCS_DIR, '**/*.md'));
  return files.filter(file => {
    const { name } = parse(file);
    return !isKebabCase(name) || !validatePrefix(basename(file));
  });
}

async function updateReferences(oldPath: string, newPath: string) {
  const archFiles = [join('ARCHITECTURE.md'), join('STRUCTURE.md')];
  
  await Promise.all(archFiles.map(async (file) => {
    const content = await readFile(file, 'utf8');
    const updated = content.replace(new RegExp(oldPath, 'g'), newPath);
    if (content !== updated) await writeFile(file, updated);
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
      const parsed = parse(oldPath);
      const newName = parsed.name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
      const newPath = join(parsed.dir, `${newName}${parsed.ext}`);

      await rename(oldPath, newPath);
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