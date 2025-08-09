import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export enum ProfileLinkType {
    Instagram = 'instagram',
    Linkedin = 'linkedin',
    Github = 'github',
    Discord = 'discord',
    Email = 'email',
}


interface ProfileLinkProps {
    type: ProfileLinkType;
    link: string;
}

const ImageClass = '!relative';

export const ProfileLink:FC<ProfileLinkProps> = ({type, link}) => {
    return (
        <Link className={'flex items-center justify-center transition-all duration-300 relative aspect-square p-[25%] hover:p-[20%] hover:backdrop-brightness-75'} href={link} target="_blank" rel="noopener noreferrer">
            {(() => {
                switch (type) {
                    case ProfileLinkType.Instagram:
                        return (
                            <Image src={'/images/icons/instagram.svg'} alt={'Instagram'} className={ImageClass} width={40} height={40}/>
                        );
                    case ProfileLinkType.Linkedin:
                        return (
                            <Image src={'/images/icons/linked-in.svg'} alt={'Linkedin'} className={ImageClass} width={40} height={40}/>
                        );
                    case ProfileLinkType.Github:
                        return (
                            <Image src={'/images/icons/github.svg'} alt={'Github'} className={ImageClass} width={40} height={40}/>
                        );
                    case ProfileLinkType.Discord:
                        return (
                            <Image src={'/images/icons/discord.svg'} alt={'Discord'} className={ImageClass} width={40} height={40}/>
                        );
                    case ProfileLinkType.Email:
                        return (
                            <EnvelopeIcon className={`w-fill h-fill text-sec ${ImageClass}`} aria-hidden="true" />
                        );
                    default:
                        return null;
                }
            })()}
        </Link>
    );
}