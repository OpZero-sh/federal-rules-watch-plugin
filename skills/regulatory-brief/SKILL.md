---
name: regulatory-brief
description: "Find US federal rules, proposals, notices, and comment periods for an agency or topic and summarize official document records."
---

# Federal Rules Watch

Identify the topic, agency, document type and time window. Convert relative ranges to an explicit `since` date. For a chronological digest use `search_federal_documents` with `sort: newest`. For topic background use `relevance` with search terms. To browse by agency, use the Federal Register agency slug. Distinguish rules, proposed rules, notices and presidential documents.

Use `open_comment_periods` for proposals with an open comment window, then retrieve each promising record using `get_federal_document` and its actual document number. Confirm the comment date and link shown in the detail before reporting a deadline or how to comment. Open the source if the question requires material beyond the returned abstract.

Return the agency, exact document number, type, relevant date or dates, and Federal Register link. For comparisons, sort by publication date and mark proposals and final rules explicitly. A proposed rule alone does not establish an effective requirement. Only relate two documents as stages of the same proceeding when a docket reference or explicit source text supports the connection. Give the official edition or comment link where the record supplies one.
