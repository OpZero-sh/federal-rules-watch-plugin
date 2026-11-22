// Counts the days left before each comment deadline in a Federal Rules Watch
// result, so the answer does not rest on date arithmetic done in prose.
// Reads the hook event on stdin and writes context to stdout. No files, no network.
const fs = require('node:fs');

function textOf(response) {
  const raw = typeof response === 'string' ? response : JSON.stringify(response ?? '');
  return raw.replace(/\\n/g, '\n');
}

function deadlines(text) {
  const found = [];
  let documentNumber = '';
  for (const line of text.split('\n')) {
    const numbered = /Document:\s*([0-9A-Za-z-]+)/.exec(line);
    if (numbered) documentNumber = numbered[1];
    const closing = /Comments close:\s*(\d{4})-(\d{2})-(\d{2})/.exec(line);
    if (closing) {
      found.push({ documentNumber, year: Number(closing[1]), month: Number(closing[2]), day: Number(closing[3]) });
      documentNumber = '';
    }
  }
  return found;
}

function daysLeft(deadline, today) {
  const closes = Date.UTC(deadline.year, deadline.month - 1, deadline.day);
  const now = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((closes - now) / 86400000);
}

function phrase(days) {
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days > 1) return `in ${days} days`;
  if (days === -1) return 'yesterday, so the period has closed';
  return `${-days} days ago, so the period has closed`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function emit(event, today) {
  const found = deadlines(textOf(event.tool_response)).slice(0, 20);
  if (found.length === 0) return;
  const lines = found.map(item => {
    const date = `${item.year}-${pad(item.month)}-${pad(item.day)}`;
    const label = item.documentNumber ? `Document ${item.documentNumber}` : 'A document';
    return `${label}: comments close ${date}, ${phrase(daysLeft(item, today))}.`;
  });
  const todayText = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const additionalContext = `Today is ${todayText} on this computer. ${lines.join(' ')} Each date is the last day of the comment period. The document sets the closing time and a later notice can extend the period, so point the person to the document page before they rely on a deadline.`;
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext } }));
}

try {
  emit(JSON.parse(fs.readFileSync(0, 'utf8')), new Date());
} catch {
  // An unexpected payload never interrupts the tool or changes its result.
}
