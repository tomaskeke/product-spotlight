import {useState} from "react";

export const Productcard = ({product, first}) => {
    const [favorite, setFavorite] = useState(false);

    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setFavorite(!favorite);
    };
    return (
    <div className={first === 1 ? 'top-list__product' : 'top-list__product--no-highlight'}>
        <div className={'top-list__product-favorite'}>
            <span onClick={handleFavoriteClick} className={favorite ? "material-symbols-outlined active" : "material-symbols-outlined"}>favorite</span>
        </div>
        <a href={product.url} >
            <div className={'top-list__image-container'}>
                <img src={product.imageurl} alt={product.title}/>
                <span className={'top-list__product-position'}>
                                              #{product.position}
                                            </span>
                <span className={'top-list__product-badge'}>
                                              Always good price
                                            </span>
            </div>
            <div className={'top-list__product-info'}>
                <div className={'top-list__product-info_description'}>
                    <p>{product.title}</p>
                    <p className={'subtitle1'}>
                        {product.shortdescription}
                    </p>
                </div>
                <div className={'top-list__product-info_price'}>
                    <p className={'subtitle2'}>
                        Rek pris {product.recommendprice} kr
                    </p>
                    <p>{product.price} kr</p>
                </div>
            </div>
        </a>
    </div>
    );
};
