export default function ImageGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="flex flex-nowrap gap-2 overflow-x-auto">
                    {details.photos.map((photo, i) => (
                        <div key={i} className="flex-shrink-0">
                            <img 
                                src={photo.url} 
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