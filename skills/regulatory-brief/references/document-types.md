# Federal Register document types

The Federal Register is the daily publication of the US government for agency rules, proposed rules, notices and presidential documents. Every record from this plugin carries one of four types. The type tells you what legal weight the document has. It does not tell you everything, so read the title and summary as well.

## Rule

Shown as `Type: Rule`. Search with `type: rule`.

What is filed here:

- Final rules. A final rule has the force of law from its effective date and usually amends the Code of Federal Regulations.
- Interim final rules. These take effect without a prior proposal and often invite comments after the fact.
- Direct final rules. These take effect on a stated date unless the agency receives adverse comments, in which case the agency withdraws them.
- Follow up documents about a rule: corrections, confirmations of an effective date, delays of an effective date, and similar housekeeping.

What to say:

- Report the effective date from the record. Agencies generally make a final rule effective at least 30 days after publication, with exceptions, so never assume the date. If the record has none, say so.
- An effective date is not always the date people must comply. Compliance dates, phased dates and delayed sections are set out in the DATES section of the document itself.
- A title such as "Confirmation of Effective Date" or "Correction" means the record is about an earlier rule. Its effective date can be earlier than its publication date.
- A record does not show later events. A rule may have been stayed, amended, withdrawn or vacated after publication. Say that the record reflects the document as published.

## Proposed Rule

Shown as `Type: Proposed Rule`. Search with `type: proposed_rule`.

What is filed here:

- Notices of proposed rulemaking, where the agency publishes draft rule text and asks for comment.
- Advance notices of proposed rulemaking, where the agency asks questions before drafting.
- Supplemental proposals that revise an earlier proposal.
- Follow up documents about a proposal: extensions of the comment period, reopenings, denials of an extension request, withdrawals, corrections and hearing announcements.

What to say:

- A proposed rule creates no obligation. It may change before it is final, and it may never become final.
- Not every record of this type is itself a proposal. A document titled "Denial of Extension of Comment Period" is filed as a proposed rule and has no comment date of its own. Check the title before calling something "a new proposal".
- A proposed rule record can show an effective date, for example for a part of the document that is not the proposal. Do not describe the proposal as in effect.
- A later document can change the comment deadline. See the `comment-deadlines` skill.

## Notice

Shown as `Type: Notice`. Search with `type: notice`.

What is filed here: documents that are not rules or proposals. Common kinds are meeting and hearing announcements, requests for comment on information collections under the Paperwork Reduction Act, availability of reports and guidance, applications, petitions, orders, determinations, and advisory committee business.

What to say:

- A notice does not set a general regulatory requirement. Some notices record an order or a determination that binds the parties named in it.
- Notices can carry a comment closing date and an effective date. `open_comment_periods` lists proposed rules only, so comment requests in notices are found with `search_federal_documents` and `type: notice`.
- Many notices are routine. In a digest, group them after rules and proposals unless the user asked for notices.

## Presidential Document

Shown as `Type: Presidential Document` with the agency `Executive Office of the President`. Search with `type: presidential`.

What is filed here: executive orders, proclamations, presidential memoranda, determinations and notices signed by the President.

What to say:

- These direct the executive branch. An executive order is not an agency regulation. Agencies often follow one with their own rulemaking, which then appears as a proposed rule or a rule.
- The record usually has a title, a publication date and a link, with no summary. The executive order number and the signing date are on the linked page, not in the record.
- The published date is the Federal Register issue date. It is later than the signing date.

## How the types relate in a typical rulemaking

1. Optional early step: an advance notice of proposed rulemaking (type Proposed Rule).
2. The proposal: a notice of proposed rulemaking with a comment period (type Proposed Rule).
3. Optional follow ups: extension or reopening of the comment period, supplemental proposal (type Proposed Rule).
4. The final rule with an effective date (type Rule).
5. Optional follow ups: corrections, effective date changes (type Rule).

Not every rulemaking has every step, and many proposals end without a final rule. Treat two documents as steps in the same rulemaking only when the record supports it.
