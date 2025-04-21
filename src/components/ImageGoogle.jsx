export default function ImageGoogle({ details }) {
    return(
        <div>
            {details && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {console.log(details.photos)}
                    {details.photos.map((photo, i) => (
                        <div key={i} className="flex">
                            <img 
                                src={photo.url} 
                                alt={`photo-${i}`} 
                                className="w-24 h-auto" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}