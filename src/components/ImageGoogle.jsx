export default function ImageGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4">
                    {details.photos.map((photo, i) => (
                        <div key={i} className="flex-shrink-0">
                            <img 
                                src={photo.url} 
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