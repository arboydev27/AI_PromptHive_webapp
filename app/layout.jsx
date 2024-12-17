import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata  = {
    title: 'PromptHive',
    description: 'Explore, discover and exchange AI prompts with direct LLM integration',
    keywords: 'AI',
}

const RootLayout = ({children}) => {
  return (
    <html lang = "en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout
