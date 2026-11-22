---
name: comment-deadlines
description: "Find federal proposed rules that are open for public comment and confirm when comments close and where to submit them. Use when someone asks what is open for comment, when a comment period ends, how to comment on a proposed rule, or whether a deadline was extended. Typical requests: \"what proposed rules on offshore wind can I comment on\", \"when do comments close on the FAA drone rule\", \"is the comment period still open\", \"where do I submit a comment\", \"what closes for comment this week\"."
---

# Comment deadlines

List proposed rules with an open comment period, confirm each closing date against the full record, and hand the user the official place to comment.

## When to use this skill

Use it when the question is about commenting: what is open, when it closes, where to submit, whether the deadline moved.

Use `regulatory-brief` for a general search or digest, and `read-federal-document` to explain one document the user already has.

This skill does not submit comments and does not tell the user what position to take. If the user asks for help writing a comment, see "Helping with a comment" below.

## Tools

| Tool | Use | Arguments that matter |
| --- | --- | --- |
| `open_comment_periods` | Proposed rules whose comment period is still open, soonest closing first | `query` (topic words, up to 100 characters, leave empty for all), `limit` (1 to 20, default 8) |
| `get_federal_document` | Full record with the comment link | `document_number` exactly as returned |
| `search_federal_documents` | Find extensions, reopenings and comment requests in notices | `query`, `type`, `sort`, `since` |

## Workflow

1. **Get the topic.** A few topic words are enough. If the user wants everything closing soon, call `open_comment_periods` with no `query`.
2. **Call `open_comment_periods`.** Results come back soonest closing first, each with `Comments close`.
3. **Screen the results.** The topic match is loose. A search for "offshore wind" can return an oil and gas rule that mentions the phrase. Keep the documents whose title or summary is about the topic and say that you set others aside. If nothing fits, try the agency's own wording for the subject.
4. **Open each document you will report** with `get_federal_document`. Confirm that `Comments close` in the full record matches the list, and copy the `Comment at` link. Do not report a deadline or a place to comment from the list alone.
5. **Check for a changed deadline when the user will act on it.** Agencies extend and reopen comment periods in a separate, later document. Call `search_federal_documents` with the rule's title as `query` and `type: proposed_rule`, and look for a later record whose title mentions an extension, a reopening or a correction. Open it and report what it says. See [references/comment-periods.md](references/comment-periods.md).
6. **Work out the time left** from today's date to the closing date and state it as of today. If the closing date is today or tomorrow, say so first.
7. **Answer** in the format below.

## Decision points

- **The user names one rule.** If `open_comment_periods` with its title words does not list it, the period may be closed or the document may not be a proposed rule. Find it with `search_federal_documents`, open it, and report the closing date in the record. If that date has passed and you find no reopening, say the period appears closed and that the agency's document is the authority.
- **The user asks about a notice, not a proposed rule.** Notices can ask for comments too, for example information collection requests. `open_comment_periods` lists proposed rules only. Use `search_federal_documents` with `type: notice` and `sort: newest`, then compare each `Comments close` date with today.
- **The record has `Comments close` and no `Comment at` link.** The agency may take comments another way. Point the user to the ADDRESSES section of the document at the federalregister.gov link.
- **The record has no `Comments close`.** Say the record lists no closing date. Do not infer one from the publication date.

## Empty results and errors

- **"No open comment periods found."** Try broader or different topic words. If it is still empty, say no open proposed rules matched, and that this covers proposed rules in the Federal Register only.
- **A header count of 100 with no query.** The count may be capped, so report it as "at least 100". The list shows only as many as `limit`, 20 at most, soonest first.
- **"Could not be reached."** Try once more, then tell the user the Federal Register service is unavailable and give them federalregister.gov.

## What the answer looks like

Lead with how many relevant proposals are open and the nearest deadline. Then one entry per document, soonest closing first:

- title and agency
- document number
- published date
- comments close date, with the days left as of today
- where to comment: the `Comment at` link from the full record
- the federalregister.gov link
- one sentence on what is proposed, from the summary

Then add the cautions that apply:

- The closing date is a date only. The cutoff time and time zone are in the document's DATES section.
- The document's ADDRESSES section lists every accepted way to comment and the docket number to cite.
- A deadline can be extended or reopened by a later document. Say whether you checked.

## Helping with a comment

If the user asks for help drafting a comment:

- Work from the user's own views, experience and facts. Do not invent data or claim expertise the user did not state.
- The record holds a summary only. Ask the user to paste the sections they want to address, or to read them at the link, before you characterize what the proposal says in detail.
- Tell the user that comments on Regulations.gov are generally posted publicly, so they should leave out personal details they do not want published.
- You do not submit anything. The user submits through the official link.

## Limits to state honestly

- Coverage is proposed rules published in the US Federal Register. State rulemakings and comment requests outside the Federal Register are not included.
- "Open" is judged from the closing date in the record. The agency's own document controls if the two ever differ.
- This is public information, not legal advice.

## Examples

**"Which proposed rules about offshore wind are open for comment?"**
Call `open_comment_periods` with `query: "offshore wind"`. Screen out results that only mention the phrase. Open the rest with `get_federal_document`, then list each with its closing date, days left and `Comment at` link. If none are truly about offshore wind, say so and name the nearest matches you set aside.

**"When do comments close on the deepwater port licensing rule?"**
Call `open_comment_periods` with `query: "deepwater port licensing"`, open the match with `get_federal_document`, and report the closing date and the comment link. Then search the title with `type: proposed_rule` for a later extension and say whether one exists.

**"What closes for comment this week?"**
Call `open_comment_periods` with no `query` and `limit: 20`. Keep the entries whose closing date falls within seven days of today, and say that the list is the first 20 by closing date, not every open proposal.
