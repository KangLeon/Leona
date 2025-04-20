import { MessageIcon, VercelIcon } from './Icon'
import { motion } from 'framer-motion'

export const Overview = () => {
    return (
        <motion.div
            key="overview"
            className="max-w-3xl mx-auto md:mt-20"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.5 }}
        >
            <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
                <p className="flex flex-row justify-center gap-4 items-center">
                    <VercelIcon size={32} />
                    <span>+</span>
                    <MessageIcon size={32} />
                </p>
                <p>
                    If you are ready, click{' '}
                    <code className="rounded-md bg-muted px-1 py-0.5">
                        Start Summary
                    </code>{' '}
                    to begin your Summary. If you would like the Summaryer
                    to have a complete view of your resume, please upload it
                    first. You can either paste your resume text into the text
                    box or upload a file by clicking{' '}
                    <code className="rounded-md bg-muted px-1 py-0.5">
                        Upload Resume
                    </code>
                    .
                </p>
                <p>
                    You will receive your Summary results after completing
                    several questions. Please be patient and try not to
                    interrupt the Summary process.
                </p>
            </div>
        </motion.div>
    )
}
