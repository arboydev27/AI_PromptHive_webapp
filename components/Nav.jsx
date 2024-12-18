'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { } from 'next-auth/react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { set } from 'mongoose'

const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, []);

  return (
    <nav className="flex-between w-full mb-16 
    pt-3">
        <Link href="/" className="flex gap-2 
        flex-center">
            <Image 
                src="/assets/images/new-logo.svg"
                alt="PromptHive Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">PromptHive</p>
        </Link>

        {/* {alert(providers)} */}

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap:5">
                    <Link href="/create-prompt"
                    className="black_btn">
                        Create Post
                    </Link>

                    <button type="button" onClick={
                        signOut} className="outline_btn">
                            Sign Out
                    </button>

                    <Link href="/profile">
                    <Image 
                        src={session?.user.image}
                        alt="Profile Image"
                        width={37}
                        height={37}
                        className="rounded-full"
                    />
                    </Link>
                </div>
            ) : (
                <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button  
                        type="button" 
                        onClick={() => signIn(provider.id)} 
                        key={provider.name} 
                        className="black_btn">
                            Sign In{ /*provider.name */}
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                        src={session?.user.image}
                        alt="Profile"
                        width={37}
                        height={37}
                        className="rounded-full"
                        onClick={() => setToggleDropDown(prev => !prev)}
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link 
                                href="/profile"
                                className="dropdown_link"
                                onClick= {() => setToggleDropDown(false)}
                                >
                                My Profile 
                            </Link>
                            <Link 
                                href="/create-prompt"
                                className="dropdown_link"
                                onClick= {() => setToggleDropDown(false)}
                                >
                                Create Prompt 
                            </Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setToggleDropDown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full white_btn"
                                >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button  
                            type="button" 
                            key={provider.name} 
                            onClick={() => signIn(provider.id)} 
                            className="black_btn"
                        >
                            Sign In{ /*provider.name */}
                        </button>
                    ))}
                </>
            )}
        </div>

         </nav>
  )
}

export default Nav
