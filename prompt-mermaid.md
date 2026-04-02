Here's a flowchart showing the user authentication process:

<artifact type="application/vnd.ant.mermaid" title="User Authentication Flow">
flowchart TD
    A([User Visits Login Page]) --> B[Enter Username & Password]
    B --> C{Credentials Valid?}
    C -- Yes --> D([Redirect to Dashboard])
    C -- No --> E([Show Error Message])
    E --> B
</artifact>

This diagram illustrates the complete authentication workflow from initial visit to dashboard access.