'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { updateUserAction } from '@/app/actions/user/actions'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { DeleteUserConfirmDialog } from '@/components/SummaryDialogs'

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const [saveIng, setSaveIng] = useState(false)

    const router = useRouter()

    const handleDelete = async () => {
        setShowDeleteDialog(true)
    }

    const deleteUser = async () => {
        try {
            const response = await fetch(
                `/api/user`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to delete user')
            }

            toast.success('Account deleted successfully')
            router.push('/')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete user')
            setShowDeleteDialog(false)
        }
    }

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '')
            setEmail(session.user.email || '')
        }
    }, [session?.user])

    const handleSave = async () => {
        try {
            setSaveIng(true)
            await updateUserAction(session?.user?.id ?? '', name, email)
            await update({ name, email })
            setIsEditing(false)
        } catch (error) {
            console.error('Update failed:', error)
        } finally {
            setSaveIng(false)
            toast.success('Update successfully')
        }
    }

    return (
        <div className="bg-black pt-50 min-h-screen w-full">
            <Card className="p-6 bg-gray-950 border mx-auto max-w-2xl border-white/10">
                <h1 className="text-2xl font-bold mb-6 text-white">Profile</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1 text-white/80">
                            Name
                        </label>
                        {isEditing ? (
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="max-w-[190px] bg-black/50 border-white/10 text-white placeholder:text-white/50"
                            />
                        ) : (
                            <div className="text-white/70 flex items-center gap-2">
                                <p>
                                    {session?.user?.name === ''
                                        ? 'null'
                                        : session?.user?.name}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1 text-white/80">
                            Email
                        </label>
                        {isEditing ? (
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter your email"
                                className="max-w-[190px] bg-black/50 border-white/10 text-white placeholder:text-white/50"
                            />
                        ) : (
                            <p className="text-white/70">
                                {session?.user?.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1 text-white/80">
                            Plan
                        </label>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-white/10 text-white">
                                {'Free'}
                            </Badge>
                            <div className="text-white/70 text-sm">
                                {`Times Left: 1`}
                            </div>
                            <Button
                                size={'sm'}
                                className="bg-white text-black hover:bg-white/90"
                                onClick={() =>
                                    router.push('/intro/pricing')
                                }
                            >
                                {`Upgrade`}
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4">
                        {isEditing ? (
                            <div className="space-x-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-white text-black hover:bg-white/90"
                                >
                                    <span>Save</span>
                                    {saveIng && (
                                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-white text-black hover:bg-white/90"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="bg-white text-black hover:bg-white/90"
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="p-6 mt-10 bg-gray-950 border mx-auto max-w-2xl border-white/10">
                <h1 className="text-2xl font-bold mb-6 text-red-400">Delete Account</h1>

                <div className="space-y-4">
                    <p className="text-white/70">
                        This action is irreversible.
                    </p>
                    <div className="pt-4">
                        {<Button
                            onClick={handleDelete}
                            className="bg-white text-red-500 hover:bg-white/90"
                        >
                            Delete
                        </Button>}
                    </div>
                </div>
            </Card>

            <DeleteUserConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={deleteUser}
            />
        </div>
    )
}
