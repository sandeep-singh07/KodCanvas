"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link, Code, Terminal, MonitorSmartphone, Check, Sparkles, Zap, PanelRight, Layers, Github } from 'lucide-react'
import React, { useContext, useState, useEffect } from 'react'
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [isTyping, setIsTyping] = useState(true);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter();
    
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }
        if (userDetail?.token < 10) {
            toast('You dont have enough token!');
            return;
        }
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);
        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    const placeholderText = Lookup.INPUT_PLACEHOLDER;
    const [typedText, setTypedText] = useState('');
    
    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < placeholderText.length) {
                setTypedText(placeholderText.substring(0, i + 1));
                i++;
            } else {
                setTimeout(() => {
                    setIsTyping(false);
                }, 1000);
                clearInterval(typing);
            }
        }, 50);
        
        return () => clearInterval(typing);
    }, []);

    // Example apps that KodCanvas can create
    const exampleApps = [
        {
            title: "To-Do App",
            description: "Task management with drag-and-drop, categories, and dark mode",
            icon: <Layers className="h-6 w-6 text-blue-500" />,
            tags: ["React", "CSS", "LocalStorage"]
        },
        {
            title: "Budget Tracker",
            description: "Expense tracking with charts, categories, and data export",
            icon: <PanelRight className="h-6 w-6 text-green-500" />,
            tags: ["JavaScript", "Chart.js", "CSV"]
        },
        {
            title: "Gym Management Dashboard",
            description: "Member tracking, workout plans, and scheduling system",
            icon: <Zap className="h-6 w-6 text-purple-500" />,
            tags: ["Next.js", "Tailwind", "API"]
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <header className='relative flex flex-col items-center justify-center gap-4 p-6 md:p-10 pt-20 md:pt-28 max-w-7xl mx-auto animate-fadeIn overflow-hidden'>
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
                </div>
                
                {/* Logo and brand */}
                <div className="flex items-center gap-3 mb-1 bg-gray-900/50 p-2 px-4 rounded-full">
                    <div className="animate-scaleIn">
                        <Code className="h-8 w-8 text-blue-500" />
                    </div>
                    <h1 className='font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-fadeInSlow'>
                        <span className="font-extrabold">Kod</span>Canvas
                    </h1>
                </div>
                
                {/* Main headline */}
                <h2 className='font-bold text-4xl md:text-6xl text-center max-w-4xl bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text animate-fadeInSlow'>
                    {Lookup.HERO_HEADING}
                </h2>
                
                <p className='text-gray-400 font-medium text-center max-w-2xl text-lg md:text-xl animate-fadeInSlower'>
                    {Lookup.HERO_DESC}
                </p>
                
                {/* Main prompt input */}
                <div className='p-5 border-2 border-gray-700 rounded-2xl max-w-2xl w-full mt-6 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 animate-slideUp bg-gradient-to-b from-gray-900 to-gray-950'
                    style={{
                        backgroundColor: Colors.BACKGROUND
                    }}
                >
                    <div className='flex flex-col gap-3'>
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-gray-500 font-mono px-2 py-1 rounded bg-gray-800/50">AI-Powered</div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                            <textarea 
                                placeholder={isTyping ? typedText : placeholderText}
                                onChange={(event) => setUserInput(event.target.value)}
                                className='outline-none bg-transparent w-full h-32 max-h-56 resize-none text-gray-200 font-mono text-sm md:text-base p-2 rounded-lg transition-all focus:bg-gray-900/30'
                            />
                            
                            {userInput?.length > 0 && (
                                <div className="hover:scale-105 active:scale-95 transition-all">
                                    <ArrowRight
                                        onClick={() => onGenerate(userInput)}
                                        className='bg-gradient-to-r from-blue-600 to-blue-500 p-2 h-12 w-12 rounded-lg cursor-pointer shadow-md hover:shadow-blue-600/50 transition-all duration-300' 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm border-t border-gray-800 pt-4">
                        <Link className='h-4 w-4' />
                        <span>Supports HTML, CSS, JavaScript, React, Next.js, Tailwind</span>
                    </div>
                </div>
                
                {/* Suggestion chips */}
                <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3 animate-fadeInSlowest'>
                    <p className="text-gray-500 w-full text-center mb-2 text-sm">Try these examples:</p>
                    {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                        <div key={index} className="hover:scale-105 active:scale-95 transition-transform duration-200">
                            <h2
                                onClick={() => onGenerate(suggestion)}
                                className='p-2 px-4 bg-gray-800/50 border border-gray-700 rounded-full text-sm
                                text-gray-300 hover:text-white hover:border-blue-500 hover:bg-gray-800 cursor-pointer transition-all duration-300'
                            >{suggestion}</h2>
                        </div>
                    ))}
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-4 mt-16 pb-10 border-b border-gray-800 w-full max-w-4xl">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">1,000+</h3>
                        <p className="text-gray-400 text-sm">Apps Generated</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">10x</h3>
                        <p className="text-gray-400 text-sm">Faster Development</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-300 text-transparent bg-clip-text">25K+</h3>
                        <p className="text-gray-400 text-sm">Daily Users</p>
                    </div>
                </div>
            </header>
            
            {/* Features Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-3">How KodCanvas Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">From idea to live app in minutes, not hours. Just describe what you want to build and KodCanvas handles the rest.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 mt-12 text-center">
                    <div className="flex flex-col items-center p-6 max-w-xs bg-gray-900/30 rounded-xl border border-gray-800 hover:border-blue-900 transition-all hover:-translate-y-1 duration-300">
                        <Terminal className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Prompt-to-Code</h3>
                        <p className="text-gray-400">Describe what you want to build in plain English and watch KodCanvas generate functional code instantly</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 max-w-xs bg-gray-900/30 rounded-xl border border-gray-800 hover:border-blue-900 transition-all hover:-translate-y-1 duration-300">
                        <Code className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Edit & Customize</h3>
                        <p className="text-gray-400">Fine-tune your code with our powerful editor featuring syntax highlighting and AI assistance</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 max-w-xs bg-gray-900/30 rounded-xl border border-gray-800 hover:border-blue-900 transition-all hover:-translate-y-1 duration-300">
                        <MonitorSmartphone className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Instant Preview</h3>
                        <p className="text-gray-400">See your app running in real-time with our split-screen live preview as you make changes</p>
                    </div>
                </div>
            </section>
            
            {/* Example Apps Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-900/30">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-3">What You Can Build</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">From simple tools to complex applications, KodCanvas helps you build web apps for any purpose.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {exampleApps.map((app, index) => (
                        <div key={index} className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {app.icon}
                                    <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm"></div>
                                    <div className="relative z-10 text-2xl font-bold">{app.title}</div>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-300 mb-4">{app.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {app.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => onGenerate(`Create ${app.title}`)}
                                    className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Try This Example
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Testimonials/Social Proof */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-3">Loved by Developers</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Join thousands of developers who are building amazing web applications with KodCanvas.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div>
                                <h4 className="font-medium">Alex Chen</h4>
                                <p className="text-gray-500 text-sm">Frontend Developer</p>
                            </div>
                        </div>
                        <p className="text-gray-300">"KodCanvas helped me prototype a dashboard in minutes that would have taken days to code from scratch. Game-changer!"</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
                            <div>
                                <h4 className="font-medium">Sarah Johnson</h4>
                                <p className="text-gray-500 text-sm">Product Designer</p>
                            </div>
                        </div>
                        <p className="text-gray-300">"I'm not a coder, but KodCanvas lets me turn my design ideas into functional prototypes without writing a single line of code."</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            <div>
                                <h4 className="font-medium">Michael Torres</h4>
                                <p className="text-gray-500 text-sm">Startup Founder</p>
                            </div>
                        </div>
                        <p className="text-gray-300">"We used KodCanvas to build our MVP in a weekend instead of spending months on development. Our investors were amazed!"</p>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30">
                    <h2 className="text-3xl font-bold mb-4">Start Building Your Next Web App</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Turn your ideas into reality with KodCanvas. No complex setup, no learning curve — just describe what you want and let AI do the coding.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => document.querySelector('textarea').focus()}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-blue-700/30"
                        >
                            Try KodCanvas Now
                        </button>
                        
                        <a href="#" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                            <Github className="h-5 w-5" />
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-10 px-6 border-t border-gray-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Code className="h-5 w-5 text-blue-500" />
                        <span className="font-bold text-xl">
                            <span className="font-extrabold">Kod</span>Canvas
                        </span>
                    </div>
                    
                    <div className="flex gap-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Features</a>
                        <a href="#" className="hover:text-white transition-colors">Examples</a>
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-gray-500 text-sm">
                        &copy; 2025 KodCanvas. All rights reserved.
                    </div>
                </div>
            </footer>
            
            <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
        </>
    )
}

export default Hero