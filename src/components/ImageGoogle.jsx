import { useState } from "react";

export default function ImageGoogle({ details }) {
    const [popupImage, setPopupImage] = useState(null);

    return(
        <div>
            {details && (
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4">
                    {details.photos.map((photo, i) => (
                        <div key={i} className="flex-shrink-0">
                            <img 
                                src={photo.url} 
                                alt={`photo-${i}`} 
                                className="h-48 lg:h-60 object-contain border border-black rounded-xl cursor-pointer" 
                                loading="lazy"
                                onClick={() => setPopupImage(photo.url)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {popupImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setPopupImage(null)}
                >
                    <img
                        src={popupImage}
                        alt="popup"
                        className="max-w-full max-h-[30vh] lg:max-h-[60vh] rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setPopupImage(null)}
                        className="absolute top-4 right-4 text-white text-2xl font-bold"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
}