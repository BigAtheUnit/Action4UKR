import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Twitter, Send, Facebook, MessageCircle } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SocialShareProps {
    className?: string;
}

export function SocialShare({ className }: SocialShareProps) {
    const shareUrl = "https://bigatheunit.github.io/Action4UKR/";
    const shareText = "I just wrote to my representative asking for continued support for Ukraine. It only takes 2 minutes — join me and make your voice heard!";

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const links = [
        {
            name: 'X (Twitter)',
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
            color: 'bg-black text-white hover:bg-gray-800',
            Icon: Twitter
        },
        {
            name: 'Telegram',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            color: 'bg-[#0088cc] text-white hover:bg-[#0077b5]',
            Icon: Send
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
            color: 'bg-[#1877f2] text-white hover:bg-[#166fe5]',
            Icon: Facebook
        },
        {
            name: 'WhatsApp',
            url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
            color: 'bg-[#25d366] text-white hover:bg-[#20bd5a]',
            Icon: MessageCircle
        }
    ];

    return (
        <div className={cn('flex flex-wrap gap-2 justify-center', className)}>
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md',
                        link.color
                    )}
                    title={`Share on ${link.name}`}
                    aria-label={`Share on ${link.name}`}
                >
                    <link.Icon className="w-5 h-5" fill="currentColor" />
                </a>
            ))}
        </div>
    );
}
