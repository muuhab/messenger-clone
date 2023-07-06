
import { IconType } from "react-icons"

interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex  justify-center w-full px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0  text-gray-500 "
        >
            <Icon />
        </button>
    )
}
export default AuthSocialButton