const HomePage = () => {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Configuration moved to navbar 'Config' modal */}

        <section>
          <header>
            <h3 className="text-base">Get Started</h3>
          </header>
          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              This section shows how to use the package in your project.
            </p>
            <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                Create a{' '}
                <strong>
                  <code>.npmrc</code>
                </strong>{' '}
                file in your project root and add the following lines:
                <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                  <code>
                    @ai-platform:registry=https://gitlab.playcourt.id/api/v4/projects/32330/packages/npm/
                    <br />
                    //gitlab.playcourt.id/api/v4/projects/32330/packages/npm/:_authToken=1pGym154F_PGNktJG4h3
                  </code>
                </pre>
              </li>
              <li>
                Install the Flowise embed package:
                <div className="mt-2 rounded bg-muted p-2 text-xs">
                  <code>npm install @ai-platform/flowise-embed-react</code>
                </div>
              </li>
              <li>
                Import and use the components with the configuration hook:
                <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                  <code>
                    import &#123; FullPageChat, BubbleChat &#125; from
                    '@ai-platform/flowise-embed-react'
                    <br />
                    <br />
                    &lt;FullPageChat chatflowid=&#123;YOUR_CHAT_FLOW_ID&#125;
                    apiHost=&#123;YOUR_API_HOST&#125; /&gt;
                    <br />
                    <br />
                    // Or
                    <br />
                    <br />
                    &lt;BubbleChat chatflowid=&#123;YOUR_CHAT_FLOW_ID&#125;
                    apiHost=&#123;YOUR_API_HOST&#125; /&gt;
                  </code>
                </pre>
              </li>
              <li>Run your application</li>
            </ol>

            <div className="rounded-l-2 mt-6 border-l-2 border-muted/60 bg-muted p-3 text-sm text-muted-foreground">
              <strong>Note:</strong> Built on Flowise's embed package — same
              props and usage; extended additional capabilities. See{' '}
              <a
                href="https://docs.flowiseai.com/using-flowise/embed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Flowise embed docs
              </a>
              .
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
