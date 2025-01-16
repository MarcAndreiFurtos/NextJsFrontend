'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth0 } from "@auth0/auth0-react"

interface ChatDTO {
    id?: number;
    response?: string;
    category: string;
    subCategory: string;
    bands: string;
    accountId?: number | null;
}

interface GenerateRequestDTO {
    category: string;
    subCategory: string;
    bands: string;
}

const categories = ['METAL', 'ROCK']
const subcategories = {
    'METAL': [
        'DEATH_METAL', 'BLACK_METAL', 'HEAVY_METAL', 'TRASH_METAL', 'DOOM_METAL',
        'PROGRESSIVE_METAL', 'GLAM_METAL', 'INDUSTRIAL_METAL', 'NU_METAL', 'METAL_CORE',
        'POST_METAL', 'SLUDGE_METAL', 'GROVE_METAL', 'FOLK_METAL', 'GOTHIC_METAL', 'SYMPHONIC_METAL'
    ],
    'ROCK': [
        'CLASSIC_ROCK', 'PROGRESSIVE_ROCK', 'ALTERNATIVE_ROCK', 'GRUNGE', 'PUNK_ROCK',
        'POST_PUNK', 'NEW_WAVE', 'STONER_ROCK'
    ]
}

const bands = [
    'THE_BEATLES', 'THE_ROLLING_STONES', 'THE_WHO', 'LED_ZEPPELIN', 'THE_DOORS', 'PINK_FLOYD',
    'QUEEN', 'CREEDENCE_CLEARWATER_REVIVAL', 'JIMI_HENDRIX', 'DEEP_PURPLE', 'AC_DC', 'AEROSMITH',
    'GUNS_N_ROSES', 'VAN_HALEN', 'DEF_LEPPARD', 'KISS', 'BON_JOVI', 'WHITESNAKE', 'SCORPIONS',
    'MOTORHEAD', 'BLACK_SABBATH', 'IRON_MAIDEN', 'JUDAS_PRIEST', 'METALLICA', 'MEGADETH', 'SLAYER',
    'ANTHRAX', 'PANTERA', 'DIO', 'SAXON', 'EXODUS', 'OVERKILL', 'TESTAMENT', 'KREATOR', 'SEPULTURA',
    'SODOM', 'DEATH', 'CANNIBAL_CORPSE', 'MORBID_ANGEL', 'OBITUARY', 'DEICIDE', 'ENTOMBED',
    'DISMEMBER', 'CARCASS', 'BOLT_THROWER', 'AT_THE_GATES', 'VENOM', 'BATHORY', 'MAYHEM',
    'DARKTHRONE', 'EMPEROR', 'IMMORTAL', 'BURZUM', 'GORGOROTH', 'SATYRICON', 'WATAIN', 'CANDLEMASS',
    'SAINT_VITUS', 'TROUBLE', 'ELECTRIC_WIZARD', 'MY_DYING_BRIDE', 'PARADISE_LOST', 'PENTAGRAM',
    'KATATONIA', 'SOLITUDE_AETURNUS', 'KING_CRIMSON', 'YES', 'GENESIS', 'RUSH',
    'EMERSON_LAKE_AND_PALMER', 'JETHRO_TULL', 'CAMEL', 'GENTLE_GIANT', 'VAN_DER_GRAAF_GENERATOR',
    'DREAM_THEATER', 'OPETH', 'QUEENSRYCHE', 'SYMPHONY_X', 'TOOL', 'FATES_WARNING',
    'PAIN_OF_SALVATION', 'PORCUPINE_TREE', 'BETWEEN_THE_BURIED_AND_ME', 'HAKEN', 'NIRVANA',
    'PEARL_JAM', 'RADIOHEAD', 'SOUNDGARDEN', 'REM', 'ALICE_IN_CHAINS', 'SMASHING_PUMPKINS',
    'RED_HOT_CHILI_PEPPERS', 'FOO_FIGHTERS', 'STONE_TEMPLE_PILOTS', 'MUDHONEY', 'SCREAMING_TREES',
    'TEMPLE_OF_THE_DOG', 'MOTHER_LOVE_BONE', 'SILVERCHAIR', 'THE_RAMONES', 'SEX_PISTOLS',
    'THE_CLASH', 'DEAD_KENNEDYS', 'THE_MISFITS', 'BAD_RELIGION', 'BLACK_FLAG', 'THE_OFFSPRING',
    'GREEN_DAY', 'NOFX', 'JOY_DIVISION', 'THE_CURE', 'SIOUXSIE_AND_THE_BANSHEES', 'BAUHAUS',
    'ECHO_AND_THE_BUNNYMEN', 'GANG_OF_FOUR', 'THE_SMITHS', 'PUBLIC_IMAGE_LTD', 'WIRE',
    'KILLING_JOKE', 'DEPECHE_MODE', 'THE_POLICE', 'DURAN_DURAN', 'TALKING_HEADS', 'BLONDIE',
    'THE_CARS', 'INXS', 'TEARS_FOR_FEARS', 'A_FLOCK_OF_SEAGULLS', 'THE_B52S', 'MOTLEY_CRUE',
    'POISON', 'TWISTED_SISTER', 'RATT', 'SKID_ROW', 'WASP', 'CINDERELLA', 'QUIET_RIOT',
    'GREAT_WHITE', 'LA_GUNS', 'NINE_INCH_NAILS', 'MINISTRY', 'RAMMSTEIN', 'MARILYN_MANSON',
    'FEAR_FACTORY', 'KMFDM', 'GODFLESH', 'ROB_ZOMBIE', 'STATIC_X', 'STRAPPING_YOUNG_LAD', 'KORN',
    'SLIPKNOT', 'LIMP_BIZKIT', 'LINKIN_PARK', 'DEFTONES', 'DISTURBED', 'SYSTEM_OF_A_DOWN',
    'PAPA_ROACH', 'COAL_CHAMBER', 'MUDVAYNE', 'KILLSWITCH_ENGAGE', 'AS_I_LAY_DYING',
    'ALL_THAT_REMAINS', 'TRIVIUM', 'PARKWAY_DRIVE', 'AUGUST_BURNS_RED', 'BULLET_FOR_MY_VALENTINE',
    'ATREYU', 'UNEARTH', 'BRING_ME_THE_HORIZON', 'NEUROSIS', 'ISIS', 'PELICAN', 'CULT_OF_LUNA',
    'RUSSIAN_CIRCLES', 'MASTODON', 'THE_OCEAN', 'ROSETTA', 'ALCEST', 'AMENRA', 'KYUSS',
    'QUEENS_OF_THE_STONE_AGE', 'SLEEP', 'FU_MANCHU', 'MONSTER_MAGNET', 'CLUTCH', 'THE_SWORD',
    'ORANGE_GOBLIN', 'TRUCKFIGHTERS', 'MELVINS', 'EYEHATEGOD', 'CROWBAR', 'ACID_BATH', 'DOWN',
    'CORROSION_OF_CONFORMITY', 'HIGH_ON_FIRE', 'BARONESS', 'KYLESA', 'LAMB_OF_GOD', 'MACHINE_HEAD',
    'WHITE_ZOMBIE', 'DEVILDRIVER', 'GOJIRA', 'SOULFLY', 'CHIMAIRA', 'FINNTROLL', 'ENSIFERUM',
    'ELUVEITIE', 'KORPIKLAANI', 'TURISAS', 'ALESTORM', 'MOONSORROW', 'SKYCLAD', 'TYR', 'WINTERSUN',
    'TYPE_O_NEGATIVE', 'LACUNA_COIL', 'WITHIN_TEMPTATION', 'THEATRE_OF_TRAGEDY', 'MOONSPELL',
    'TRISTANIA', 'LEAVES_EYES', 'DRACONIAN', 'NIGHTWISH', 'EPICA', 'THERION', 'KAMELOT',
    'RHAPSODY_OF_FIRE', 'DELAIN', 'XANDRIA', 'AFTER_FOREVER'
]

