import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { MapPin, Filter, AlertOctagon, Info, ArrowUpRight } from 'lucide-react';
import { api } from '../services/api';
import { formatINR, getRiskColorHex } from '../utils/formatters';
import RiskScoreBadge from '../components/RiskScoreBadge';

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function MapViewPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filters
  const [selectedRisk, setSelectedRisk] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [mapCenter, setMapCenter] = useState([22.5, 80.0]); // Center of India
  const [mapZoom, setMapZoom] = useState(5);

  const loadData = async () => {
    setLoading(true);
    try {
      const [mapData, dList, cList] = await Promise.all([
        api.getMapWorks(),
        api.getDistricts(),
        api.getCategories()
      ]);
      setWorks(mapData || []);
      setDistricts(dList || []);
      setCategories(cList || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWorks = works.filter(w => {
    if (selectedRisk && w.riskLevel !== selectedRisk) return false;
    if (selectedDistrict && w.district !== selectedDistrict) return false;
    if (selectedCategory && w.category !== selectedCategory) return false;
    return true;
  });

  const handleDistrictChange = (d) => {
    setSelectedDistrict(d);
    if (!d) {
      setMapCenter([22.5, 80.0]);
      setMapZoom(5);
      return;
    }
    const sample = works.find(w => w.district === d);
    if (sample && sample.lat && sample.lon) {
      setMapCenter([sample.lat, sample.lon]);
      setMapZoom(11);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-900">GEOSPATIAL RISK MAP</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {filteredWorks.length} Geo-Referenced Works
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing geographical cluster density and localized project distribution across Indian districts.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-bold text-slate-700">Filter Pins:</span>
          </div>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Risk Levels</option>
            <option value="HIGH">🔴 High Risk Only</option>
            <option value="MEDIUM">🟡 Medium Risk Only</option>
            <option value="LOW">🟢 Low Risk Only</option>
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Districts (Pan-India)</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Low Risk</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[620px] relative">
        {loading ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading geospatial map layers...
          </div>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <ChangeMapView center={mapCenter} zoom={mapZoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredWorks.map((work, idx) => {
              const color = getRiskColorHex(work.riskLevel);
              return (
                <CircleMarker
                  key={idx}
                  center={[work.lat, work.lon]}
                  radius={work.riskLevel === 'HIGH' ? 8 : 6}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.85,
                    color: '#ffffff',
                    weight: 1.5
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-2 text-xs font-sans max-w-xs">
                      <div className="flex items-center justify-between gap-2 border-b pb-1.5">
                        <span className="font-mono font-bold text-slate-900">{work.workId}</span>
                        <RiskScoreBadge score={work.riskScore} level={work.riskLevel} size="sm" />
                      </div>

                      <div className="font-semibold text-slate-800 line-clamp-2">
                        {work.workName}
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <div><strong>Category:</strong> {work.category}</div>
                        <div><strong>District:</strong> {work.district}, {work.state}</div>
                        <div><strong>Cost:</strong> {formatINR(work.cost)}</div>
                        <div><strong>Agency:</strong> {work.agency || 'Unassigned'}</div>
                      </div>

                      <div className="pt-1.5 border-t">
                        <div className="text-[10px] text-red-700 font-medium line-clamp-2 mb-2">
                          <strong>Signal:</strong> {work.primaryReason}
                        </div>

                        <Link
                          to={`/passport/${work.workId}`}
                          className="block text-center py-1 px-2 rounded bg-slate-900 text-white font-semibold text-[11px] hover:bg-slate-800 transition"
                        >
                          Open Risk Passport →
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500 flex items-center gap-2">
        <Info className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          Geographic pins represent verified project location coordinates. Projects lacking coordinates are recorded in the Risk Queue with confidence notes.
        </span>
      </div>

    </div>
  );
}
