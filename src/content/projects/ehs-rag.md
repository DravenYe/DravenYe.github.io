---
title: EHS Compliance Assistant
tagline: An AI system that turns regulations into obligation-level gap analysis against a company's own procedures.
description: A retrieval-augmented EHS compliance system for Chinese chemical manufacturing — hybrid search, obligation-level gap analysis, and self-auditing review agents.
status: Active · v2
order: 1
featured: true
stack:
  - RAG
  - BGE-M3
  - ChromaDB
  - BM25 + jieba
  - DeepSeek
  - Streamlit
  - Python
heroImage: ../../assets/ehs-rag/cover.png
---

## What it does

EHS compliance in Chinese chemical manufacturing is document-intensive: a mid-sized plant is subject to 20+ national and local regulations, each with dozens of articles, and must demonstrate compliance through an equally large library of internal procedure documents.

This system handles the **first pass** automatically — so the compliance professional's expertise can focus on judgment, not lookup.

You ask a question, point it at a regulation, or run a full gap analysis, and it:

- **Finds** the relevant articles via hybrid retrieval — semantic search (BGE-M3) fused with BM25 keyword search, then cross-encoder reranking.
- **Decomposes** each regulatory article into specific, role-assigned obligations instead of vague "the company should comply" statements.
- **Assesses** each obligation against the company's actual procedure documents, citing the specific file that does (or doesn't) cover it.
- **Reviews its own output** with rule-based agents that catch hallucinated requirements, mismatched evidence, and skewed risk ratings.
- **Closes the loop**: an evidence-audit agent reviews remediation proof the user submits — and refuses to auto-close a gap it can't verify.

## The design principle

Compliance work has two cognitive modes: **retrieval** (finding the law, the article, the obligation) and **judgment** (deciding whether a procedure actually meets the requirement in practice). AI can take over the first almost entirely. The second stays human. The whole system is built around collapsing the first so the second has room to breathe.

## Selected engineering problems

A few of the hard parts, each written up in detail in the build log:

- **The semantic search blind spot** — why pure vector search missed a directly-relevant procedure document, and how hybrid retrieval rescued it.
- **Obligations that sound authoritative but aren't** — stopping the LLM from inventing plausible-but-fake frequency and retention requirements in a context where that's genuinely dangerous.
- **Making AI audit humans without being fooled** — a review agent that audits submitted evidence from an auditor's stance, and never closes a gap on the strength of rhetoric alone.

→ **Read the full story:** [Building an AI-Powered EHS Compliance System](/blog/building-an-ai-powered-ehs-compliance-system/)

*Note: This is a personal research project. The compliance judgments it produces are first-pass aids, not a substitute for professional review.*
