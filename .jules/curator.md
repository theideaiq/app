## 2025-05-23 - Domain Component Co-location
Structure: Domain-specific components should live in their respective feature folders (e.g., `components/store`, `components/auth`) rather than generic `components/ui`.
Rule: `components/ui` is reserved for reusable, domain-agnostic UI primitives (like Buttons, Inputs, Modals). Components that import domain types or contain business logic specific to a feature must be moved to that feature's directory.
