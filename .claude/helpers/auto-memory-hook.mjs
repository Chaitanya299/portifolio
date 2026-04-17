/**
 * Auto-memory hook for Claude Code
 * This script is called by SessionStart and Stop hooks
 */
import fs from 'fs';
import path from 'path';

const action = process.argv[2];

// Basic logic to prevent failures
switch (action) {
  case 'import':
  case 'sync':
    // Simply exit for now to prevent the error
    process.exit(0);
    break;
  default:
    process.exit(0);
}
