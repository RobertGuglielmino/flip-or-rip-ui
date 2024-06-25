
import './CardEffectsContainer.css';
import { useEffect, useState } from 'react';
import scale from 'react';
import mask1 from '../../../masks/1_mask_long-modified.png';
import mask2 from '../../../masks/2_mask_long-modified.png';
import mask3 from '../../../masks/3_mask_long-modified.png';
import mask4 from '../../../masks/4_mask_long-modified.png';
import mask5 from '../../../masks/5_mask_long-modified.png';
// import { Image, Box, Text } from '@chakra-ui/react';

const maskImages = [
    `url(${mask1})`,
    `url(${mask2})`,
    `url(${mask3})`,
    `url(${mask4})`,
    `url(${mask5})`,
];
const getRandomRotation = () => {
  return Math.floor(Math.random() * 9) - 4; // Generates an integer between -4 and 4 inclusive
};

function CardEffectsContainer(props) {

    const [maskImage, setMaskImage] = useState(maskImages[0]);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        setMaskImage(maskImages[Math.floor(Math.random() * maskImages.length)]);
        setRotation(getRandomRotation());
    }, [props.maskPosition]); // Update maskImage when maskPosition changes

    const style = {
        MaskImage: maskImage,
        MaskPosition: props.maskPosition,
        WebkitMaskImage: maskImage,
        WebkitMaskPosition: props.maskPosition,
        MaskSize: "cover",
        WebkitMaskSize: "cover",
        transform: `rotate(${rotation}deg) scale(0.9)`,
    };

    return (<>
        {
            props.clicked ?
                props.ripped ?
                    <div
                        className='image-container-rip'
                        style={style}>
                        {props.children}
                    </div> :
                    <div
                        className='image-container-flip'>
                        {props.children}
                    </div>
                :
                <div
                    className='image-container-face-down'>
                    {props.children}
                </div>
        }
    </>
    );
}

export default CardEffectsContainer;
