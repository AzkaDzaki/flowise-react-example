const Divider = () => <hr className="border-border" />

const ExamplePage = () => {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-8">
      <div className="w-full max-w-3xl space-y-8">
        <section className="space-y-6">
          <header>
            <h3 className="text-base">Playground Examples</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Examples to try in the playground. Configure the chat flow ID and
              API host via the <strong>Config</strong> dialog before running the
              examples.
            </p>
          </header>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="text-sm font-semibold">Setup</h4>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>
                Open the <strong>Config</strong> dialog, select the{' '}
                <strong>General</strong> tab and set the <em>chatflowid</em> and{' '}
                <em>apiHost</em>.
              </li>
              <li>
                In the Config dialog select the <strong>Chat Window</strong>{' '}
                tab.
              </li>
              <li>
                Enable the built-in rendering options under the{' '}
                <strong>Behaviour</strong> section.
              </li>
            </ol>
          </div>

          <Divider />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Built-in renderers</h4>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Inline charts (render chart data returned by the API)</li>
              <li>Mermaid diagrams (render diagram source as a diagram)</li>
              <li>Inline HTML (render small HTML snippets such as cards)</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              These renderers are included in this project and can be toggled
              via Config → Chat Window → Behaviour.
            </p>
          </div>

          <Divider />

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="text-sm font-semibold">Example prompts</h4>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>
                  Could you generate JSON for a bar chart titled "Monthly Sales
                  2025" with labels Jan–Dec and one dataset named "Sales"?
                </strong>
                — Suitable for charting.
              </li>
              <li>
                <strong>
                  Could you produce CSV with header <code>month,users</code> and
                  rows for Jan–Dec 2025 showing monthly active users?
                </strong>
                — Useful for table or CSV-based charts.
              </li>
              <li>
                <strong>
                  Can you write a Mermaid flowchart for a login flow (Enter
                  credentials → Validate → Success/Failure; include Forgot
                  password and Retry on failure)?
                </strong>
                — Use with the Mermaid renderer.
              </li>
              <li>
                <strong>
                  Could you create a Mermaid sequence diagram for the OAuth2
                  Authorization Code flow (User → Client → Auth Server →
                  Resource Server)?
                </strong>
                — Use with the Mermaid renderer.
              </li>
              <li>
                <strong>
                  Please return a small, self-contained HTML snippet for a
                  responsive product card (image placeholder, title, short
                  description, primary button).
                </strong>
                — Use with the HTML renderer.
              </li>
              <li>
                <strong>
                  Could you return a single JSON object for a dashboard payload
                  with <code>title</code> and <code>widgets</code>—one chart
                  widget (labels + dataset) and one markdown widget (short
                  summary)?
                </strong>
                — Useful for dashboard rendering.
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Use the playground input to send these prompts and see the
              renderers in action.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ExamplePage
