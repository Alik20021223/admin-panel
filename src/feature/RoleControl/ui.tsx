import { ReactNode } from "react"
import { useSharedStore } from "@shared/store"

interface RoleAccessProps {
    allowedRoles: string[]
    children: ReactNode
}

const RoleAccess = ({ allowedRoles, children }: RoleAccessProps) => {
    const { user } = useSharedStore()
    
    if (!user || !allowedRoles.includes(user.role)) {
        return null
    }

    return <>{children}</>
}

export default RoleAccess
