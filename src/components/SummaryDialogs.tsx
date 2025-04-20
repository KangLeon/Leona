import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface FileTypeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface EndConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

interface CongratulationsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    showReport: boolean
    chatId: string | null
    onViewReport: (chatId: string) => void
}

interface DeleteUserConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

export function FileTypeDialog({ open, onOpenChange }: FileTypeDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Invalid File Type</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please upload JPG, PNG or PDF files only
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>OK</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function EndConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
}: EndConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>End Summary?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You won&apos;t be able to continue answering questions
                        after ending the Summary. Are you sure?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        End Summary
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function CongratulationsDialog({
    open,
    onOpenChange,
    showReport,
    chatId,
    onViewReport,
}: CongratulationsDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have completed the Summary.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Generating report, do not close this page...
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={!showReport}
                        onClick={() => chatId && onViewReport(chatId)}
                    >
                        View Report
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

//删除用户确认弹框
export function DeleteUserConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
}: DeleteUserConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete your account?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
