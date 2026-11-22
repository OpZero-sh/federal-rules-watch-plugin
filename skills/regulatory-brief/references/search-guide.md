# Search guide for `search_federal_documents`

Notes on how the search behaves, taken from the tool schema and from live results.

## Arguments

| Argument | Values | Notes |
| --- | --- | --- |
| `query` | Up to 100 characters | Topic words. Optional when at least one filter is set. |
| `agency` | A Federal Register agency slug, up to 80 characters | Must be the full slug. See below. |
| `type` | `any` (default), `rule`, `proposed_rule`, `notice`, `presidential` | One type per call. |
| `since` | `YYYY-MM-DD` | Documents published on or after this date. There is no "until" argument. |
| `sort` | `relevance`, `newest` | Default is relevance with a query, newest without one. |
| `limit` | 1 to 20, default 8 | There is no paging. Narrow the search to see more. |

## What a result line contains

Each result has a title, a summary cut short at roughly 260 characters with an ellipsis, then labeled lines:

- `Type`: Rule, Proposed Rule, Notice or Presidential Document.
- `Agency`: one or more agencies separated by semicolons, parent department first, for example "Transportation Department; Federal Aviation Administration".
- `Published`: the issue date.
- `Document`: the document number.
- `Comments close`: present only when the record has a comment closing date.
- `Effective`: present only when the record has an effective date.
- `Significant: yes`: present only when the Federal Register flags the document as a significant regulatory action under Executive Order 12866.
- A federalregister.gov link.

The header line gives the total match count and the order used. The count stops at 10000.

A full record from `get_federal_document` has the same lines with the complete summary, plus `Comment at` with a Regulations.gov link when the document accepts comments there.

## Agency slugs

A slug is the agency's Federal Register name in lower case with hyphens between words and with punctuation dropped. The `Agency` line of any result shows the names to convert.

Slugs confirmed against the live service:

| Agency | Slug |
| --- | --- |
| Environmental Protection Agency | `environmental-protection-agency` |
| Federal Aviation Administration | `federal-aviation-administration` |
| Food and Drug Administration | `food-and-drug-administration` |
| Securities and Exchange Commission | `securities-and-exchange-commission` |
| Centers for Medicare & Medicaid Services | `centers-for-medicare-medicaid-services` |
| Occupational Safety and Health Administration | `occupational-safety-and-health-administration` |
| Internal Revenue Service | `internal-revenue-service` |
| Transportation Department | `transportation-department` |
| Federal Communications Commission | `federal-communications-commission` |
| Consumer Financial Protection Bureau | `consumer-financial-protection-bureau` |

Rules of thumb:

- Cabinet departments are named with the subject first: "Transportation Department", "Labor Department", "Treasury Department". The slug follows that order.
- A parent department slug returns documents from its component agencies as well.
- An abbreviation such as `faa` or `epa` is not a slug. The service answers with "could not be reached" and HTTP 400, which reads like an outage but is a bad argument.
- For an agency not in the table, build the slug from the name on a result's `Agency` line. If the call fails, drop `agency` and put the agency name in `query`.

## Relevance and matching

- The search matches words across the whole document, not just the title. A query for "offshore wind" can return a marine mammal rule or an oil and gas rule that mentions the phrase. Screen every result by title and summary.
- Agency vocabulary works better than everyday words. Examples seen in practice: "unmanned aircraft systems" finds the drone rulemakings that "drone" buries under unrelated aviation documents.
- `sort: newest` with a broad query returns recent documents that match weakly. For a recent digest on a narrow subject, add `type` or `agency`, or use relevance order with `since`.
- A search for a rule's title in relevance order returns the original document along with its extensions, reopenings and corrections. This is the way to trace a rulemaking.
- Documents dated for the next issue can appear a day early.

## Errors

| Message | Meaning | What to do |
| --- | --- | --- |
| "0 matching documents" | Nothing matched | Broaden: fewer words, no `type`, no `since` |
| "could not be reached just now (Upstream answered HTTP 400)" | A bad argument, most often an `agency` value that is not a real slug | Fix the slug, or drop `agency` and name the agency in `query` |
| "Give since as YYYY-MM-DD." | `since` is not a date in that form | Convert the window to a real date and retry |
| "could not be reached just now" with another status | The Federal Register API is unavailable | Retry once, then tell the user |
| "No Federal Register document NNNN" | No document has that number | Recover the number with a title search |
