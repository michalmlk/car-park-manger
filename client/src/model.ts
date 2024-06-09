export interface PlaceDTO {
    _id: string;
    number: number;
    floor: number;
    reservedOn: string[];
}

export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export interface Reservation {
    _id: string;
    floor: number;
    day: Day;
    userId: string;
    place: string;
}
