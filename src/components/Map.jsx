import { useEffect, useRef, useState } from 'react';

export default function Map({ query, onPlaceSelect, handleSearch, onPlaceClick }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [places, setPlaces] = useState([]); // 거리순 정렬을 위한 검색된 장소 상태

    useEffect(() => {
        // 카카오 지도 API 로드 확인
        const checkKakaoLoaded = () => {
            if (window.kakao && window.kakao.maps) {
                initializeMap(); // 카카오 지도 초기화
            } else {
                console.warn("카카오 지도 스크립트를 로드 중...");
                setTimeout(checkKakaoLoaded, 100); // 100ms 후 재시도
            }
        };

        const initializeMap = () => {
            const { kakao } = window;

            // 지도 초기 옵션 설정
            const mapOptions = {
                center: new kakao.maps.LatLng(37.5666103, 126.9783882), // 초기 중심 좌표
                level: 3, // 지도의 확대 레벨 (1~14, 숫자가 낮을수록 더 확대됨)
            };

            // 지도 객체 생성 및 DOM에 렌더링
            const map = new kakao.maps.Map(mapRef.current, mapOptions);

            // 초기 마커 생성
            const marker = new kakao.maps.Marker({
                position: mapOptions.center,
                map,
            });

            // 마커와 지도 객체를 ref에 저장
            markerRef.current = { map, marker, markers: [] };
        
            // 사용자의 위치 정보 가져오기
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });

                        // 사용자 위치를 지도 중심으로 설정
                        const userLatLng = new kakao.maps.LatLng(latitude, longitude);
                        map.setCenter(userLatLng);

                        // 사용자 위치 마커 생성
                        const userMarker = new kakao.maps.Marker({
                            position: userLatLng,
                            map,
                        });

                        markerRef.current.markers.push(userMarker);
                    },
                    (error) => {
                        console.error("위치 정보를 가져오는데 실패했어요:", error);
                        alert("위치 정보를 가져올 수 없어 기본 위치로 표시됩니다!");
                    }
                );
            } else {
                alert("브라우저에서 위치 정보를 지원하지 않습니다.");
            }
        };

        checkKakaoLoaded();
    }, []);

    useEffect(() => {
        if (!query || !markerRef.current || !userLocation) return;
 
        const { kakao } = window;
        const { latitude, longitude } = userLocation;

        const cleanQuery = query.trim();
        if (cleanQuery.length === 0) {
            console.warn("Query is empty after trimming");
            return;
        }

        const { map, markers } = markerRef.current;

        // 이전 마커 삭제
        markers.forEach((marker) => marker.setMap(null));
        markerRef.current.markers = [];

        const places = new kakao.maps.services.Places();
        places.keywordSearch(cleanQuery, (result, status) => {
            if (status === kakao.maps.services.Status.OK  && result.length > 0) {
                // 사용자의 위치와 검색 결과 간의 거리 계산 및 정렬
                const sortedResults = result
                    .map((place) => {
                        const distance = getDistanceFromLatLonInKm(
                            latitude,
                            longitude,
                            parseFloat(place.y),
                            parseFloat(place.x)
                        );
                        return { ...place, distance };
                    })
                    .sort((a, b) => a.distance - b.distance); // 거리순 정렬

                    setPlaces(sortedResults); // 정렬된 결과를 상태에 저장
                    displayMarkers(sortedResults); // 지도 업데이트

                    // 🔹 첫 번째 장소명 전달 (가장 가까운 장소)
                    if (sortedResults.length > 0 && onPlaceSelect) {
                        onPlaceSelect(sortedResults[0].place_name, sortedResults[0].id);
                    }

                     // 🔹 place_id 콘솔 출력
                     console.log("📌 [Map] 첫 번째 장소 ID:", sortedResults[0].id);
            } else {
                alert("검색 중 오류가 발생했습니다.");
            }
        });
    }, [query, userLocation]);

    const displayMarkers = (sortedResults) => {
        const { kakao } = window;
        const { map, markers } = markerRef.current;

        // 이전 마커 제거
        markers.forEach((marker) => marker.setMap(null));
        markerRef.current.markers = [];

        sortedResults.forEach((place) => {
            const { y, x, place_name } = place;
            const position = new kakao.maps.LatLng(y, x);

            const marker = new kakao.maps.Marker({
                position,
                map,
            });

            markerRef.current.markers.push(marker);

            const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
            });

            kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
            kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
            console.log(`Place: ${place_name}, Latitude: ${y}, Longitude: ${x}`);
        });

        // 지도 중심을 가장 가까운 장소로 설정
        const nearestPlace = sortedResults[0];
        const nearestPosition = new kakao.maps.LatLng(nearestPlace.y, nearestPlace.x);
        map.setCenter(nearestPosition);
        
        // 🔄 기존 단일 marker 제거하고 새로 찍기
        if (markerRef.current.marker) {
            markerRef.current.marker.setMap(null);
        }

        markerRef.current.marker = new kakao.maps.Marker({
            position: nearestPosition,
            map,
        });
    };

    const handlePlaceClick = (place) => {
        const { kakao } = window;
        const { map, markers } = markerRef.current;

        // 기존 마커 삭제
        markers.forEach((marker) => marker.setMap(null));
        markerRef.current.markers = [];

        const { y, x, place_name } = place;
        const newCenter = new kakao.maps.LatLng(y, x);

        map.setCenter(newCenter);

        const marker = new kakao.maps.Marker({
            position: newCenter,
            map,
        });

        markerRef.current.markers.push(marker);

        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;z-index:1;">${place_name}</div>`,
        });
        infowindow.open(map, marker);
        console.log(`Place: ${place_name}, Latitude: ${y}, Longitude: ${x}`);
        
        onPlaceSelect(place.place_name, place.id);

        if (onPlaceClick) {
            onPlaceClick(place);
        }
    };

    // 두 좌표 간의 거리 계산 함수
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구의 반지름 (단위: km)
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 반환 (km 단위)
    };

    const deg2rad = (deg) => deg * (Math.PI / 180);

    //195행에 <MapSearchResult places={places} onPlaceClick={handlePlaceClick} />
    return (
        <div>
            <div ref={mapRef} style={{ width: '650px', height: '650px' }} />
            
        </div>
    );
}