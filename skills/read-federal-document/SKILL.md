---
name: read-federal-document
description: "Look up one Federal Register document by its document number or federalregister.gov link and explain what it is, who issued it, what its dates mean and where the official text and comment page are. Use when someone pastes a document number such as 2026-22617 or a federalregister.gov URL, or asks \"what is this document\", \"is this a final rule\", \"when does this rule take effect\", \"explain this Federal Register notice\"."
---

# Read a Federal Register document

Retrieve one record with `get_federal_document` and explain it in plain words: the type and its legal weight, the issuing agencies, each date, and the links to the full text and the comment page.

## When to use this skill

Use it when the user has a specific document in hand: a document number, a federalregister.gov link, or a title precise enough to find one record.

Use `regulatory-brief` to search a topic or an agency, and `comment-deadlines` when the main question is about commenting.

This skill explains the record. It does not interpret the regulatory text or say whether the document applies to the user's situation.

## Tool

`get_federal_document` takes one argument, `document_number` (up to 20 characters), and returns the title, full summary, type, agencies, published date, and when present the comment closing date, effective date, significance flag, comment link and the federalregister.gov link.

`search_federal_documents` is the fallback for finding the number.

## Workflow

1. **Get the document number.**
   - A number such as `2026-22617` can be used as is. Keep it exactly as written, with leading zeros.
   - In a federalregister.gov link the number is the path segment after the date: in `/documents/2026/11/05/2026-22617/deepwater-port-application...` it is `2026-22617`.
   - A title, a docket ID, a page citation such as "91 FR 12345", a Regulation Identifier Number, an executive order number or a CFR section is not a document number. Use `search_federal_documents` with the title or topic words to find the record, then confirm with the user if more than one fits. See [references/record-fields.md](references/record-fields.md) for how these identifiers differ.
2. **Call `get_federal_document`.**
3. **Explain the record** in this order:
   - What it is: the type in plain words, and what that type means. A proposed rule creates no obligation. A final rule has legal force from its effective date. A notice announces or requests something without setting a general rule. A presidential document directs the executive branch.
   - Check the title before you label it. A record filed as a proposed rule or a rule may be a follow up such as an extension, a correction or a confirmation of an effective date.
   - Who issued it: the agencies on the `Agency` line.
   - What it does: restate the summary accurately and briefly. Do not add detail the summary does not contain.
   - Dates: published, effective, comments close, each under its own label, with what each means for this type.
   - Where to go: the federalregister.gov link for the full text and official edition, and the `Comment at` link when the record has one.
4. **Offer the next step** that fits: check for later documents on the same rulemaking with a title search, or see open comment periods on the topic.

## Decision points

- **The user asks "is this in effect?"** Give the effective date from the record and compare it with today's date. Then say what the record cannot show: later delays, stays, amendments or court rulings. For a proposed rule, say plainly that it is not in effect and may change.
- **The user asks "does this apply to me?"** Restate who the summary says is covered, if it says. Do not go further. Point to the contact in the document's FOR FURTHER INFORMATION CONTACT section, or to a lawyer.
- **The user asks for the actual rule text, a section, or a page number.** The record has a summary only. Give the federalregister.gov link, where the full text and the official edition are available. If the user pastes text from the document, you can explain that text.
- **The summary is missing.** Presidential documents and some notices have none. Report the title, type, date and link, and say the record has no summary.

## Errors

- **"No Federal Register document NNNN."** The number is wrong, incomplete, or belongs to another identifier scheme. Ask the user to check it, or search by title.
- **"Could not be reached."** Try once more, then tell the user the Federal Register service is unavailable and give them the federalregister.gov link if they supplied one.

## What the answer looks like

```text
[Title]
[Type in plain words] from [agency]. Document [number], published [date].

What it does: [two or three sentences from the summary]

Dates
- Published: [date]
- Effective: [date, or "not listed in the record"]
- Comments close: [date with days left as of today, or "no comment date in the record"]

Links
- Full text and official edition: [federalregister.gov link]
- Submit a comment: [Comment at link, when present]

What this record does not show: [the cautions that apply]
```

## Limits to state honestly

- The record is metadata and a summary from the Federal Register. It is not the regulatory text.
- Dates have no time of day. Compliance dates and phased dates are in the document's DATES section, not in the record.
- The record reflects the document as published and does not track what happened afterward.
- This is public information, not legal advice.

## Examples

**"What is 2026-22617?"**
Call `get_federal_document` with `document_number: "2026-22617"`. Report that it is a proposed rule from the Maritime Administration on deepwater port licensing, give the published date and the comment closing date with days left, pass on the `Comment at` link, and say that a proposal creates no obligation until a final rule is published.

**"When does this take effect? https://www.federalregister.gov/documents/2026/10/22/2026-21565/establishment-of-class-e-airspace-havana-il"**
Take `2026-21565` from the link, call `get_federal_document`, and report that it is a final rule from the FAA with the effective date in the record. Add that the record shows the rule as published.

**"Can you pull up Executive Order 14xxx?"**
The tool does not look up executive order numbers. Ask for the title or subject, call `search_federal_documents` with `type: "presidential"` and those words, confirm the match with the user, then call `get_federal_document` with its document number.
