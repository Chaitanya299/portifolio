/**
 * Simple hook handler for Claude Code
 * This script is called by various hooks in settings.json
 */
const fs = require('fs');
const path = require('path');

const action = process.argv[2];

// Log actions to a temporary file for debugging
const logFile = path.join(process.env.HOME, '.claude-hook-debug.log');
try {
  fs.appendFileSync(logFile, `${new Date().toISOString()} - action: ${action}\n`);
} catch (e) {}

// Basic logic to prevent failures
switch (action) {
  case 'pre-bash':
  case 'pre-edit':
  case 'post-edit':
  case 'post-bash':
  case 'route':
  case 'session-restore':
  case 'session-end':
  case 'status':
  case 'notify':
  case 'compact-manual':
  case 'compact-auto':
    // Hooks should generally return success (0)
    process.exit(0);
    break;
  default:
    process.exit(0);
}
