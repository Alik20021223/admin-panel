import { useSharedStore } from "@shared/store"


const RolePage = () => {

  const { user } = useSharedStore()

  return (
    <>
      {user?.role === "guest" &&
        <section className="py-4 px-6 justify-center flex items-center w-full h-full">
          <h1 className="text-center">Ожидайте подтверждения прав Администратором</h1>
        </section>
      }
    </>
  )
}

export default RolePage