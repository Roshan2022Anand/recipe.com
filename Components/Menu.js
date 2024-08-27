import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
const Menu = () => {

    //accesing the router method from next
    const router = useRouter();
    const [webTheme, setwebTheme] = useState(true);
    //dark and light mode effect
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary", webTheme ? '#27403E' : '#A8D5BA');
        root.style.setProperty("--secondary", webTheme ? '#2B1C1D' : '#F7E7CE');
        root.style.setProperty("--accent", webTheme ? '#803D3D' : '#FF6F61');
        root.style.setProperty("--text", webTheme ? '#E0E0E0' : '#2F4F4F');
        root.style.setProperty("--background", webTheme ? '#1A1A1A' : '#cbccc7');
        root.style.setProperty("--highlight", webTheme ? '#8F6500' : '#FFC107');
        root.style.setProperty("--border", webTheme ? '#364640' : '#C4D1C8');
    }, [webTheme])

    return (
        <>
            <button className='shadow-hover' onClick={() => setwebTheme(!webTheme)}>
                {webTheme ? '🌙' : '☀️'}
            </button>
            <button className='shadow-hover' onClick={() => { router.push("/FavItem") }}>⭐</button>
            <button className='shadow-hover' onClick={() => { router.push("/") }}>🏠</button>
        </>
    )
}

export default Menu