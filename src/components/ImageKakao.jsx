export default function ImageKakao({ details }) {  
    if (!details || !details.images) return null;
    
    return(
        <div>
            {details.images.length > 0 && (
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4">
                    {details.images.map((image, i) => (
                        <div key={i} className="flex-shrink-0 mr-4">
                            <img 
                                src={image.link} 
                                alt={`photo-${i}`} 
                                className="h-48 lg:h-60 object-contain border border-black rounded-xl" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}