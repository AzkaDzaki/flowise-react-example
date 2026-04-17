const Badge = ({ children }: { children: string }) => (
  <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
    {children}
  </span>
)

const Divider = () => <hr className="border-border" />

const IntroductionPage = () => {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Introduction to Flowise */}
        <section className="space-y-6">
          <header>
            <h3 className="text-base">Introduction to Flowise</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Flowise is a low-code platform for building LLM applications with
              visual workflows. It simplifies the process of creating AI-powered
              chatbots, agents, and RAG systems without writing complex code.
            </p>
          </header>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm">Flowise enables:</p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Build complex LLM workflows visually</li>
              <li>
                Connect to multiple LLM providers (OpenAI, Anthropic, etc.)
              </li>
              <li>Integrate knowledge bases and document processing</li>
              <li>Create memory and context management systems</li>
              <li>Deploy and manage chatbots easily</li>
            </ul>
          </div>
        </section>

        <Divider />

        {/* Ways to Use Flowise */}
        <section className="space-y-6">
          <header>
            <h3 className="text-base">Ways to Use Flowise</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Flowise provides multiple integration options to embed chatbots
              into applications:
            </p>
          </header>

          {/* Option 1: Share Chatbot */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Badge>Option 1</Badge>
              <h4 className="text-sm font-semibold">Share Chatbot</h4>
              <p className="text-xs text-muted-foreground">
                Generate a shareable link to the chatbot. This is the quickest
                way to share an AI assistant without needing to integrate it
                into applications. Perfect for testing and sharing with
                non-technical users.
              </p>
            </div>
          </div>

          <Divider />

          {/* Option 2: Embed by API */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Badge>Option 2</Badge>
              <h4 className="text-sm font-semibold">Embed by API</h4>
              <p className="text-xs text-muted-foreground">
                Call the Flowise API directly from applications. This provides
                full control over the user experience and allows customization
                of the chatbot interface according to specific design needs.
              </p>
            </div>

            {/* API Response Format */}
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
              <h5 className="mb-2 text-sm font-semibold">
                API Response Format
              </h5>
              <p className="text-xs text-muted-foreground">
                Calling the Flowise API returns{' '}
                <strong>streaming text output</strong> from the LLM. The API
                provides only raw text — no UI components are included. All
                presentation logic must be handled: how the text is displayed,
                styled, formatted, and used in the application.
              </p>
            </div>

            {/* Custom Client Requirements */}
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
              <h5 className="mb-2 text-sm font-semibold">
                Building a Custom Client
              </h5>
              <p className="mb-3 text-xs text-muted-foreground">
                Since the API only returns text data, client applications must
                handle all presentation logic. Depending on the use case,
                developers may want to build features like:
              </p>
              <ul className="list-inside list-disc space-y-2 text-xs text-muted-foreground">
                <li>
                  <strong>Charts & Dashboards</strong> — Parse API responses and
                  visualize data
                </li>
                <li>
                  <strong>Diagrams & Flowcharts</strong> — Render structured
                  data as visual elements
                </li>
                <li>
                  <strong>Custom Formatting</strong> — Style the chatbot output
                  to match brand guidelines
                </li>
                <li>
                  <strong>Advanced UX</strong> — Implement features like message
                  editing, threading, or rich media support
                </li>
                <li>
                  <strong>Data Processing</strong> — Transform API responses
                  into actionable insights
                </li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* Why This Package */}
          <section className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h4 className="text-sm font-semibold text-primary">
              Why We Created This Package
            </h4>
            <p className="text-xs text-muted-foreground">
              Building a fully customized chatbot client from scratch can be
              complex and time-consuming. This package provides{' '}
              <strong>pre-built React components</strong> (Bubble Chat and Full
              Page Chat) that handle the core chatbot UI and interaction logic.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Features include:</strong>
            </p>
            <ul className="list-inside list-disc space-y-2 text-xs text-muted-foreground">
              <li>Ready-to-use chat interface components</li>
              <li>Proper message streaming and state management</li>
              <li>Mobile-responsive design out of the box</li>
              <li>Easy theme customization</li>
              <li>Integration with your Flowise chatflows</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              This project already includes built-in support for charts,
              dashboards, and diagrams. These features can be enabled from the
              Config dialog: open the Config panel, select the "Chat Window"
              tab, and toggle options in the "Behaviour" section.
            </p>
          </section>
        </section>

        <Divider />

        {/* Getting Started */}
        <section className="space-y-4">
          <h3 className="text-base">Next Steps</h3>
          <p className="text-sm text-muted-foreground">
            Ready to get started? Head to the <strong>Installation</strong>{' '}
            section to explore integration options and begin embedding Flowise
            into applications.
          </p>
        </section>
      </div>
    </div>
  )
}

export default IntroductionPage
