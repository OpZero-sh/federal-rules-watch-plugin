---
name: regulatory-brief
description: "Search the US Federal Register and brief the user on rules, proposed rules, notices and presidential documents for a topic or an agency. Use when someone asks what an agency published, what is new in federal regulation, whether something is still a proposal or already a final rule, or wants a digest since a date. Typical requests: \"any new EPA rules on PFAS\", \"what did the FAA publish this month\", \"latest executive orders\", \"is there a federal rule about drone registration\", \"compare the proposed and final rule\"."
---

# Regulatory brief

Find Federal Register documents for a topic, an agency, a document type or a time window, then report what each one is, what its dates mean and where the official record lives.

## When to use this skill

Use it for searches, digests and comparisons across documents.

Use a different skill when the request is narrower:

- `comment-deadlines` when the question is what is open for public comment or when comments close.
- `read-federal-document` when the user already has a document number or a federalregister.gov link and wants that one document explained.

This skill does not cover state or local rules, the current text of the Code of Federal Regulations, court decisions, bills in Congress, or agency guidance that was never published in the Federal Register. It reports what a record says. It does not decide whether a rule applies to a person or a business. Send that question to the agency contact named in the document or to a lawyer.

## Tools

| Tool | Use | Arguments that matter |
| --- | --- | --- |
| `search_federal_documents` | Search or browse documents | `query` (topic words, up to 100 characters), `agency` (Federal Register agency slug), `type` (`any`, `rule`, `proposed_rule`, `notice`, `presidential`), `since` (`YYYY-MM-DD`, published on or after), `sort` (`relevance` or `newest`), `limit` (1 to 20, default 8) |
| `get_federal_document` | One full record | `document_number`, exactly as a search returned it, for example `2026-22617` |
| `open_comment_periods` | Proposed rules still open for comment | See the `comment-deadlines` skill |

`query` is optional when at least one filter is set. With a query the default order is relevance. With filters alone the default order is newest.

## Workflow

1. **Pin down the request.** You need a topic or an agency, and it helps to know the document type and the time window. Ask one question only when the answer changes the search, for example which agency the user means by "the department". Otherwise search with what you have.
2. **Turn relative dates into a real date.** "This month", "since January" and "the last 90 days" become a `since` value in `YYYY-MM-DD` form, counted from today's date. If the user says only "recent" or "latest", use `sort: newest` without `since` and state the date range of what came back.
3. **Pick the search shape.**
   - Latest on a topic: `query` plus `sort: newest`, with `type` and `since` when known.
   - Background on a topic: `query` alone. Relevance order puts the central documents first, including older ones.
   - Everything from an agency: `agency` alone, or with `type` and `since`.
   - Executive orders, proclamations and presidential memoranda: `type: presidential`.
   - Final rules only: `type: rule`. Proposals only: `type: proposed_rule`.
4. **Screen the results.** The search matches words anywhere in the document, so some results only mention the topic in passing. Read each title and summary, keep the ones that are about the topic, and tell the user when you set others aside. If most results are off topic, search again with the agency's own term, for example "unmanned aircraft systems" in place of "drone".
5. **Open what you will rely on.** Call `get_federal_document` for each document you describe in detail or whose dates the user will act on. The full record carries the complete summary and, when one exists, the comment link.
6. **Classify each document.** State the type and what that type means. See [references/document-types.md](references/document-types.md) for the legal meaning of each type and the cases that mislead, such as a deadline extension filed under Proposed Rule.
7. **Write the brief** in the format below.

## Reading the dates

- **Published** is the Federal Register issue date. It can be one business day ahead of today because the next issue is already indexed.
- **Effective** is the effective date in the record. On a final rule it is when the rule takes effect, unless a later document changed it. A proposed rule or a notice can also carry an effective date, which does not mean a new requirement is in force. A rule can show an effective date earlier than its publication date when the document confirms or corrects an earlier action.
- **Comments close** is the last day for public comments. It is a date only. The time of day and the accepted ways to comment are in the document.
- A date that is absent from the record is unknown. Say "not listed in the record". Never estimate a date from the usual practice.

## Empty results and errors

- **0 matching documents.** Broaden the search: fewer words, no `type`, no `since`, or the agency's term for the subject. Tell the user what you tried. An empty search does not show that no regulation exists. The Federal Register is a daily publication, and a rule issued years ago may sit under different words.
- **"Could not be reached" with HTTP 400 right after you set `agency`.** The slug is probably wrong. Short forms such as `faa` fail this way. Use the full slug from [references/search-guide.md](references/search-guide.md), or drop `agency` and put the agency name in `query`.
- **"Could not be reached" otherwise.** Try once more. If it fails again, say the Federal Register service is unavailable and point the user to federalregister.gov.
- **"No Federal Register document" for a number.** The number is wrong or incomplete. Search by title words to recover it.
- **A count of 10000.** The count is capped. Report it as "at least 10,000".
- **More than 20 results wanted.** One call returns at most 20. Narrow by `type`, `agency` or `since`, or split the window into several searches.

## What the answer looks like

Lead with a one or two sentence answer to the question. Then list the documents, newest first unless the user asked for relevance. For each one give:

- title
- type, in plain words ("final rule", "proposed rule", "notice", "presidential document")
- agency
- document number
- published date, plus effective date and comment closing date when the record has them
- one sentence on what it does, drawn from the summary
- the federalregister.gov link

For a comparison, put proposals and final rules in separate groups or mark each line. Only call two documents stages of the same rulemaking when the record supports it: the same title, an explicit reference in the summary, or the same docket in the comment link. Similar subject matter is not enough.

Close with the limits that apply: the record is metadata and a summary, the regulatory text is at the link, and the search covered only the window you stated. Templates are in [references/brief-templates.md](references/brief-templates.md).

## Limits to state honestly

- The data is the US Federal Register as served by the Federal Register API. Records carry a title, type, agencies, dates, a summary and links. They do not carry the regulatory text, the docket contents, or the citation to the Code of Federal Regulations.
- Links go to FederalRegister.gov. That page links to the official edition of the document.
- A record does not show whether a rule was later stayed, delayed, amended, withdrawn or struck down in court.
- This is public information, not legal advice.

## Examples

**"Any new EPA rules on PFAS this year?"**
Call `search_federal_documents` with `query: "PFAS"`, `agency: "environmental-protection-agency"`, `since` set to January 1 of the current year and `sort: newest`. Screen the results, open the final rules and proposals with `get_federal_document`, and answer in two groups: final rules with effective dates, and proposals with comment closing dates.

**"What did the FAA publish about drones lately?"**
Call `search_federal_documents` with `query: "unmanned aircraft systems"`, `agency: "federal-aviation-administration"` and `sort: newest`. A search for "drone" under that agency also returns airspace and airworthiness documents that mention the word once, so keep only the ones about unmanned aircraft and say that you filtered.

**"Show me this month's executive orders."**
Call `search_federal_documents` with `type: "presidential"`, `since` set to the first day of the month and `sort: newest`. Presidential records usually have no summary, so report title, document number, published date and link, and note that the published date is not the signing date.
