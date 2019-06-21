export class MusicEvent {
    id: string;
    ownerId: string;
    title: string;
    motto: string;
    description: string;
    imgUrl?: string;
    street: string;
    city: string;
    startDate: Date;
    startTime: Date;
    isPublic: boolean;
    isDuplicateTracksAllowed: boolean;
    isMultipleCuratorAllowed: boolean;
    musicProvider: string;
    musicProviderToken: string;
    maxParticipants?: number;
    registrationCode?: string;
    costs?: number;
    currency?: string;
}
