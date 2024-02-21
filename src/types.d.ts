export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoFormat {
  itag: number;
  url: string;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  lastModified: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
}

export interface AdaptiveVideoFormat {
  itag: number;
  url: string;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  initRange: {
    start: string;
    end: string;
  };
  indexRange: {
    start: string;
    end: string;
  };
  lastModified: string;
  contentLength: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  averageBitrate: number;
  approxDurationMs: string;
}

export interface APIResponse {
  status: string;
  id: string;
  title: string;
  lengthSeconds: string;
  keywords: Array<string[]>;
  channelTitle: string;
  channelId: string;
  description: string;
  thumbnail: Array<Thumbnail>;
  allowRatings: boolean;
  viewCount: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
  expiresInSeconds: string;
  formats: Array<VideoFormat>;
  adaptiveFormats: Array<AdaptiveVideoFormat>;
  pmReg: string;
  isProxied: boolean;
  error?: boolean;
}
