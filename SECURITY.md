# Security Policy

## Supported Versions

ProjectPilot AI is under active development on the `main` branch. There are no tagged releases yet, so security fixes are applied directly to `main`.

| Branch | Supported          |
| ------ | ------------------ |
| main   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in ProjectPilot AI, please **do not** open a public GitHub issue.

Instead, report it privately using one of the following methods:

1. **GitHub Private Vulnerability Reporting (preferred):**
   Go to the [Security tab](https://github.com/Yogender-verma/project-pilot/security) of this repository and click **"Report a vulnerability"**. This creates a private report visible only to maintainers.
2. **Direct contact:** If private reporting is unavailable, reach out to the maintainer, [@Yogender-verma](https://github.com/Yogender-verma), via a private GitHub message.

Please include as much of the following as you can:

- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept code, request/response samples, etc.)
- Affected file(s), route(s), or component(s)
- Any suggested remediation, if known

## Scope

This policy covers the ProjectPilot AI application itself, including:

- Next.js API routes / server actions (`app/`)
- Authentication and session handling (Clerk integration)
- Database access via Prisma (`prisma/`, `lib/`)
- Client-side code that handles user input or auth state

Vulnerabilities in third-party dependencies should generally be reported to the upstream project, though we're happy to hear about them here too if they affect this application directly (e.g. via Dependabot alerts).

## Response Expectations

This is a community-maintained project. We aim to acknowledge reports within **5 business days** and will keep you updated as a fix is developed. Please allow a reasonable disclosure window before sharing details publicly.

## Disclosure

Once a fix is released, we will credit the reporter (unless anonymity is requested) in the fix's commit message or release notes.