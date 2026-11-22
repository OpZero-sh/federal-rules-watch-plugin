# Record fields and identifiers

What each line of a `get_federal_document` record means, and how the identifiers people quote differ from one another.

## Fields in a record

| Line | Meaning | Notes |
| --- | --- | --- |
| Title | The document's title as published | Follow up documents add a phrase such as "Extension of Comment Period" or "Correction" |
| Summary | The summary written by the agency | Full length in `get_federal_document`, cut short in search results. Presidential documents usually have none |
| `Type` | Rule, Proposed Rule, Notice or Presidential Document | The section of the Federal Register the document was filed in |
| `Agency` | Issuing agencies, separated by semicolons | A parent department is listed before its component. Joint documents list every agency |
| `Published` | The Federal Register issue date | Can be one business day ahead of today |
| `Document` | The Federal Register document number | The only identifier `get_federal_document` accepts |
| `Comments close` | Last day of the comment period | Only when the record has one. Date only |
| `Effective` | Effective date in the record | Only when the record has one. Read it with the type in mind |
| `Significant: yes` | Flagged as a significant regulatory action under Executive Order 12866 | Absent when not flagged. It marks rules that went through White House regulatory review. It says nothing about whether the rule is good or bad |
| `Comment at` | Regulations.gov link for submitting a comment | Only when the Federal Register has one |
| Link | The document's page on FederalRegister.gov | That page carries the full text and a link to the official edition |

Fields the record does not have: the regulatory text, the CFR parts affected, the page citation, the docket ID as its own field, the Regulation Identifier Number, agency contacts, and supporting documents.

## The three dates

- **Published.** The day the document appeared in the Federal Register. Deadlines and effective dates in the document are often counted from it, but the record's own date lines are what to report.
- **Effective.** For a final rule, the day it takes legal effect as published. For other types the date can refer to something narrower, such as the date of an order or a determination. A final rule's compliance dates can be later than its effective date and are found only in the document.
- **Comments close.** The last day the agency accepts comments. A later document can extend or reopen the period.

Never fill a missing date by rule of thumb. Say it is not in the record.

## Identifiers people confuse

| Identifier | Example | What it is | Can the tools look it up? |
| --- | --- | --- | --- |
| Document number | `2026-22617` | Assigned by the Office of the Federal Register to one published document. Recent numbers are a four digit year, a hyphen and five digits. Older documents can use other forms, so pass a number exactly as given | Yes, with `get_federal_document` |
| Docket ID | `MARAD-2026-0728` | The agency's file for a whole proceeding. One docket can hold many Federal Register documents plus comments and supporting material | No. It appears only inside a `Comment at` link. Search by title instead |
| Regulations.gov document ID | `MARAD-2026-0728-0001` | One item inside a docket. The docket ID plus a sequence number | No. Seen in `Comment at` links |
| Page citation | `91 FR 12345` | Volume and page of the printed Federal Register | No. Search by title or topic |
| Regulation Identifier Number | `2133-AB99` | Tracks a rulemaking in the government's regulatory agenda across its stages | No. Search by title or topic |
| CFR citation | `14 CFR part 107` | Where a rule sits in the Code of Federal Regulations after it is final | No. Search by subject words |
| Executive order number | `EO 12866` | Numbering for executive orders | No. Search with `type: presidential` and the title or subject |

The examples for page citation and Regulation Identifier Number show the format only.

A document number identifies one document. A docket ID identifies a proceeding. Two documents are part of the same proceeding when they share a docket ID, or when one names the other in its title or summary.

## FederalRegister.gov and the official edition

Links in a record go to FederalRegister.gov, which presents each document as a web page. Each page links to the official edition of the same document. When exact wording, page numbers or legal citation matter, send the user to that official edition through the page link.
