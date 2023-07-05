import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import Bookings from "@/components/Bookings.tsx";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <main className="w-screen h-screen flex justify-center">
                <Bookings/>
            </main>
        </QueryClientProvider>

    )
}

export default App
