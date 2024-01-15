import './App.css';
import { useEffect, useState } from 'react';
import Carousel from './components/Carousel';
import {Productcard} from "./components/Productcard.tsx";

export type Product = {
    category: string;
    imageurl: string;
    position: number;
    price: number;
    recommendprice: number;
    shortdescription: string;
    title: string;
    url: string;
    id: string; // Assuming 'id' is a unique identifier
};

function App() {
    const [activeTab, setActiveTab] = useState('Damparfym');
    const [products, setProducts] = useState<Product[]>([]);
    const [mobile, setMobile] = useState(window.matchMedia('(max-width: 991px)').matches);
    const [tablet, setTablet] = useState(window.matchMedia('(min-width: 700px) and (max-width: 991px)').matches);
    const [desktop, setDesktop] = useState(window.matchMedia('(min-width: 991px) and (max-width: 1200px)').matches);
    const fetchTopList = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                console.log('failed to fetch');
                throw new Error('Something went wrong');
            }
            const data = await response.json();

            // Set the state accordingly
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSetActiveTab = (tabName: string) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        fetchTopList();

        // Add an event listener to handle window resize
        const handleResize = () => {
            setMobile(window.innerWidth < 700);
            setTablet(window.innerWidth > 700 && window.innerWidth < 1200);
            setDesktop(window.innerWidth > 991 && window.innerWidth < 1200)
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className={'top-list__container'}>
                <div className={'top-list__header'}>
                    <h3>Hot right now</h3>
                    <p>Spana in vår topplista och testa bästsäljarna som alla pratar om (och älskar!) just nu.</p>
                </div>
                <div className={'top-list__tabs'}>
                    <button onClick={() => handleSetActiveTab('Damparfym')} className={`top-list__tab ${activeTab === 'Damparfym' ? 'top-list__tab--active' : ''}`}>
                        Damparfym
                    </button>
                    <button onClick={() => handleSetActiveTab('Herrparfym')} className={`top-list__tab ${activeTab === 'Herrparfym' ? 'top-list__tab--active' : ''}`}>
                        Herrparfym
                    </button>
                </div>
            </div>

            <div className={'top-list__products'}>
                {mobile && products.length > 0 || tablet && products.length > 0 ? (
                    <Carousel products={products} activeTab={activeTab} mobile={mobile} tablet={tablet} desktop={desktop} />
                ) : (
                    <div className={'top-list__products-grid'}>
                        {products.map((product) =>
                            activeTab && activeTab === product.category ? (
                                <Productcard product={product} key={product.position} first={product.position}/>
                            ) : null
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;

