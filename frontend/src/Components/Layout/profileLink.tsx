import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

export enum ProfileLinkType {
    'instagram',
    'linkedin',
    'github',
    'discord',
    'email'
}


interface ProfileLinkProps {
    type: ProfileLinkType;
    link: string;
}

const ImgaeClass = '!relative';

export const ProfileLink:FC<ProfileLinkProps> = ({type, link}) => {
    return (
        <Link className={'flex items-center justify-center transition-all duration-300 relative aspect-square p-[25%] hover:p-[20%] bg-[rgba(0,0,0,0)] hover:bg-[rgba(0,0,0,.5)]'} href={link}>
            {(() => {
                switch (type) {
                    case ProfileLinkType.instagram:
                        return (
                            <Image src={'/images/icons/instagram.svg'} alt={'Instagram'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.linkedin:
                        return (
                            <Image src={'/images/icons/linked-in.svg'} alt={'Linkedin'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.github:
                        return (
                            <Image src={'/images/icons/github.svg'} alt={'Github'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.discord:
                        return (
                            <Image src={'/images/icons/discord.svg'} alt={'Discord'} fill className={ImgaeClass}/>
                        );
                    case ProfileLinkType.email:
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