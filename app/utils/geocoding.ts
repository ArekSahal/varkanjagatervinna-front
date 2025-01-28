import { Loader } from "@googlemaps/js-api-loader"

let geocoder: google.maps.Geocoder | null = null

export async function initializeGeocoder() {
  if (!geocoder) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    })
    await loader.load()
    geocoder = new google.maps.Geocoder()
  }
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  await initializeGeocoder()

  return new Promise((resolve, reject) => {
    if (!geocoder) {
      reject(new Error("Geocoder not initialized"))
      return
    }

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const { lat, lng } = results[0].geometry.location
        resolve({ lat: lat(), lng: lng() })
      } else {
        resolve(null)
      }
    })
  })
}

