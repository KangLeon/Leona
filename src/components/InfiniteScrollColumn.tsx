import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';


export const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

export const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

export const testimonials = [
    {
        avatar: 'L',
        name: 'Li Ming',
        role: 'Software Engineer',
        content: 'As a non-native English speaker, Leona helped me overcome my fear of verbal communication. The AI interviewer\'s feedback is highly professional, giving me more confidence in real interviews.'
    },
    {
        avatar: 'W',
        name: 'Wang Sarah',
        role: 'Product Manager',
        content: 'The flexible practice schedule fits perfectly with my work rhythm. Each practice session provides specific improvement suggestions, helping me continuously enhance my interview performance.'
    },
    {
        avatar: 'Z',
        name: 'Zhang Mike',
        role: 'Data Analyst',
        content: 'The AI interviewer\'s questions are highly targeted and align perfectly with industry standards. Through repeated practice, my expression abilities have improved significantly.'
    },
    {
        avatar: 'S',
        name: 'Song Emma',
        role: 'Marketing Director',
        content: 'Using Leona has boosted my confidence in English interviews. The AI\'s instant feedback helps me quickly improve my expression and communication style.'
    },
    {
        avatar: 'C',
        name: 'Chen Jack',
        role: 'Entrepreneur',
        content: 'As an entrepreneur, I frequently need to communicate in English. Leona helps me handle various scenarios with ease and professionalism.'
    },
    {
        avatar: 'H',
        name: 'Henry Huang',
        role: 'Software Engineer',
        content: 'Leona\'s AI interview system has significantly boosted my confidence in English interviews. The feedback is both professional and targeted.'
    },
    {
        avatar: 'L',
        name: 'Lucy Liu',
        role: 'Product Manager',
        content: 'Through practicing with Leona, my English speaking skills have improved dramatically. The AI interviewer\'s questions are very relevant to real work scenarios.'
    },
    {
        avatar: 'W',
        name: 'William Wang',
        role: 'Data Analyst',
        content: 'As a data analyst, I need to frequently present in English. Leona has helped me improve the accuracy of my technical terminology.'
    },
    {
        avatar: 'Z',
        name: 'Zoe Zhang',
        role: 'HR Director',
        content: 'Leona is an excellent interview practice tool. It has helped me better understand the nuances and techniques in English interviews.'
    },
    {
        avatar: 'Y',
        name: 'Yuki Yang',
        role: 'Marketing Specialist',
        content: 'By practicing with Leona during my free time, my English speaking skills have improved dramatically.'
    },
    {
        avatar: 'F',
        name: 'Fiona Feng',
        role: 'Entrepreneur',
        content: 'Leona\'s AI interview system is incredibly intelligent, providing targeted feedback based on my responses and helping me improve continuously.'
    },
    {
        avatar: 'D',
        name: 'David Deng',
        role: 'Sales Manager',
        content: 'Through consistent practice, I can now confidently communicate with clients in English. Leona is an excellent practice partner.'
    },
    {
        avatar: 'X',
        name: 'Xena Xu',
        role: 'Research Analyst',
        content: 'Leona helped me overcome interview anxiety. The AI interviewer\'s feedback clearly shows me where and how to improve.'
    },
    {
        avatar: 'G',
        name: 'George Gao',
        role: 'Technical Director',
        content: 'As a technical director, I frequently communicate with international teams. Leona has helped me enhance my professional English expression.'
    },
    {
        avatar: 'S',
        name: 'Sophie Sun',
        role: 'Project Manager',
        content: 'Leona\'s practice system is incredibly flexible, allowing me to improve my interview skills anytime, anywhere.'
    },
    {
        avatar: 'Q',
        name: 'Quinn Qian',
        role: 'Financial Analyst',
        content: 'Working in finance requires precise English expression. Leona has helped me master the correct use of professional terminology.'
    },
    {
        avatar: 'T',
        name: 'Tina Tan',
        role: 'Teacher',
        content: 'As an English teacher, I\'ve learned many practical interview techniques and expressions from Leona.'
    },
    {
        avatar: 'B',
        name: 'Ben Bai',
        role: 'Designer',
        content: 'Leona\'s AI system has great comprehension and can accurately point out areas for improvement in my expression.'
    },
    {
        avatar: 'M',
        name: 'Mark Ma',
        role: 'Operations Director',
        content: 'Through practicing with Leona, I\'ve become much more proficient in English business communication.'
    },
    {
        avatar: 'R',
        name: 'Rachel Ren',
        role: 'Consultant',
        content: 'Leona provides very realistic interview scenarios, helping me better prepare for actual English interviews.'
    },
    {
        avatar: 'N',
        name: 'Nina Nie',
        role: 'AI Engineer',
        content: 'As an AI engineer, I find Leona\'s system intelligently designed with very precise feedback.'
    },
    {
        avatar: 'J',
        name: 'Jason Jiang',
        role: 'Account Manager',
        content: 'Leona has helped me improve my English communication fluency. I\'m now more confident when interacting with international clients.'
    },
    {
        avatar: 'P',
        name: 'Peter Peng',
        role: 'Fitness Trainer',
        content: 'Through Leona, I\'ve learned how to more professionally describe fitness-related content in English.'
    },
    {
        avatar: 'K',
        name: 'Kevin Ke',
        role: 'Research Analyst',
        content: 'Leona\'s AI interview system is very intelligent, adjusting question difficulty based on different professional backgrounds.'
    },
    {
        avatar: 'A',
        name: 'Amy Ai',
        role: 'Medical Consultant',
        content: 'Leona has helped me master professional English expressions in the medical field, which has been very beneficial for my work.'
    }
]

interface Testimonial {
    avatar: string;
    name: string;
    role: string;
    content: string;
}

interface Props {
    items: Testimonial[];
    speed: number;
    direction?: 'up' | 'down';
}

export default function InfiniteScrollColumn({ items, speed, direction = 'up' }: Props) {
    const columnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const column = columnRef.current;
        if (!column) return;

        const scrollHeight = column.scrollHeight;
        let currentScroll = direction === 'down' ? scrollHeight / 2 : 0;

        const animate = () => {
            if (!column) return;

            currentScroll += speed;
            if (direction === 'up') {
                if (currentScroll >= scrollHeight / 2) {
                    currentScroll = 0;
                }
                column.style.transform = `translateY(-${currentScroll}px)`;
            } else {
                if (currentScroll >= scrollHeight) {
                    currentScroll = scrollHeight / 2;
                }
                column.style.transform = `translateY(-${scrollHeight / 2 - currentScroll % (scrollHeight / 2)}px)`;
            }

            requestAnimationFrame(animate);
        };

        const animation = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animation);
    }, [speed, direction]);

    // 复制一份数据以实现无缝滚动
    const duplicatedItems = [...items, ...items];

    return (
        <div className="h-full overflow-hidden relative">
            <div ref={columnRef} className="space-y-6">
                {duplicatedItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r bg-black flex items-center justify-center text-white font-bold text-xl">
                                {item.avatar}
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold text-white">{item.name}</h4>
                                <p className="text-white/60 text-sm">{item.role}</p>
                            </div>
                        </div>
                        <p className="text-white/80">{item.content}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 