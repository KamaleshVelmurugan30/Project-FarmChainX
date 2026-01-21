import { useEffect, useState, useRef } from 'react';
import { TransportEvent } from '@/types';
import { cn } from '@/lib/utils';

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
  center: { lat: number; lng: number };
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  events?: TransportEvent[];
  className?: string;
  onClick?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
  bounds?: MapBounds;
}

export function MapView({
  center = [20.5937, 78.9629], // Default to India center
  zoom = 10,
  events = [],
  className = 'h-[400px] w-full',
  onClick,
  selectedLocation,
  bounds,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let L: typeof import('leaflet');
    
    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Dynamically import leaflet
      L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Create map instance
      const map = L.map(mapRef.current).setView(center, zoom);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Set max bounds if provided (restricts panning)
      if (bounds) {
        const leafletBounds = L.latLngBounds(
          [bounds.south, bounds.west],
          [bounds.north, bounds.east]
        );
        map.setMaxBounds(leafletBounds);
        map.setMinZoom(4);
      }

      // Handle click events
      if (onClick) {
        map.on('click', (e: any) => {
          onClick(e.latlng.lat, e.latlng.lng);
        });
      }

      setIsLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when it changes
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom, isLoaded]);

  // Update markers when events or selectedLocation changes
  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapInstanceRef.current || !isLoaded) return;

      const L = await import('leaflet');

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Custom icons
      const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const activeIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Add event markers
      events.forEach((event, index) => {
        const marker = L.marker([event.lat, event.lng], {
          icon: index === events.length - 1 ? activeIcon : customIcon,
        }).addTo(mapInstanceRef.current);

        marker.bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="font-weight: 600; font-size: 14px;">${event.origin} → ${event.destination}</h4>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">Carrier: ${event.carrier}</p>
            <p style="font-size: 12px; color: #666;">Status: <strong>${event.status}</strong></p>
            ${event.notes ? `<p style="font-size: 12px; margin-top: 8px; font-style: italic;">${event.notes}</p>` : ''}
          </div>
        `);

        markersRef.current.push(marker);
      });

      // Add selected location marker
      if (selectedLocation) {
        const marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
          icon: activeIcon,
        }).addTo(mapInstanceRef.current);

        marker.bindPopup(`
          <div>
            <p style="font-weight: 500; font-size: 14px;">Selected Location</p>
            <p style="font-size: 12px; color: #666;">${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}</p>
          </div>
        `);

        markersRef.current.push(marker);
      }
    };

    updateMarkers();
  }, [events, selectedLocation, isLoaded]);

  return (
    <div
      ref={mapRef}
      className={cn('rounded-lg z-0', className)}
      style={{ background: 'hsl(var(--muted))' }}
    >
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground">Loading map...</span>
        </div>
      )}
    </div>
  );
}
