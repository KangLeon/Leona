import { Button } from './ui/button'

interface LoginButtonProps {
    onClick: () => void
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
    return (
        <Button variant="default" onClick={onClick} type="button">
            {'Login'}
        </Button>
    )
}
