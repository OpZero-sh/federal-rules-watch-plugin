# How comment periods work

Background for answering questions about commenting on federal proposals. The document itself is always the authority on its own deadline and methods.

## The basics

- When an agency proposes a rule, it publishes the proposal in the Federal Register and gives the public a period to send written comments. The agency must consider the comments before it issues a final rule.
- The proposal sets its own closing date in its DATES section. There is no single length that applies to every proposal, so never work out a deadline from the publication date.
- The ADDRESSES section lists the accepted ways to comment. Most agencies take comments through Regulations.gov. Some also accept mail or have their own filing system, and a few use only their own system.
- Anyone can comment. A comment does not need a lawyer or a special format.
- Comments are generally posted publicly with the name the commenter gives.

## What the record shows

From `open_comment_periods` and `get_federal_document`:

- `Comments close`: the closing date, as a date with no time of day.
- `Comment at`: a Regulations.gov link for submitting a comment, present in the full record when the Federal Register has one. The link can use `http`. Pass it on as returned.
- The federalregister.gov link, where the DATES and ADDRESSES sections can be read in full.

The record does not show the cutoff time, the time zone, mailing addresses, page limits, or how many comments have been filed.

## The docket number inside the comment link

A comment link looks like `regulations.gov/commenton/MARAD-2026-0728-0001`. The last part is a Regulations.gov document ID. Remove the final group of digits and you have the docket ID, here `MARAD-2026-0728`. The docket is the agency's file for the whole proceeding. Two Federal Register documents with the same docket ID belong to the same proceeding.

This is the only place a docket ID appears in these records. When there is no comment link, the docket ID is in the document text at the federalregister.gov link.

## Deadlines move

An agency can change a comment deadline after publication. Each change is a separate Federal Register document, usually filed as a proposed rule, with a title built on the original title. Kinds seen in practice:

- "Extension of Comment Period": the deadline moves later.
- "Reopening of Comment Period": a closed period opens again for a new window.
- "Denial of Extension of Comment Period": the deadline stays where it was.
- "Correction": fixes an error, sometimes including a date.

How to check: call `search_federal_documents` with the original title as `query` and `type: proposed_rule`. Relevance order puts the original and its follow ups together. Open any follow up with `get_federal_document`. A follow up document often has no `Comments close` line of its own, and its summary states the new or confirmed date.

Report the check either way: "no later extension or reopening turned up in a title search" or "a later document dated [date] changes the deadline to [date]".

## Comment requests that are not proposed rules

Notices can ask for comments. The most common are information collection requests under the Paperwork Reduction Act, which usually run in two rounds. These carry a `Comments close` date in search results and are not in `open_comment_periods`. Find them with `search_federal_documents` and `type: notice`.

Interim final rules and direct final rules are filed as rules and can also invite comments. Find them with `type: rule`.

## What not to do

- Do not state a cutoff time unless the user has read it to you from the document.
- Do not tell the user a late comment will or will not be considered. That is the agency's call.
- Do not submit anything or imply that a draft has been filed.
- Do not advise on legal strategy. Point the user to the contact listed in the document's FOR FURTHER INFORMATION CONTACT section for procedural questions.
