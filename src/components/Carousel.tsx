import { Navigation, Grid, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Product } from "../App.tsx";
import {Productcard} from "./Productcard.tsx";
import '../App.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';


type CarouselProps = {
    products: Product[];
    activeTab: string;
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
};

export default function Carousel({products, activeTab, mobile, tablet, desktop}: CarouselProps) {
    const chunkArray = (array: Product[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    const activeTabProducts = products.filter((product) => (activeTab && activeTab === product.category))
    const productChunks = chunkArray(activeTabProducts, 5);
    if (mobile || tablet) {
        return (
            <>
                <Swiper
                    navigation={true}
                    slidesPerView={desktop ? 2 : tablet ? 2 : mobile ? 1.03 : 1}
                    spaceBetween={10}
                    scrollbar={{
                        hide: false
                    }}
                    modules={[Grid, Scrollbar, Navigation]}
                    className="mySwiper"


                >
                    {productChunks.map((chunk, index) => (
                        <SwiperSlide key={chunk[index].position}>
                            {chunk.map((product: Product) =>
                                    activeTab && activeTab === product.category ? (
                                        <Productcard product={product} key={product.position + index} first={product.position}/>
                                    ) : null
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    }
}
