import { useEffect, useRef, useState } from 'react';

export default function Map({ inputQuery, submittedQuery, setKakaoPlaceId, handleFranchisePlaces, handleSearch, onPlaceClick }) {
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

    // 🔸 실시간 입력어로 장소 리스트만 업데이트
    useEffect(() => {
        if (!inputQuery || !userLocation || !window.kakao) return;

        const { kakao } = window;
        const { latitude, longitude } = userLocation;
        const places = new kakao.maps.services.Places();

        places.keywordSearch(inputQuery, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
            const filteredResults = result.filter((place) =>
                place.category_name.includes("음식") || 
                place.category_name.includes("식당") ||
                place.category_name.includes("카페") ||
                place.category_name.includes("주점") ||
                place.category_name.includes("요리") ||
                place.category_name.includes("패스트푸드") ||
                place.category_name.includes("한식") ||
                place.category_name.includes("분식")
            );

            const sortedResults = filteredResults
            .map((place) => {
                const distance = getDistanceFromLatLonInKm(
                latitude,
                longitude,
                parseFloat(place.y),
                parseFloat(place.x)
                );
                //console.log(place.place_name, place.category_name);

                return { ...place, distance };
            })
            .sort((a, b) => a.distance - b.distance);

            handleFranchisePlaces(sortedResults); // ✅ 리스트만 전달 (지도는 안 바뀜)
        }
        });
    }, [inputQuery, userLocation]);

    // 🔸 검색어 확정 시 마커/지도 이동
    useEffect(() => {
        if (!submittedQuery || !userLocation || !markerRef.current) return;

        const { kakao } = window;
        const { latitude, longitude } = userLocation;
        const { map } = markerRef.current;

        const places = new kakao.maps.services.Places();
        places.keywordSearch(submittedQuery, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
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
            .sort((a, b) => a.distance - b.distance);

            displayMarkers(sortedResults);

            const nearestPlace = sortedResults[0];
            setKakaoPlaceId(nearestPlace.id);
        }
        });
    }, [submittedQuery, userLocation]);

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
       
        handleFranchisePlaces(place[0].place_name, place[0].id);

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

    return (
        <div>
            <div ref={mapRef} className="w-[350px] md:w-[600px] lg:w-[650px] h-[350px] md:h-[600px] lg:h-[650px]" />
            
        </div>
    );
}