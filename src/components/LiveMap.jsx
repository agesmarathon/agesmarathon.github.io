import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FiMapPin, FiNavigation, FiArrowUpRight, FiLayers } from 'react-icons/fi'

// Dynamically load the Google Maps JavaScript API SDK
function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    const existing = document.getElementById('google-maps-js-sdk')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps))
      existing.addEventListener('error', (err) => reject(err))
      return
    }

    const script = document.createElement('script')
    script.id = 'google-maps-js-sdk'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google.maps)
    script.onerror = (e) => reject(e)
    document.head.appendChild(script)
  })
}

export function LiveMap({ coordinates, venue, address, mapsUrl }) {
  const leafletContainerRef = useRef(null)
  const leafletInstanceRef = useRef(null)

  const googleContainerRef = useRef(null)
  const googleMapInstanceRef = useRef(null)

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
  const [activeProvider, setActiveProvider] = useState(googleApiKey ? 'google' : 'leaflet')

  const lat = coordinates?.lat || 22.33588
  const lng = coordinates?.lng || 91.78412

  // 1. Initialize Google Maps JavaScript API (Always Light Mode)
  useEffect(() => {
    if (!googleApiKey || !googleContainerRef.current) return
    if (googleMapInstanceRef.current) return

    let isMounted = true

    loadGoogleMapsScript(googleApiKey)
      .then((googleMaps) => {
        if (!isMounted || !googleContainerRef.current) return

        const map = new googleMaps.Map(googleContainerRef.current, {
          center: { lat, lng },
          zoom: 17.5,
          gestureHandling: 'greedy', // Direct zoom/pan with mouse/touch - never shows "Use ctrl + scroll"
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: false,
          zoomControl: true,
          styles: [], // Always crisp, standard Google Maps Light Mode
        })

        const infoWindow = new googleMaps.InfoWindow({
          content: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 0; color: #0f172a; min-width: 185px; max-width: 220px;">
              <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #d81f36;"></span>
                <span style="color: #d81f36; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">
                  Start &amp; Finish Line
                </span>
              </div>
              <div style="font-size: 13.5px; font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 2px;">
                ${venue}
              </div>
              <div style="font-size: 11px; color: #64748b; line-height: 1.35; margin-bottom: 8px;">
                Halishahar Housing Estate, Chattogram
              </div>
              <a href="${mapsUrl}" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; gap: 4px; background: #d81f36; color: #ffffff; padding: 4px 11px; border-radius: 9999px; font-size: 10.5px; font-weight: 700; text-decoration: none; transition: opacity 0.15s;">
                <span>Get Directions</span>
                <span style="font-size: 11px;">&rarr;</span>
              </a>
            </div>
          `,
        })

        const marker = new googleMaps.Marker({
          position: { lat, lng },
          map,
          title: venue,
          animation: googleMaps.Animation.DROP,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        // Open InfoWindow after map settles
        setTimeout(() => {
          infoWindow.open(map, marker)
        }, 500)

        googleMapInstanceRef.current = map
      })
      .catch((err) => {
        console.warn('Google Maps JS API failed to load, falling back to Leaflet:', err)
        setActiveProvider('leaflet')
      })

    return () => {
      isMounted = false
    }
  }, [googleApiKey, lat, lng, venue, address, mapsUrl])

  // 2. Initialize Leaflet Map (Always Light Voyager Mode)
  useEffect(() => {
    if (!leafletContainerRef.current) return
    if (leafletInstanceRef.current) return

    const map = L.map(leafletContainerRef.current, {
      center: [lat, lng],
      zoom: 17,
      scrollWheelZoom: false,
      zoomControl: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Always Light Voyager Tiles
    const lightTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

    L.tileLayer(lightTileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    const markerIcon = L.divIcon({
      className: 'custom-venue-pin',
      html: `
        <div class="venue-marker-pulse">
          <div class="venue-marker-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -18],
    })

    const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map)

    const popupHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 0; color: #0f172a; min-width: 185px; max-width: 220px;">
        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #d81f36;"></span>
          <span style="color: #d81f36; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">
            Start &amp; Finish Line
          </span>
        </div>
        <div style="font-size: 13.5px; font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 2px;">
          ${venue}
        </div>
        <div style="font-size: 11px; color: #64748b; line-height: 1.35; margin-bottom: 8px;">
          Halishahar Housing Estate, Chattogram
        </div>
        <a href="${mapsUrl}" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; gap: 4px; background: #d81f36; color: #ffffff; padding: 4px 11px; border-radius: 9999px; font-size: 10.5px; font-weight: 700; text-decoration: none;">
          <span>Get Directions</span>
          <span style="font-size: 11px;">&rarr;</span>
        </a>
      </div>
    `

    marker.bindPopup(popupHtml, { maxWidth: 280 })

    const timer = setTimeout(() => {
      marker.openPopup()
      map.invalidateSize()
    }, 400)

    leafletInstanceRef.current = map

    return () => {
      clearTimeout(timer)
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove()
        leafletInstanceRef.current = null
      }
    }
  }, [lat, lng, venue, address, mapsUrl])

  // Center on venue action
  const centerOnVenue = () => {
    if (activeProvider === 'google' && googleMapInstanceRef.current) {
      googleMapInstanceRef.current.panTo({ lat, lng })
      googleMapInstanceRef.current.setZoom(17.5)
    } else if (leafletInstanceRef.current) {
      leafletInstanceRef.current.flyTo([lat, lng], 17, { duration: 1.2 })
    }
  }

  // Switch providers and trigger resize
  const switchProvider = (provider) => {
    setActiveProvider(provider)
    setTimeout(() => {
      if (provider === 'leaflet' && leafletInstanceRef.current) {
        leafletInstanceRef.current.invalidateSize()
      } else if (provider === 'google' && googleMapInstanceRef.current && window.google?.maps?.event) {
        window.google.maps.event.trigger(googleMapInstanceRef.current, 'resize')
      }
    }, 150)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
      {/* Map control actions bar */}
      <div className="absolute right-3 top-3 z-[400] flex items-center gap-2">
        {googleApiKey && (
          <button
            onClick={() => switchProvider(activeProvider === 'google' ? 'leaflet' : 'google')}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-crimson-500 hover:text-crimson-600"
            title="Toggle map view"
          >
            <FiLayers className="text-crimson-500 text-xs" />
            <span>{activeProvider === 'google' ? 'Route Map' : 'Google Map'}</span>
          </button>
        )}

        <button
          onClick={centerOnVenue}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-crimson-500 hover:text-crimson-600"
          title="Center on start line"
        >
          <FiNavigation className="text-crimson-500 text-xs" />
          <span className="hidden sm:inline">Center Venue</span>
        </button>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-crimson-500 hover:text-crimson-600"
          title="Open in Google Maps"
        >
          <span className="hidden sm:inline">Full Map</span>
          <FiArrowUpRight className="text-xs" />
        </a>
      </div>

      {/* Map coordinate watermark pill */}
      <div className="absolute bottom-3 left-3 z-[400] pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/95 px-3 py-1 text-[11px] font-mono text-slate-700 shadow-sm backdrop-blur">
          <FiMapPin className="text-crimson-500 text-xs" />
          {lat.toFixed(5)}° N, {lng.toFixed(5)}° E
        </span>
      </div>

      {/* Google Maps JS SDK Canvas (Increased Height & Light Mode) */}
      <div
        ref={googleContainerRef}
        className={`h-[480px] w-full rounded-2xl sm:h-[540px] lg:h-[600px] shadow-inner ${
          activeProvider === 'google' ? 'block' : 'hidden'
        }`}
        style={{ zIndex: 1 }}
      />

      {/* Leaflet Route Map Canvas (Increased Height & Light Mode) */}
      <div
        ref={leafletContainerRef}
        className={`h-[480px] w-full rounded-2xl sm:h-[540px] lg:h-[600px] shadow-inner ${
          activeProvider === 'leaflet' ? 'block' : 'hidden'
        }`}
        style={{ zIndex: 1 }}
      />
    </div>
  )
}
