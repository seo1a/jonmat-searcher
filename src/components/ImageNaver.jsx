export default function ImageNaver({ details }) {
    if (!details || !details.images) return null;
    
    return(
        <div>
            {details.images.length > 0 && (
                <div className="flex flex-nowrap gap-2 overflow-x-auto">
                    {details.images.map((image, i) => (
                        <div key={i} className="flex-shrink-0">
                            <img 
                                src={image.link} 
                                alt={`photo-${i}`} 
                                className="h-48 object-contain" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}