export default function AiConversationBot() {
    const [chats, setChats] = useState<ChatDTO[]>([])
    const [band, setBand] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)
    const [subcategory, setSubcategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        fetchChats()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChats()
        }, 5000) // Fetch every 5 seconds

        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please log in to generate chats.",
                variant: "destructive",
            })
            return
        }

        if (!band || !category || !subcategory) {
            toast({
                title: "Incomplete Selection",
                description: "Please select a band, category, and subcategory.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        const newChat: ChatDTO = {
            category,
            subCategory: subcategory,
            bands: band,
            response: " ", // Initialize with a space as per backend expectation
        }

        const generateRequest: GenerateRequestDTO = {
            category,
            subCategory: subcategory,
            bands: band,
        }
        console.log(JSON.stringify(generateRequest))
        try {
            const token = await getAccessTokenSilently()

            // Send POST request to the specified IP address with no-cors mode
            const response = await fetch('https://bb7b-164-92-130-103.ngrok-free.app/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(generateRequest)
            })

            // Since we're using no-cors, we can't check response.ok
            // Instead, we'll assume success if the request doesn't throw an error

            // Create the chat in the localhost backend


            // Fetch the updated chats immediately after generation
            await fetchChats()

            setBand(null)
            setCategory(null)
            setSubcategory(null)
            toast({
                title: "Success",
                description: "Chat generation request sent successfully!",
            })
        } catch (error) {
            console.error('Error generating chat:', error)
            toast({
                title: "Error",
                description: "Failed to generate chat. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchChats = async () => {
        try {
            let headers: Record<string, string> = {
                'ngrok-skip-browser-warning': 'true'  // Add this line to include the ngrok header
            }
            if (isAuthenticated) {
                const token = await getAccessTokenSilently()
                headers = { ...headers, Authorization: `Bearer ${token}` }  // Spread the existing headers
            }
            const response = await fetch('https://2eb4-20-33-110-63.ngrok-free.app/api/chats', { headers })
            const data = await response.json()
            setChats(data) // Set chats directly without sorting
        } catch (error) {
            console.error('Error fetching chats:', error)
            toast({
                title: "Error",
                description: "Failed to fetch chats. Please try again later.",
                variant: "destructive",
            })
        }
    }

    const formatText = (text: string | null) => {
        return text ? text.replace(/_/g, ' ') : '';
    }

    useEffect(() => {
        // Remove data-darkreader-inline-stroke and style attributes from SVG elements
        const svgElements = document.querySelectorAll('svg');
        svgElements.forEach(svg => {
            svg.removeAttribute('data-darkreader-inline-stroke');
            svg.removeAttribute('style');
        });
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-background text-foreground min-h-screen pt-20">
            <h1 className="text-2xl font-bold mb-4 text-primary">AI Conversation Bot</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <Select value={band || ''} onValueChange={setBand}>
                        <SelectTrigger className="bg-background text-foreground border-input">
                            <SelectValue placeholder="Select Band" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground max-h-[300px] overflow-y-auto">
                            {bands.map((b) => (
                                <SelectItem key={b} value={b}>{formatText(b)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={category || ''} onValueChange={(value) => { setCategory(value); setSubcategory(null); }}>
                        <SelectTrigger className="bg-background text-foreground border-input">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground">
                            {categories.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={subcategory || ''} onValueChange={setSubcategory} disabled={!category}>
                        <SelectTrigger className="bg-background text-foreground border-input">
                            <SelectValue placeholder="Select Subcategory" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground">
                            {category && subcategories[category as keyof typeof subcategories].map((sc) => (
                                <SelectItem key={sc} value={sc}>{formatText(sc)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full" disabled={loading || !isAuthenticated}>
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </form>
            <div className="mt-4 space-y-4">
                {chats.map((chat) => (
                    <div key={chat.id} className="flex flex-col space-y-2">
                        <div className="self-end bg-primary text-primary-foreground p-3 rounded-lg max-w-[70%]">
                            {`${formatText(chat.bands)} - ${chat.category} - ${formatText(chat.subCategory)}`}
                        </div>
                        {chat.response && chat.response.trim() !== "" && (
                            <div className="self-start bg-secondary text-secondary-foreground p-3 rounded-lg max-w-[70%]">
                                {chat.response}
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="self-start bg-muted text-muted-foreground p-3 rounded-lg max-w-[70%]">
                        Generating response...
                    </div>
                )}
            </div>
        </div>
    )
}

