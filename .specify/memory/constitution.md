# React Starter Constitution

<!--
Sync Impact Report
- Version change: unset → 1.0.0
- Modified principles: (template → concrete)
	- [PRINCIPLE_1_NAME] → Clean Code & Simplicity
	- [PRINCIPLE_2_NAME] → Simple UX & Responsiveness
	- [PRINCIPLE_3_NAME] → Minimal Dependencies & Stability
	- [PRINCIPLE_4_NAME] → Source of Truth & Incremental Changes
	- [PRINCIPLE_5_NAME] → Testing, Specs & Governance
- Added sections: Additional Constraints (testing rules), Development Workflow
- Removed sections: none
- Templates requiring updates:
	- .specify/templates/plan-template.md: ✅ aligns (uses Constitution Check)
	- .specify/templates/spec-template.md: ✅ aligns
	- .specify/templates/tasks-template.md: ⚠ pending manual review for "Tests are OPTIONAL" language vs project Testing Constraints
	- .specify/templates/constitution-template.md: ✅ replaced by memory/constitution.md
- Follow-up TODOs:
	- TODO(CONSTITUTION_RATIFICATION): confirm ratification stakeholders and record ratification PR/issue
-->

## Core Principles

### Clean Code & Simplicity

All code MUST be simple, readable, and self-explanatory. Developers MUST prefer clarity over cleverness, follow existing repository patterns, and avoid unnecessary abstraction. Naming, folder layout, and public APIs MUST be consistent with comparable modules in the codebase. Refactors MUST be small and focused; broad rewrites are PROHIBITED unless explicitly approved by the maintainers.

### Simple UX & Responsiveness

User-facing features MUST be intuitive and require minimal steps. UI components MUST prioritize accessibility and a mobile-first, responsive layout. Visual affordances and state transitions MUST be obvious; loading, empty and error states MUST be handled explicitly.

### Minimal Dependencies & Stability

New dependencies MAY only be introduced when there is a clear, documented benefit that cannot be satisfied by existing code or widely-accepted native APIs. Dependency additions MUST include a short rationale, a review of alternatives, and a maintainer assigned for future upgrades.

### Source of Truth & Incremental Changes

The existing codebase is the primary source of truth. Authors MUST reflect current behavior when writing specs or code — do not assume ideal implementations. Changes MUST be incremental, backward compatible by default, and include a clear migration path for any breaking changes. Breaking changes require explicit versioning and a documented rollout plan.

### Testing, Specs & Governance

Tests and specs govern acceptable changes: the project enforces a spec-before-change workflow. Developers MUST create a clear feature specification (overview, current behavior, problems, proposed change, edge cases, acceptance criteria) before implementing. Do NOT add new tests unless required by a spec; existing tests MUST be preserved. When tests break due to an intentional behavioral change, update only the minimal tests necessary to reflect the new, approved behavior.

## Additional Constraints

Testing Discipline:

- Existing tests are part of the project's contract and MUST not be removed.
- New tests are DISCOURAGED unless explicitly requested in the feature spec; when added they MUST be scoped and justified in the spec.

Security & Environment:

- Environment variables for browser builds MUST use the `VITE_` prefix.
- Secrets MUST never be stored in client-visible env vars or committed to source control.

Performance and Accessibility:

- Performance budgets and accessibility checks SHOULD be documented in feature specs when relevant.

## Development Workflow

- Spec-first: Every significant change MUST begin with a specification following the spec-template.
- Pull requests MUST reference the feature spec and include a short summary of how the change satisfies acceptance criteria.
- Code review: at least one approving review from a maintainer is REQUIRED for non-trivial changes.
- CI gates: Linting and type-checking MUST pass before merge. Tests that currently exist MUST continue to pass.

## Governance

Amendments to this constitution require a documented proposal (specifying rationale, migration steps, and impact analysis) and approval by the core maintainers. Minor wording changes that do not alter obligations MAY be approved by a single maintainer; material additions or removals of principles require broader consensus.

Versioning policy:

- MAJOR: Backward incompatible governance or principle redefinition.
- MINOR: New principle or materially expanded guidance.
- PATCH: Clarifications, wording fixes, and non-semantic refinements.

Compliance and review:

- All feature plans MUST include a "Constitution Check" (as present in plan-template.md) to validate adherence.
- Non-compliant changes MUST include an explicit, documented exception approved by maintainers.

**Version**: 1.0.0 | **Ratified**: 2026-03-17 | **Last Amended**: 2026-03-17
