import { Button } from './ui/button'

interface SignInButtonProps {
    onClick: () => void
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
    return (
        <Button variant="default" onClick={onClick} type="button">
            {'Sign In'}
        </Button>
    )
}
