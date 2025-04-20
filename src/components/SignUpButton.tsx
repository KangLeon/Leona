import { Button } from './ui/button'

interface SignUpButtonProps {
    onClick: () => void
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick }) => {
    return (
        <Button variant="default" onClick={onClick} type="button">
            {'Sign Up'}
        </Button>
    )
}
