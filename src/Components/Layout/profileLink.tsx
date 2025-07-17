import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

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

const ImgaeClass = '!relative';

export const ProfileLink:FC<ProfileLinkProps> = ({type, link}) => {
    return (
        <Link className={'flex items-center justify-center transition-all duration-300 relative aspect-square p-[25%] hover:p-[20%] hover:backdrop-brightness-75'} href={link} target="_blank" rel="noopener noreferrer">
            {(() => {
                switch (type) {
                    case ProfileLinkType.Instagram:
                        return (
                            <Image src={'/images/icons/instagram.svg'} alt={'Instagram'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.Linkedin:
                        return (
                            <Image src={'/images/icons/linked-in.svg'} alt={'Linkedin'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.Github:
                        return (
                            <Image src={'/images/icons/github.svg'} alt={'Github'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.Discord:
                        return (
                            <Image src={'/images/icons/discord.svg'} alt={'Discord'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.Email:
                        return (
                            <Image src={'/images/icons/envelopeSolid.svg'} alt={'Email'} fill className={ImgaeClass}/>
                        );
                    default:
                        return null;
                }
            })()}
        </Link>
    );
}