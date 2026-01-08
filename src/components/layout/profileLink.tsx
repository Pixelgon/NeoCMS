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

const ImageClass = '!relative w-fill h-fill object-contain group-hover:scale-90 transition-all duration-300';

export const ProfileLink:FC<ProfileLinkProps> = ({type, link}) => {
    return (
        <Link className={'flex items-center justify-center transition-all duration-300 relative aspect-square hover:backdrop-brightness-75 group'} href={link} target="_blank" rel="noopener noreferrer">
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
                            <EnvelopeIcon className={`w-fill h-fill text-sec ${ImageClass}`} aria-hidden="true" width={40} height={40}/>
                        );
                    default:
                        return null;
                }
            })()}
        </Link>
    );
}