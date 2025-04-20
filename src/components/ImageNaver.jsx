export default function ImageNaver({ images }) {
    return(
        <div>
            {images && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {images.map((image, i) => (
                        <div key={i} className="flex">
                            <img 
                                src={image.link} 
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