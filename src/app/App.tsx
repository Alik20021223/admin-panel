import { Suspense, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TooltipProvider } from "@shadcdn/tooltip"
import { Toaster } from "@shadcdn/sonner"
import { isAuthenticated } from "@shared/utils"

function App() {

  useEffect(() => {
    isAuthenticated(); // один вызов, создаёт кэш
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Suspense fallback={null}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
          <Toaster />
        </Suspense>
      </div>
    </>
  )
}

export default App
