import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { TooltipProvider } from "@shadcdn/tooltip"

function App() {

  return (
    <>
      <div className="min-h-screen">
        <Suspense fallback={null}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>

        </Suspense>
      </div>
    </>
  )
}

export default App
