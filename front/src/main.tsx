import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

async function enableMocking() {
    const {worker} = await import('./mocks/browser')

        return worker.start({
        serviceWorker:{
            url:'/testForm'
        }
    })

}

const queryClient = new QueryClient()
enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </StrictMode>,
    )
})
