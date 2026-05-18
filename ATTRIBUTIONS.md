# Third-Party Attributions & Open Source Acknowledgments

> QatarSpec Pro incorporates ideas, formulas, and patterns from the following
> open-source projects. No source code was copied verbatim — all implementations
> are original vanilla JavaScript written specifically for QCS 2024 compliance.

---

## 1. Blueprints (Blueprints-org)

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/Blueprints-org/blueprints |
| **License** | MIT |
| **What we used** | Engineering formulas (beam deflection, column design, footing, shear) rewritten from Python to JavaScript. Steel section database concept (HEA/HEB/IPE profiles). Test methodology — expected-result validation pattern for each calculator. |
| **What we did NOT use** | Python codebase, Eurocode implementations directly (QatarSpec uses QCS 2024 + ACI 318), library as dependency. |
| **Files affected** | `data_calcs.js`, `js/core/calculators-ui.js` |

---

## 2. DDC_Skills_for_AI_Agents_in_Construction

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/datadrivenconstruction/DDC_Skills_for_AI_Agents_in_Construction |
| **License** | Apache 2.0 |
| **What we used** | Prompt engineering patterns for ITP generation, NCR generation, Method Statement generation, and Material Submittal review — all adapted for QCS 2024 references and Qatar-specific requirements. SKILL.md format concept as system prompts for Gemini API. |
| **What we did NOT use** | 206 out of 221 skills (not relevant to QCS). Claude/OpenAI API integrations (QatarSpec uses Gemini). Complex ETL pipelines. |
| **Files affected** | `api/ai-proxy.js`, `inline-scripts.js` (domain routing) |

---

## 3. OpenConstructionEstimate-DDC-CWICR

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/datadrivenconstruction/OpenConstructionEstimate-DDC-CWICR |
| **License** | Apache 2.0 |
| **What we used** | Concept of vector-based semantic search for construction documents. Data chunking strategy (document → sections → paragraphs with metadata). API pattern connecting frontend to vector database. |
| **What we did NOT use** | Qdrant (replaced with Supabase pgvector). n8n workflow automation. Cost estimation functionality. |
| **Files affected** | `api/qcs-search.js`, `api/generate-embeddings.js`, `api/setup-vectors.js` |

---

## 4. CalcForge

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/slukiceng/CalcForge |
| **License** | MIT |
| **What we used** | UI/UX pattern inspiration for calculator input/output layouts. Multi-step calculation display concept. Step-by-step solution explanation pattern with engineering references. |
| **What we did NOT use** | PyNite (3D FEM), PySlope, concrete-properties library. Python backend. Docker deployment. |
| **Files affected** | `data_content_buildings.js` (bld_calculator UI design), `inline-scripts.js` (step display) |

---

## 5. structural_llama

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/joreilly86/structural_llama |
| **License** | MIT |
| **What we used** | System prompt patterns for engineering-focused LLM responses — how to guide an LLM to provide answers with structural engineering references. Example question-answer patterns for engineering Q&A. |
| **What we did NOT use** | Llama2/3 local deployment (QatarSpec uses Gemini API). Docker setup. GPU server requirements. |
| **Files affected** | `api/ai-proxy.js` (system prompts) |

---

## 6. Awesome-Physical-Engineering-AI

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/010zx00x1/Awesome-Physical-Engineering-AI |
| **License** | MIT |
| **What we used** | Reference list of AI/ML tools for engineering — used as research resource only. |
| **What we did NOT use** | No code was extracted. Awesome list served as discovery tool only. |
| **Files affected** | None directly |

---

## 7. model-checker (opensource-construction)

| Field | Detail |
|-------|--------|
| **Source** | https://github.com/opensource-construction/model-checker |
| **License** | MIT |
| **What we used** | Nothing currently. Reserved for future BIM/IFC integration (Enterprise tier). |
| **Files affected** | None |

---

## Compliance Notes

- All original source code in QatarSpec Pro is proprietary (see LICENSE file)
- Engineering formulas follow QCS 2024, ACI 318, BS EN 1992, and ASCE 7 — not copied from any repo
- AI prompts were written specifically for Gemini API with QCS 2024 references
- No source code was copied verbatim from any of the above repositories
- All MIT and Apache 2.0 license terms are honored through this attribution

---

*Last updated: May 2026*
