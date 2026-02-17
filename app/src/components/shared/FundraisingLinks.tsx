import { ExternalLink, Heart } from 'lucide-react';

interface Charity {
    name: string;
    description: string;
    url: string;
    color: 'blue' | 'yellow' | 'red' | 'gray';
}

const charities: Charity[] = [
    {
        name: 'UNITED24',
        description: 'The official fundraising platform of Ukraine.',
        url: 'https://u24.gov.ua/',
        color: 'blue'
    },
    {
        name: 'Come Back Alive',
        description: 'Providing competent assistance to the army.',
        url: 'https://savelife.in.ua/en/',
        color: 'gray'
    },
    {
        name: 'Hospitallers',
        description: 'Voluntary medical battalion saving lives on the front lines.',
        url: 'https://www.hospitallers.org.uk/',
        color: 'red'
    },
    {
        name: 'Razom for Ukraine',
        description: 'Building a prosperous, democratic, and sovereign Ukraine.',
        url: 'https://www.razomforukraine.org/',
        color: 'yellow'
    }
];

export function FundraisingLinks() {
    return (
        <div className="mt-12 mb-8 border-t pt-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="text-xl font-bold text-gray-800">Support Ukraine Directly</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {charities.map((charity) => (
                    <a
                        key={charity.name}
                        href={charity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex justify-between items-start">
                            <span className={`font-bold text-lg ${charity.color === 'blue' ? 'text-[var(--color-ukraine-blue)]' :
                                    charity.color === 'yellow' ? 'text-[var(--color-ukraine-yellow-dark)]' :
                                        charity.color === 'red' ? 'text-red-600' : 'text-gray-800'
                                }`}>
                                {charity.name}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{charity.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
