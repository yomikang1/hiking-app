import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { getAllMountains } from '../services/mountainService';
import { MOUNTAIN_COORDS } from '../data/mountainCoords';
import { DIFFICULTY_LABELS } from '../types/mountain';
import type { Difficulty } from '../types/mountain';

const DOT_COLORS: Record<Difficulty, string> = {
  easy:   '#4ade80',
  medium: '#facc15',
  hard:   '#fb923c',
  expert: '#f87171',
};

const DIFF_LABELS: Record<Difficulty, string> = {
  easy:   '초급',
  medium: '중급',
  hard:   '고급',
  expert: '전문가',
};

export function MapPage() {
  const mountains = getAllMountains();
  const mapped = mountains.filter((m) => !!MOUNTAIN_COORDS[m.id]);

  return (
    <div className="relative map-page-height">

      {/* 오버레이 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-[1001] flex items-center justify-between px-4 py-2.5
                      bg-gray-950/80 border-b border-white/10 pointer-events-none"
           style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div>
          <span className="text-white font-bold text-base">산 지도</span>
          <span className="text-gray-400 text-xs ml-2">{mapped.length}개 표시</span>
        </div>
        {/* 범례 */}
        <div className="flex items-center gap-2.5">
          {(Object.entries(DOT_COLORS) as [Difficulty, string][]).map(([d, color]) => (
            <span key={d} className="flex items-center gap-1 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              {DIFF_LABELS[d]}
            </span>
          ))}
        </div>
      </div>

      {/* 지도 */}
      <MapContainer
        center={[36.5, 127.8]}
        zoom={7}
        minZoom={6}
        maxZoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        {/* 다크 테마 타일 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {mountains.map((mountain) => {
          const coords = MOUNTAIN_COORDS[mountain.id];
          if (!coords) return null;

          const color = DOT_COLORS[mountain.difficulty];
          const radius = mountain.is100Famous ? 9 : 6;

          return (
            <CircleMarker
              key={mountain.id}
              center={coords}
              radius={radius}
              pathOptions={{
                color: 'white',
                weight: mountain.is100Famous ? 1.5 : 0.8,
                fillColor: color,
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <div style={{ minWidth: 160, fontFamily: 'system-ui, sans-serif' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>
                    {mountain.name}
                    {mountain.is100Famous && (
                      <span style={{ marginLeft: 4, fontSize: 12 }}>🏆</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 2 }}>
                    {mountain.heightM.toLocaleString()}m
                    <span style={{
                      marginLeft: 6,
                      fontSize: 11,
                      padding: '1px 6px',
                      borderRadius: 9999,
                      background: '#f3f4f6',
                      color: '#374151',
                    }}>
                      {DIFFICULTY_LABELS[mountain.difficulty]}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
                    {mountain.provinces[0]}
                  </div>
                  <Link
                    to={`/mountain/${mountain.id}`}
                    style={{
                      display: 'inline-block',
                      fontSize: 12,
                      fontWeight: 600,
                      background: '#10b981',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
