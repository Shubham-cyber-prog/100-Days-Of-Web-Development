// Apple Music API Integration using MusicKit JS
// Documentation: https://developer.apple.com/documentation/musickitjs

declare global {
  interface Window {
    MusicKit: any;
  }
}

export class AppleMusicService {
  private musicKit: any = null;
  private initialized = false;
  private useMockData = true;

  async initialize() {
    if (this.initialized) return;

    // Check if developer token is set
    const developerToken = 'YOUR_APPLE_MUSIC_DEVELOPER_TOKEN';
    
    // If no valid token, skip MusicKit initialization and use mock data
    if (!developerToken || developerToken === 'YOUR_APPLE_MUSIC_DEVELOPER_TOKEN') {
      console.log('Apple Music API not configured - using mock data');
      console.log('To enable Apple Music: Add your developer token in /src/app/services/apple-music.ts');
      this.initialized = true;
      this.useMockData = true;
      return;
    }

    try {
      // Load MusicKit JS if not already loaded
      if (!window.MusicKit) {
        await this.loadMusicKitScript();
        // Wait a bit for MusicKit to fully initialize
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Verify MusicKit is available and has configure method
      if (!window.MusicKit || typeof window.MusicKit.configure !== 'function') {
        throw new Error('MusicKit not properly loaded');
      }

      // Configure MusicKit with your developer token
      this.musicKit = await window.MusicKit.configure({
        developerToken: developerToken,
        app: {
          name: 'Music App',
          build: '1.0.0'
        }
      });

      this.initialized = true;
      this.useMockData = false;
      console.log('Apple Music API initialized successfully');
    } catch (error) {
      console.log('Apple Music API unavailable - using mock data');
      console.log('Error details:', error);
      // Use mock data as fallback
      this.initialized = true;
      this.useMockData = true;
    }
  }

  private loadMusicKitScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="musickit.js"]');
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js';
      script.async = true;
      script.onload = () => {
        console.log('MusicKit script loaded');
        resolve();
      };
      script.onerror = () => {
        console.log('MusicKit script failed to load');
        reject(new Error('Failed to load MusicKit'));
      };
      document.head.appendChild(script);
    });
  }

  async authorize() {
    if (!this.musicKit) {
      await this.initialize();
    }

    if (this.useMockData) {
      console.log('Using mock data - Apple Music API not configured');
      return true;
    }

    try {
      await this.musicKit.authorize();
      return true;
    } catch (error) {
      console.error('Authorization failed:', error);
      return false;
    }
  }

  async searchSongs(query: string, limit = 10) {
    if (this.useMockData) {
      return this.getMockSearchResults(query);
    }

    try {
      const results = await this.musicKit.api.music('/v1/catalog/us/search', {
        term: query,
        types: 'songs',
        limit
      });
      return this.formatSearchResults(results.data.results.songs.data);
    } catch (error) {
      console.error('Search failed:', error);
      return this.getMockSearchResults(query);
    }
  }

  async getTopCharts(limit = 20) {
    if (this.useMockData) {
      return this.getMockTopCharts();
    }

    try {
      const results = await this.musicKit.api.music('/v1/catalog/us/charts', {
        types: 'songs',
        limit
      });
      return this.formatSearchResults(results.data.results.songs[0].data);
    } catch (error) {
      console.error('Failed to fetch charts:', error);
      return this.getMockTopCharts();
    }
  }

  async playSong(songId: string) {
    if (this.useMockData) {
      console.log('Mock: Playing song', songId);
      return;
    }

    try {
      await this.musicKit.setQueue({ song: songId });
      await this.musicKit.play();
    } catch (error) {
      console.error('Playback failed:', error);
    }
  }

  async pause() {
    if (this.useMockData) {
      console.log('Mock: Pausing');
      return;
    }
    await this.musicKit.pause();
  }

  async play() {
    if (this.useMockData) {
      console.log('Mock: Playing');
      return;
    }
    await this.musicKit.play();
  }

  async skipToNext() {
    if (this.useMockData) {
      console.log('Mock: Skip to next');
      return;
    }
    await this.musicKit.skipToNextItem();
  }

  async skipToPrevious() {
    if (this.useMockData) {
      console.log('Mock: Skip to previous');
      return;
    }
    await this.musicKit.skipToPreviousItem();
  }

  getNowPlayingItem() {
    if (this.useMockData) {
      return {
        id: 'mock-1',
        title: 'Midnight Dreams',
        artist: 'Luna Nova',
        album: 'Night Collection',
        duration: 225000,
        artwork: 'https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400'
      };
    }

    const item = this.musicKit?.nowPlayingItem;
    if (!item) return null;

    return {
      id: item.id,
      title: item.attributes.name,
      artist: item.attributes.artistName,
      album: item.attributes.albumName,
      duration: item.attributes.durationInMillis,
      artwork: item.attributes.artwork?.url
    };
  }

  private formatSearchResults(data: any[]) {
    return data.map(item => ({
      id: item.id,
      title: item.attributes.name,
      artist: item.attributes.artistName,
      album: item.attributes.albumName,
      duration: this.formatDuration(item.attributes.durationInMillis),
      artwork: item.attributes.artwork?.url.replace('{w}', '300').replace('{h}', '300')
    }));
  }

  private formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private getMockSearchResults(query: string) {
    return [
      { id: '1', title: 'Midnight Dreams', artist: 'Luna Nova', album: 'Night Collection', duration: '3:45', artwork: 'https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400' },
      { id: '2', title: 'Electric Pulse', artist: 'The Synths', album: 'Electric Hearts', duration: '4:12', artwork: 'https://images.unsplash.com/photo-1635895312273-0921e5f91796?w=400' },
      { id: '3', title: 'Ocean Waves', artist: 'Aquatic Soul', album: 'Deep Blue', duration: '3:28', artwork: 'https://images.unsplash.com/photo-1666979290238-2d862b573345?w=400' },
      { id: '4', title: 'City Lights', artist: 'Urban Echo', album: 'City Stories', duration: '3:56', artwork: 'https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400' },
      { id: '5', title: 'Sunset Boulevard', artist: 'Golden Hour', album: 'Sunset Sessions', duration: '4:03', artwork: 'https://images.unsplash.com/photo-1649945624740-69d73e3972aa?w=400' },
    ];
  }

  private getMockTopCharts() {
    return this.getMockSearchResults('top');
  }
}

// Export singleton instance
export const appleMusicService = new AppleMusicService();