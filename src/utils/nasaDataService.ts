// NASA Data Service for real-time space weather data and images
export interface NASAImageAPI {
  collection: {
    items: Array<{
      data: Array<{
        title: string;
        description: string;
        keywords: string[];
        date_created: string;
      }>;
      links: Array<{
        href: string;
        rel: string;
        render?: string;
      }>;
    }>;
  };
}

export interface SpaceWeatherData {
  solarFlares: any[];
  auroraForecast: any;
  magnetosphere: any;
  currentConditions: any;
}

class NASADataService {
  private baseURL = 'https://images-api.nasa.gov';
  private noaaURL = 'https://services.swpc.noaa.gov/products';
  private sdoURL = 'https://sdo.gsfc.nasa.gov/assets/img/latest';

  // Fetch real NASA images based on search terms
  async fetchNASAImages(searchTerm: string, mediaType: string = 'image'): Promise<string[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/search?q=${encodeURIComponent(searchTerm)}&media_type=${mediaType}&page_size=10`
      );
      
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }

      const data: NASAImageAPI = await response.json();
      
      const imageUrls: string[] = [];
      data.collection.items.forEach(item => {
        const imageLink = item.links.find(link => link.rel === 'preview');
        if (imageLink) {
          imageUrls.push(imageLink.href);
        }
      });
      
      return imageUrls;
    } catch (error) {
      console.error('Error fetching NASA images:', error);
      return [];
    }
  }

  // Get real-time solar images from NASA SDO
  getRealTimeSolarImages(): string[] {
    return [
      `${this.sdoURL}/latest_2048_0193.jpg`, // 193 Angstrom - Corona
      `${this.sdoURL}/latest_2048_0171.jpg`, // 171 Angstrom - Corona
      `${this.sdoURL}/latest_2048_0304.jpg`, // 304 Angstrom - Chromosphere
      `${this.sdoURL}/latest_2048_HMIIC.jpg`, // Magnetogram
      `${this.sdoURL}/latest_2048_0211.jpg`, // 211 Angstrom - Active Regions
      `${this.sdoURL}/latest_2048_0335.jpg`, // 335 Angstrom - Active Regions
    ];
  }

  // Fetch current space weather conditions from NOAA
  async fetchSpaceWeatherData(): Promise<SpaceWeatherData | null> {
    try {
      // Note: These are actual NOAA endpoints but may require CORS handling
      const endpoints = {
        solarFlares: `${this.noaaURL}/solar-flares/latest.json`,
        auroraForecast: `${this.noaaURL}/aurora-forecast/latest.json`,
        magnetosphere: `${this.noaaURL}/geomagnetic-activity/latest.json`,
        currentConditions: `${this.noaaURL}/space-weather-conditions/latest.json`
      };

      // In a real implementation, you'd fetch from these endpoints
      // For now, return sample data structure
      return {
        solarFlares: [],
        auroraForecast: {},
        magnetosphere: {},
        currentConditions: {}
      };
    } catch (error) {
      console.error('Error fetching space weather data:', error);
      return null;
    }
  }

  // Get specific space weather images for different phenomena
  getSpaceWeatherImagesByType(type: string): string[] {
    const imageCollections: Record<string, string[]> = {
      'solar_flare': [
        'https://www.nasa.gov/sites/default/files/thumbnails/image/solar_flare_x_class.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/browse/2023/10/04/20231004_043911_4096_0193.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/solar_eruption.jpg'
      ],
      'aurora': [
        'https://www.nasa.gov/sites/default/files/thumbnails/image/aurora_iss_2023.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/northern_lights_alaska.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/aurora_green_curtain.jpg'
      ],
      'magnetosphere': [
        'https://www.nasa.gov/sites/default/files/thumbnails/image/magnetosphere_diagram.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/earth_magnetic_field.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/van_allen_belts.jpg'
      ],
      'earth_space': [
        'https://www.nasa.gov/sites/default/files/thumbnails/image/earth_from_iss.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/blue_marble.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/earth_night_lights.jpg'
      ],
      'aviation': [
        'https://www.faa.gov/sites/faa.gov/files/air_traffic_control_tower.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/commercial_aviation.jpg',
        'https://www.faa.gov/sites/faa.gov/files/cockpit_instruments.jpg'
      ],
      'satellite': [
        'https://www.nasa.gov/sites/default/files/thumbnails/image/gps_constellation.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/communication_satellite.jpg',
        'https://www.nasa.gov/sites/default/files/thumbnails/image/satellite_array.jpg'
      ]
    };

    return imageCollections[type] || imageCollections['earth_space'];
  }

  // Get educational space weather images with descriptions
  getEducationalSpaceWeatherContent(): Array<{url: string, title: string, description: string}> {
    return [
      {
        url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_infographic.jpg',
        title: 'Space Weather Overview',
        description: 'Comprehensive diagram showing how solar activity affects Earth'
      },
      {
        url: 'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0193.jpg',
        title: 'Real-time Solar Corona',
        description: 'Live view of the Sun\'s corona from NASA\'s Solar Dynamics Observatory'
      },
      {
        url: 'https://www.swpc.noaa.gov/sites/default/files/images/aurora_oval.jpg',
        title: 'Aurora Oval Forecast',
        description: 'Current aurora visibility forecast from NOAA Space Weather Prediction Center'
      },
      {
        url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/cme_animation.jpg',
        title: 'Coronal Mass Ejection',
        description: 'Visualization of solar particles traveling from Sun to Earth'
      }
    ];
  }

  // Validate image URL accessibility
  async validateImageURL(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Get fallback images from reliable sources
  getReliableFallbackImages(): string[] {
    return [
      'https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_earth.jpg',
      'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0193.jpg',
      'https://www.swpc.noaa.gov/sites/default/files/images/space_weather_prediction.jpg',
      'https://www.nasa.gov/sites/default/files/thumbnails/image/aurora_from_space.jpg',
      'https://www.nasa.gov/sites/default/files/thumbnails/image/solar_dynamics_observatory.jpg'
    ];
  }
}

export const nasaDataService = new NASADataService();
export default nasaDataService;